import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsNotEmpty, MaxLength, Min } from 'class-validator';
import { City } from '../city/city.entity';
import { User } from '../users/user.entity';
import { Image } from '../image/image.entity';
import { Booking } from '../booking/booking.entity';
import { Filter } from '../filter/filter.entity';

export enum RoomStatus {
  declined = 'declined',
  published = 'published',
  pending = 'pending',
}

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  guestsAmount: number;

  @Column()
  @IsNotEmpty()
  size: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(50)
  address: string;

  @Column()
  @MaxLength(1024)
  description: string;

  @Column({ default: RoomStatus.pending })
  @IsNotEmpty()
  status: RoomStatus;

  @Column()
  @Min(0)
  @IsNotEmpty()
  price: number;

  @ManyToOne(() => City, (city) => city.rooms)
  city: City;

  @ManyToOne(() => User, (user) => user.rooms)
  user: User;

  @OneToMany(() => Image, (image) => image.room)
  images: Image[];

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];

  @OneToOne(() => Image, (image) => image.mainRoom)
  @JoinColumn()
  image: Image;

  @ManyToMany(() => Filter, (filter) => filter.rooms)
  @JoinTable()
  filters: Filter[];
}
