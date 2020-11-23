import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Filter } from '../filter/filter.entity';

@Entity()
@Unique('UQ-NAME', ['name'])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @OneToMany((type) => Filter, (filter) => filter.category)
  filters: Filter[];
}
