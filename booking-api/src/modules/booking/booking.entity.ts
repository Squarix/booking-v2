import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, OneToMany } from 'typeorm';
import { IsNotEmpty, MaxLength, Min } from 'class-validator';

import { Room } from '../room/room.entity';
import { User } from '../users/user.entity';

export enum BookingStatus {
  pending = 'pending',
  declined = 'declined',
  approved = 'approved',
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  arriveDate: Date;

  @Column()
  @IsNotEmpty()
  endDate: Date;

  @Column({ default: BookingStatus.pending })
  @IsNotEmpty()
  status: BookingStatus;

  @Column()
  @Min(0.01)
  price: number;

  @ManyToOne((type) => User, (user) => user.bookings)
  user: User;

  @ManyToOne((type) => Room, (room) => room.bookings)
  room: Room;
}
