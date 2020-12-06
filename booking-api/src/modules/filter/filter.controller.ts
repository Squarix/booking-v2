import {Controller, Get, Query} from '@nestjs/common';
import {FilterService} from "./filter.service";

@Controller('filters')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get()
  async updateStatus(@Query('limit') limit: number) {
    return this.filterService.getFilters(limit);
  }
}
