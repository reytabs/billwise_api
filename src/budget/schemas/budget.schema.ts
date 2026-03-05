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

  @Prop({ required: true })
  month: number;

  @Prop({ required: true })
  year: number; 

  @Prop({ required: true })
  account_id: string;

  @Prop({ required: false })
  user_id: string;
  
  @Prop({ required: false })
  goal_id?: string;
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
