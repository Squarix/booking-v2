import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Request, Param,
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

@Controller('rooms')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly imageService: ImageService,
    private readonly filterService: FilterService,
    private readonly cityService: CityService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Room> {
    return this.roomService.findOne(id);
  }

  @Get('/')
  findAll(): Promise<Room[]> {
    return new Promise<Room[]>(() => []);
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
