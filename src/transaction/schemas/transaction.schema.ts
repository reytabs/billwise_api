import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Transaction {
  @Prop({ required: true })
  transaction_name: string;

  @Prop({ type: SchemaTypes.Decimal128, required: true })
  amount: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  transaction_type: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: Types.ObjectId, ref: 'Account', required: false })
  bank_account?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  user?: Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
