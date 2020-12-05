import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

import { Booking } from './booking.entity';
import { Room } from '../room/room.entity';
import { User } from '../users/user.entity';

import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
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

  async getRoomBookings(room): Promise<Booking[]> {
    return this.bookingRepository.find({ where: { room } });
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

  async getUserBookings(
    user: User,
    arriveDate: string,
    endDate: string,
  ): Promise<Booking[]> {
    let where: any = { user };
    console.log(arriveDate, endDate);
    if (arriveDate && endDate) {
      where = {
        arriveDate: MoreThanOrEqual(arriveDate),
        endDate: LessThanOrEqual(endDate),
        user,
      };
    } else if (endDate) {
      where = { endDate: LessThanOrEqual(endDate), user };
    } else if (arriveDate) {
      where = { arriveDate: MoreThanOrEqual(arriveDate) };
    }

    return this.bookingRepository.find({
      where,
      relations: ['room', 'room.city'],
    });
  }
}
