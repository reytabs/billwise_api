import { IsInt, IsOptional } from 'class-validator';

export class SearchGoalDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  limit?: number;
}
