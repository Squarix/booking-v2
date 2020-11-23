import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne } from 'typeorm';
import { IsNotEmpty, MaxLength, Min } from 'class-validator';
import { City } from '../city/city.entity';
import { User } from '../users/user.entity';

export enum RoomStatus {
  declined = 'declined',
  published = 'published',
  pending = 'pending',
}

@Entity()
@Unique('UQ-CODE', ['code'])
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

  @ManyToOne((type) => City, (city) => city.rooms)
  city: City;

  @ManyToOne((type) => User, (user) => user.rooms)
  user: User;
}
