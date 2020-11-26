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
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/')
  findAll(): Promise<Room[]> {
    return new Promise<Room[]>(() => []);
  }

  @Post('/')
  @UseInterceptors(AnyFilesInterceptor())
  create(@UploadedFiles() files, @Body() body): Promise<Room> {
    const { filters: strFilters, roomParams: strRoomParams } = body;
    const filters = JSON.parse(strFilters);
    const roomParams = JSON.parse(strRoomParams);

    console.log(body, files);
    return new Promise<Room>(() => null);
  }
}
