import { IsNotEmpty, IsString, IsNumber, IsDateString, IsOptional, IsMongoId } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  readonly transaction_name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsNotEmpty()
  @IsDateString()
  readonly date: string;

  @IsNotEmpty()
  @IsString()
  readonly transaction_type: string;

  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @IsOptional()
  @IsMongoId()
  readonly bank_account?: string;

  @IsOptional()
  @IsMongoId()
  readonly user?: string;
}
