import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class FocusEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column()
  @IsNotEmpty()
  roomId: number;

  @Column({ default: null, nullable: true })
  query: string;

  @Column({ default: null, nullable: true })
  userId: number;

  @Column({ default: null, nullable: true })
  time: number;
}
