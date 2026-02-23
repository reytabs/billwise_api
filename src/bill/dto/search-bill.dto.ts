import { IsInt, IsOptional } from 'class-validator';

export class SearchBillDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  limit?: number;

  @IsOptional()
  user?: string;
}
