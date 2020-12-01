import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../room/room.entity';
import { Repository } from 'typeorm';
import { ImageService } from '../image/image.service';
import { CreateRoomDto } from '../room/dto/create-room.dto';
import { Filter } from './filter.entity';
import { CreateFilterDto } from './dto/create-filter.dto';
import { Category } from '../category/category.entity';

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Filter)
    private filterRepository: Repository<Filter>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(newFilter: CreateFilterDto): Promise<Filter> {
    const filter = new Filter();
    filter.filter = newFilter.filter;
    filter.category = newFilter.category;

    return this.filterRepository.save(filter);
  }

  async findOneOrCreate(name: string, categoryId: number): Promise<Filter> {
    const filter = await this.filterRepository.findOne({
      where: {
        categoryId,
        filter: name,
      },
    });

    if (!filter) {
      const category = await this.categoryRepository.findOne(categoryId);

      if (!category) throw new Error('Category missing!');
      return this.create({ category, filter: name });
    }

    return filter;
  }
}
