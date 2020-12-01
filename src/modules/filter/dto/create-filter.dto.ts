import { Category } from '../../category/category.entity';

export class CreateFilterDto {
  category: Category;
  filter: string;
}
