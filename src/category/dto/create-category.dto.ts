import { Type } from '../schemas/category.schema';

export class CreateCategoryDto {
  readonly name: string;
  readonly type?: Type;
}
