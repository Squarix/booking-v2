import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from '../category/category.entity';
import { CategoryModule } from '../category/category.module';
import { Filter } from './filter.entity';
import { FilterController } from "./filter.controller";
import { FilterService } from './filter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Filter, Category]), CategoryModule],
  controllers: [FilterController],
  providers: [FilterService],
  exports: [FilterService],
})
export class FilterModule {}
