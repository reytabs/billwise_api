import { IsInt, IsOptional, IsString, IsDateString, IsMongoId } from 'class-validator';

export class SearchTransactionDto {
  @IsOptional()
  @IsString()
  transaction_name?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  transaction_type?: string;

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsMongoId()
  bank_account?: string;

  @IsOptional()
  @IsMongoId()
  user?: string;

  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  limit?: number;
}
