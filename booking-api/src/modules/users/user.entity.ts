import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { Room } from '../room/room.entity';
import { Booking } from '../booking/booking.entity';
import {classToPlain, Exclude} from "class-transformer";

export enum UserTypes {
  moderator = 'moderator',
  user = 'user',
}

@Entity()
@Unique('UQ-EMAIL', ['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @Column()
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ default: '' })
  profileDescription: string;

  @Column({ default: UserTypes.user })
  type: UserTypes;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany((type) => Room, (room) => room.user)
  rooms: Room[];

  @OneToMany((type) => Booking, (booking) => booking.room)
  bookings: Booking[];

  toJSON() {
    return classToPlain(this);
  }
}
