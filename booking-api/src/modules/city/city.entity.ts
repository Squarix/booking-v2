import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Country } from '../country/country.entity';
import { Room } from '../room/room.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @Column()
  countryId: number;

  @ManyToOne((country) => Country, (country) => country.cities)
  country: Country;

  @OneToMany((type) => Room, (room) => room.city)
  rooms: Room[];
}
