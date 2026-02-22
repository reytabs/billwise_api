import { IsInt, IsOptional } from 'class-validator';

export class SearchTransactionDto {
  @IsOptional()
  transaction_name?: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  limit?: number;
}
