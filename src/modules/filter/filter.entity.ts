import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany, ManyToOne, ManyToMany,
} from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Category } from '../category/category.entity';
import { Room } from '../room/room.entity';

@Entity()
@Unique('UQ-FILTER', ['filter'])
export class Filter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(50)
  filter: string;


  @Column()
  categoryId: number;

  @ManyToOne((type) => Category, (category) => category.filters)
  category: Category;

  @ManyToMany((type) => Room, (room) => room.filters)
  rooms: Room[];
}
