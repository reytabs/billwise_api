import { IsInt, IsOptional } from 'class-validator';

export class SearchAccountDto {
  @IsOptional()
  account_name?: string;

  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  limit?: number;
}
