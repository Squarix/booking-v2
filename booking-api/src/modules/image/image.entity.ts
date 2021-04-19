import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Room } from '../room/room.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  path: string;

  @Column({ default: '' })
  hues?: string;

  @Column({ default: '' })
  predictions?: string;

  @ManyToOne((type) => Room, (room) => room.images)
  room: Room;

  @OneToOne((type) => Room, (room) => room.image)
  mainRoom: Room;
}
