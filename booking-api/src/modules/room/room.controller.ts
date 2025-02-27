import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Request,
  Param,
  HttpException,
  HttpStatus,
  Query,
  Patch,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import * as CSV from 'objects-to-csv';
import * as path from 'path';

import { RoomService } from './room.service';
import { Room } from './room.entity';
import { ImageService } from '../image/image.service';
import { Image } from '../image/image.entity';
import { Filter } from '../filter/filter.entity';
import { FilterService } from '../filter/filter.service';
import { City } from '../city/city.entity';
import { CityService } from '../city/city.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User, UserTypes } from '../users/user.entity';
import { Booking } from '../booking/booking.entity';
import { BookingService } from '../booking/booking.service';

import { EventsGateway } from '../events/events.gateway';
import { ImageAiService } from '../image-ai/image-ai.service';

import { DATE_ALREADY_BOOKED_MESSAGE } from './constants';
import { daysBetween, getRecommendations } from './room.helper';

@Controller('rooms')
export class RoomController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly cityService: CityService,
    private readonly filterService: FilterService,
    private readonly imageService: ImageService,
    private readonly roomService: RoomService,
    private readonly eventsGateway: EventsGateway,
    private readonly imageAiService: ImageAiService,
  ) {}

  @Get('/recommendations/:id')
  async getRecommendations(@Param('id') id: number) {
    const recommendations = await getRecommendations(id);
    const rooms = await this.roomService.findByIds(recommendations);
    const response = [];
    rooms.forEach((room) => {
      response[recommendations.indexOf(room.id)] = room;
    });

    return response;
  }

  @Get('/csv')
  async createCSV() {
    const [roomsKeywords, roomsDescriptions] = await Promise.all([
      this.roomService.findAllWithKeywords(),
      this.roomService.findAllWithDescription(),
    ]);
    const descriptionCSV = new CSV(roomsDescriptions);
    console.log(roomsKeywords);
    const keywords = roomsKeywords.map((room) => ({
      id: room.id,
      keywords: room.filters.map((f) => f.filter).join(' '),
    }));

    const keywordsCSV = new CSV(keywords);

    const dataDir = path.join(__dirname, '..', '..', '..', 'data');

    return Promise.all([
      descriptionCSV.toDisk(path.join(dataDir, 'description.csv')),
      keywordsCSV.toDisk(path.join(dataDir, 'keywords.csv')),
    ]);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Room> {
    return this.roomService.findOne(id);
  }

  @Get(':id/bookings')
  async findBookings(@Param('id') id: number): Promise<Booking[]> {
    const room = await this.roomService.findOne(id);
    return this.bookingService.getRoomBookings(room);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/bookings')
  async createBooking(
    @Param('id') id: number,
    @Body() body,
    @Request() req,
  ): Promise<Booking> {
    const room = await this.roomService.findOne(id);
    const thisDateBookings: Booking[] = await this.bookingService.getBookingBetweenDates(
      body.arriveDate,
      body.endDate,
      room,
    );

    if (thisDateBookings.length === room.total) {
      throw new HttpException(
        DATE_ALREADY_BOOKED_MESSAGE,
        HttpStatus.BAD_REQUEST,
      );
    }

    const totalDays: number = daysBetween(body.arriveDate, body.endDate);
    const booking = await this.bookingService.create(
      req.user,
      body,
      room.price * totalDays,
      room,
    );

    this.eventsGateway.server.to(String(id)).emit('newBooking', booking);

    return booking;
  }

  @Get('/')
  findAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('order') order: 'ASC' | 'DESC',
    @Query('selectedFilters') filters: string,
    @Query('address') address: string,
    @Query('guests') guests: number,
    @Query('rooms') rooms: number,
    @Query('city') city: string,
    @Query('userId') userId: number,
  ) {
    return this.roomService.findAll(
      limit,
      offset,
      order,
      filters,
      address,
      guests,
      rooms,
      city,
      userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateRoom(@Body() body, @Request() req, @Param('id') id: number) {
    const { user } = req;
    const room = await this.roomService.findOne(id);

    if (!room) throw new NotFoundException('Куда ты звонишь?');

    if (room.user.id === user.id || user.type === UserTypes.moderator) {
      return this.roomService.updateRoom(id, body);
    }

    throw new ForbiddenException('Вы кто такие чтобы это делать?');
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @UploadedFiles() files,
    @Request() req,
    @Body() body,
  ): Promise<Room> {
    const {
      filters: strFilters = '{}',
      roomParams: strRoomParams = '{}',
      mainImage = null,
    } = body;
    const { user }: { user: User } = req;

    const filters = JSON.parse(strFilters);
    const roomParams = JSON.parse(strRoomParams);

    const uploadedFiles: string[] = await Promise.all(
      files.map((file) =>
        this.imageService.writeImage(file.buffer, file.originalname),
      ),
    );

    let images: Image[] = await Promise.all(
      uploadedFiles.map((filePath) => this.imageService.create(filePath)),
    );

    const previewImage = images[mainImage];
    images = images.filter((image, index) => index !== mainImage);

    const filterObjects: Filter[] = await Promise.all(
      filters.map(async ({ filter, categoryId }) =>
        this.filterService.findOneOrCreate(filter, categoryId),
      ),
    );

    const city: City = await this.cityService.findOneOrCreate(
      roomParams.city,
      roomParams.countryId,
    );

    const room = await this.roomService.create(
      user,
      roomParams,
      images,
      previewImage,
      filterObjects,
      city,
    );

    await this.imageAiService.bulkProcessImages(images);

    return room;
  }
}
