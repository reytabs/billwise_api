import { Type } from '../schemas/category.schema';

export class UpdateCategoryDto {
  readonly name: string;
  readonly type?: Type;
}
