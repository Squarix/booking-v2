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
} from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../image/image.service';
import { Image } from '../image/image.entity';
import { Filter } from '../filter/filter.entity';
import { FilterService } from '../filter/filter.service';
import { City } from '../city/city.entity';
import { CityService } from '../city/city.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/user.entity';
import { Booking } from '../booking/booking.entity';
import { BookingService } from '../booking/booking.service';

import { DATE_ALREADY_BOOKED_MESSAGE } from './constants';
import { daysBetween } from './room.helper';

@Controller('rooms')
export class RoomController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly cityService: CityService,
    private readonly filterService: FilterService,
    private readonly imageService: ImageService,
    private readonly roomService: RoomService,
  ) {}

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

    if (thisDateBookings.length) {
      throw new HttpException(
        DATE_ALREADY_BOOKED_MESSAGE,
        HttpStatus.BAD_REQUEST,
      );
    }

    const totalDays: number = daysBetween(body.arriveDate, body.endDate);
    return this.bookingService.create(
      req.user,
      body,
      room.price * totalDays,
      room,
    );
  }

  @Get('/')
  findAll(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('order') order: string,
    @Query('selectedFilters') filters: string,
    @Query('address') address: string,
    @Query('guests') guests: number,
    @Query('rooms') rooms: number,
  ) {
    return this.roomService.findAll(limit, offset, order, filters, address, guests, rooms);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @UseInterceptors(AnyFilesInterceptor())
  async create(
    @UploadedFiles() files,
    @Request() req,
    @Body() body,
  ): Promise<Room> {
    const { filters: strFilters, roomParams: strRoomParams, mainImage } = body;
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

    return this.roomService.create(
      user,
      roomParams,
      images,
      previewImage,
      filterObjects,
      city,
    );
  }
}
