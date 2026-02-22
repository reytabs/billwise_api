import { Types } from 'mongoose';

export class CreateTransactionDto {
  readonly transaction_name: string;
  readonly amount: string;
  readonly date: Date;
  readonly transaction_type: string;
  readonly category: string;
  readonly bank_account?: Types.ObjectId;
  readonly user?: Types.ObjectId;
}
