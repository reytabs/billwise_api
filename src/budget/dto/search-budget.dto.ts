import { IsInt, IsOptional } from 'class-validator';

export class SearchBudgetDto {
  @IsOptional()
  category?: string;

  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  limit?: number;
}
