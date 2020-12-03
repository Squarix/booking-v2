import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
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
import { plainToClass } from 'class-transformer';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller('rooms')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly imageService: ImageService,
    private readonly filterService: FilterService,
    private readonly cityService: CityService,
  ) {}

  @Get('/')
  findAll(): Promise<Room[]> {
    return new Promise<Room[]>(() => []);
  }

  @Post('/')
  @UseInterceptors(AnyFilesInterceptor())
  async create(@UploadedFiles() files, @Body() body): Promise<Room> {
    const { filters: strFilters, roomParams: strRoomParams } = body;
    const filters = JSON.parse(strFilters);
    const roomParams = JSON.parse(strRoomParams);

    console.log(files);
    const uploadedFiles: string[] = await Promise.all(
      files.map((file) =>
        this.imageService.writeImage(file.buffer, file.originalname),
      ),
    );

    const images: Image[] = await Promise.all(
      uploadedFiles.map((filePath) => this.imageService.create(filePath)),
    );

    const filterObjects: Filter[] = await Promise.all(
      filters.map(async ({ filter, categoryId }) =>
        this.filterService.findOneOrCreate(filter, categoryId),
      ),
    );

    const city: City = await this.cityService.findOneOrCreate(
      roomParams.city,
      roomParams.countryId,
    );

    return this.roomService.create(roomParams, images, filterObjects, city);
  }
}
