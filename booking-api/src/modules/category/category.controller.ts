import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly catService: CategoryService) {}

  @Get('/')
  findAll(): Promise<Category[]> {
    return this.catService.findAll();
  }
}
