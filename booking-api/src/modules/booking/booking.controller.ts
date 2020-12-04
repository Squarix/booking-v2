import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RoomService } from '../room/room.service';
import { Booking } from './booking.entity';
import { DATE_ALREADY_BOOKED_MESSAGE } from './constants';
import { daysBetween } from './booking.helper';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly roomService: RoomService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: CreateBookingDto,
    @Request() req,
  ): Promise<Booking> {
    const room = await this.roomService.findOne(body.roomId);
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
}
