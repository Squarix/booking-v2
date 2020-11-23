import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { Room } from '../room/room.entity';

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

  @Column({ default: UserTypes.user })
  type: UserTypes;

  @Column()
  password: string;

  @OneToMany((type) => Room, (room) => room.user)
  rooms: Room[];
}
