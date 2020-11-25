import { Controller, Get, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('rooms')
export class CategoryController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/')
  findAll(): Promise<Room[]> {
    return new Promise<Room[]>(() => []);
  }

  @Post('/')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  create(@UploadedFiles() files): Promise<Room> {
    console.log(files);
    return new Promise<Room>(() => null);
  }
}
