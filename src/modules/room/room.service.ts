import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from './room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { ImageService } from '../image/image.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private readonly imageService: ImageService,
  ) {}

  async create(newRoom: CreateRoomDto): Promise<Room> {
    const room = new Room();
    room.address = newRoom.address;
    room.description = newRoom.description;
    room.price = newRoom.price;
    room.guestsAmount = newRoom.guestsAmount;
    return this.roomRepository.save(room);
  }
}
