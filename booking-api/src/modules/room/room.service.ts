import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from './room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { Image } from '../image/image.entity';
import { Filter } from '../filter/filter.entity';
import { City } from '../city/city.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async create(
    newRoom: CreateRoomDto,
    images: Image[],
    filters: Filter[],
    city: City,
  ): Promise<Room> {
    const room = new Room();
    room.address = newRoom.address;
    room.description = newRoom.description;
    room.price = newRoom.price;
    room.size = newRoom.size;
    room.guestsAmount = newRoom.guestsAmount;
    room.images = images;
    room.filters = filters;
    room.city = city;
    return this.roomRepository.save(room);
  }
}
