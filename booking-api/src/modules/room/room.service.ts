import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {In, Like, Repository} from 'typeorm';

import {Room, RoomStatus} from './room.entity';
import {CreateRoomDto} from './dto/create-room.dto';
import {Image} from '../image/image.entity';
import {Filter} from '../filter/filter.entity';
import {City} from '../city/city.entity';
import {User} from '../users/user.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {
  }

  async findOne(id: number) {
    return this.roomRepository.findOne({
      where: {id},
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
    room.lat = newRoom.lat;
    room.lng = newRoom.lng;
    room.price = newRoom.price;
    room.size = newRoom.size;
    room.user = user;

    return this.roomRepository.save(room);
  }

  async findAll(
    take = 21,
    skip = 0,
    order: 'ASC' | 'DESC',
    filters: string,
    address: string,
    guests: number,
    rooms: number
  ): Promise<ManyModelDto<Room>> {
    const query = this.roomRepository.createQueryBuilder('r')
      .leftJoinAndSelect('r.image', 'image')
      .leftJoinAndSelect('r.filters', 'filters')
      .leftJoinAndSelect('r.city', 'city')
      .skip(skip)
      .take(take)
      .where('status = :status', { status: RoomStatus.published });

    if (filters) {
      const filtersArray = filters.split(',').map(f => Number.parseInt(f));
      query.andWhere('filters.id in (:...filters)', {filters: filtersArray});
    }
    if (address) query.andWhere("address LIKE :address",  { address: `%${address}%` });
    if (guests) query.andWhere('r."guestsAmount" = :guests', { guests });
    if (rooms) query.andWhere('size = :rooms', {rooms});

    if (order) query.orderBy('r.price', order);


    const [result, count] = await query.getManyAndCount();

    return {
      result, count
    }
  }
}
