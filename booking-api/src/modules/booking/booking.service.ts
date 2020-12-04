import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { Booking } from './booking.entity';
import { Room } from '../room/room.entity';
import { User } from '../users/user.entity';

import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async create(
    user: User,
    params: CreateBookingDto,
    price: number,
    room: Room,
  ) {
    const booking = new Booking();
    booking.price = price;
    booking.room = room;
    booking.user = user;
    booking.arriveDate = params.arriveDate;
    booking.endDate = params.endDate;

    return this.bookingRepository.save(booking);
  }

  async getBookingBetweenDates(
    arriveDate: Date,
    endDate: Date,
    room: Room,
  ): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: [
        {
          room,
          arriveDate: Between(arriveDate, endDate),
        },
        {
          room,
          endDate: Between(arriveDate, endDate),
        },
      ],
    });
  }
}
