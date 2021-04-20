import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';

import { Room, RoomStatus } from './room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { Image } from '../image/image.entity';
import { Filter } from '../filter/filter.entity';
import { City } from '../city/city.entity';
import { User } from '../users/user.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async findUserRoomIds(user: User): Promise<Room[]> {
    return this.roomRepository
      .createQueryBuilder('room')
      .select('"id"')
      .where('"userId" = :userId', { userId: user.id })
      .getRawMany();
  }

  async findUserRooms(
    user: User,
    take = 20,
    skip = 0,
  ): Promise<ManyModelDto<Room>> {
    const [result, count] = await this.roomRepository.findAndCount({
      where: { user },
      relations: ['city'],
      skip,
      take,
    });

    return {
      result,
      count,
    };
  }

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
    room.lat = newRoom.lat;
    room.lng = newRoom.lng;
    room.price = newRoom.price;
    room.size = newRoom.size;
    room.user = user;

    return this.roomRepository.save(room);
  }

  findAllWithKeywords(): Promise<Room[]> {
    return this.roomRepository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.filters', 'filters')
      // .select(['r.id, filters.filter'])
      .getMany();
  }

  findAllWithDescription(): Promise<{ id: number; description: string }[]> {
    return this.roomRepository.find({
      select: ['id', 'description'],
      where: { status: RoomStatus.published },
    });
  }

  async findAllPending(take = 21, skip = 0): Promise<ManyModelDto<Room>> {
    const [result, count] = await this.roomRepository.findAndCount({
      relations: ['city', 'user'],
      where: { status: RoomStatus.pending },
      skip,
      take,
    });

    return {
      result,
      count,
    };
  }

  async changeStatus(id: number, newStatus: RoomStatus): Promise<Room> {
    const room = await this.findOne(id);
    room.status = newStatus;

    return this.roomRepository.save(room);
  }

  async updateRoom(id: number, body: any): Promise<Room> {
    await this.roomRepository.update(id, {
      ...body,
      status: RoomStatus.pending,
    });
    return this.findOne(id);
  }

  async findAll(
    take = 21,
    skip = 0,
    order: 'ASC' | 'DESC',
    filters: string,
    address: string,
    guests: number,
    rooms: number,
    city: string,
  ): Promise<ManyModelDto<Room>> {
    const query = this.roomRepository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.image', 'image')
      .leftJoinAndSelect('r.filters', 'filters')
      .leftJoinAndSelect('r.city', 'city')
      .skip(skip)
      .take(take)
      .where('status = :status', { status: RoomStatus.published });

    if (filters) {
      const filtersArray = filters.split(',').map((f) => Number.parseInt(f));
      query.andWhere('filters.id in (:...filters)', { filters: filtersArray });
    }
    if (address)
      query.andWhere('address LIKE :address', { address: `%${address}%` });
    if (guests) query.andWhere('r."guestsAmount" = :guests', { guests });
    if (rooms) query.andWhere('size = :rooms', { rooms });
    if (city) query.andWhere('city."name" LIKE :city', { city: `%${city}%` });

    if (order) query.orderBy('r.price', order);

    const [result, count] = await query.getManyAndCount();

    return {
      result,
      count,
    };
  }
}
