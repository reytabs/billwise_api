import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Budget {
  @Prop({ required: true })
  category: string;

  @Prop({ type: 'Decimal128', required: true })
  budget_amount: string;
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
