import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from './room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { Image } from '../image/image.entity';
import { Filter } from '../filter/filter.entity';
import { City } from '../city/city.entity';
import {User} from "../users/user.entity";

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async findOne(id: number) {
    return this.roomRepository.findOne({
      where: { id },
      relations: ['city', 'user', 'images', 'bookings', 'filters'],
    });
  }

  async create(
    user: User,
    newRoom: CreateRoomDto,
    images: Image[],
    previewImage: Image,
    filters: Filter[],
    city: City,
  ): Promise<Room> {
    const room = new Room();
    room.address = newRoom.address;
    room.city = city;
    room.description = newRoom.description;
    room.guestsAmount = newRoom.guestsAmount;
    room.filters = filters;
    room.image = previewImage;
    room.images = images;
    room.price = newRoom.price;
    room.size = newRoom.size;
    room.user = user;

    return this.roomRepository.save(room);
  }
}
