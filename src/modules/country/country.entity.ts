import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';

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
}
