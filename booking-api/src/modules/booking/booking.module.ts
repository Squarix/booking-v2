import {forwardRef, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Booking } from './booking.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { RoomModule } from '../room/room.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  providers: [BookingService],
  controllers: [BookingController],
  exports: [BookingService],
})
export class BookingModule {}
