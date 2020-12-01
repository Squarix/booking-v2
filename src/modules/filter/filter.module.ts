import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Filter } from './filter.entity';
import { FilterService } from './filter.service';
import { CategoryModule } from '../category/category.module';
import { Category } from '../category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Filter, Category]), CategoryModule],
  providers: [FilterService],
  exports: [FilterService],
})
export class FilterModule {}
