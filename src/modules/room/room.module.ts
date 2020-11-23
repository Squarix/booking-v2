import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature(Room)],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
