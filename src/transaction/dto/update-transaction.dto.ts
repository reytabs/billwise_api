import { IsOptional, IsString, IsNumber, IsDateString, IsMongoId } from 'class-validator';

export class UpdateTransactionDto {
  @IsOptional()
  @IsString()
  readonly transaction_name?: string;

  @IsOptional()
  @IsNumber()
  readonly amount?: number;

  @IsOptional()
  @IsDateString()
  readonly date?: string;

  @IsOptional()
  @IsString()
  readonly transaction_type?: string;

  @IsOptional()
  @IsString()
  readonly category?: string;

  @IsOptional()
  @IsMongoId()
  readonly bank_account?: string;

  @IsOptional()
  @IsMongoId()
  readonly user?: string;
}
