import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class FocusImageEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column()
  @IsNotEmpty()
  roomId: number;

  @Column()
  @IsNotEmpty()
  imageId: number;

  @Column({ default: null, nullable: true })
  userId: number;
}
