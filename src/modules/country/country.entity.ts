import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { City } from '../city/city.entity';

@Entity()
@Unique('UQ-CODE', ['code'])
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @Column()
  @IsNotEmpty()
  @MaxLength(5)
  code: string;

  @OneToMany((type) => City, (city) => city.country)
  cities: City[];
}
