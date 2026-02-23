import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    getters: true, // Enable getters to be used
    virtuals: true,
  },
})
export class Budget {
  @Prop({ required: true })
  category: string;

  @Prop({
    type: 'Decimal128',
    required: true,
    get: (v: any) => (v ? parseFloat(v.toString()) : null),
  })
  budget_amount: string;
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
