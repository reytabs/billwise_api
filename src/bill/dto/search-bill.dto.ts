import { IsInt, IsOptional } from 'class-validator';

export class SearchBillDto {
  @IsOptional()
  name?: string;

  // @IsOptional()
  // author?: string;

  // @IsOptional()
  // category?: string;

  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  limit?: number;
}
