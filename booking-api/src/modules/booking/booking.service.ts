import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';

import { Booking, BookingStatus } from './booking.entity';
import { Room, RoomStatus } from '../room/room.entity';
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
    return this.bookingRepository.find({
      where: { room, status: Not(BookingStatus.declined) },
    });
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
          status: Not(BookingStatus.declined),
        },
        {
          room,
          endDate: Between(arriveDate, endDate),
          status: Not(BookingStatus.declined),
        },
      ],
    });
  }

  async getUserRents(user: User): Promise<Booking[]> {
    return this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.user', 'user')
      .leftJoinAndSelect('booking.room', 'room')
      .leftJoinAndSelect('room.city', 'room.city')
      .where('room.userId = :userId', { userId: user.id })
      .getMany();
  }

  async getUserBookings(
    user: User,
    arriveDate: string,
    endDate: string,
  ): Promise<Booking[]> {
    const where: any = { user };

    if (arriveDate) where.arriveDate = MoreThanOrEqual(arriveDate);
    if (endDate) where.arriveDate = LessThanOrEqual(endDate);
    if (arriveDate && endDate) where.arriveDate = Between(arriveDate, endDate);

    return this.bookingRepository.find({
      where,
      relations: ['room', 'room.city'],
    });
  }

  async updateBookingStatus(
    user: User,
    newStatus: BookingStatus,
  ): Promise<Booking> {
    const booking: Booking = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.room', 'room')
      .where('room.userId = :userId', { userId: user.id })
      .andWhere('booking.status = :status', { status: BookingStatus.pending })
      .getOne();

    if (!booking)
      throw new HttpException(
        'Pending booking not found',
        HttpStatus.NOT_FOUND,
      );

    booking.status = newStatus;
    return this.bookingRepository.save(booking);
  }
}
