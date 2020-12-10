import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async getFilters(limit = 20): Promise<Filter[]> {
    return this.filterRepository
      .createQueryBuilder('filter')
      .innerJoinAndSelect('filter.rooms', 'rooms')
      .loadRelationCountAndMap('filter.roomsCount', 'filter.rooms')
      .orderBy('filter.id', 'DESC')
      .select(['filter.id', 'filter.filter', 'filter.categoryId'])
      .limit(limit)
      .getMany();
  }
}
