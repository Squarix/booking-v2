import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingModule } from '../booking/booking.module';
import { CityModule } from '../city/city.module';
import { EventsModule } from '../events/events.module';
import { FilterModule } from '../filter/filter.module';
import { ImageModule } from '../image/image.module';
import { ImageAiModule } from '../image-ai/image-ai.module';

import { Room } from './room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    BookingModule,
    ImageModule,
    FilterModule,
    CityModule,
    EventsModule,
    ImageAiModule,
  ],
  providers: [RoomService],
  controllers: [RoomController],
  exports: [RoomService],
})
export class RoomModule {}
