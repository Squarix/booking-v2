import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Filter } from './filter.entity';
import { FilterService } from './filter.service';

@Module({
  imports: [TypeOrmModule.forFeature([Filter])],
  providers: [FilterService],
  exports: [FilterService],
})
export class FilterModule {}
