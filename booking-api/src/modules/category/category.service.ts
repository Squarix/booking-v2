import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private catRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.catRepository.find();
  }

  find(options): Promise<Category> {
    return this.catRepository.findOne(options);
  }
}
