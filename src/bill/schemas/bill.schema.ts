import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Schema({
  timestamps: true,
  toJSON: {
    getters: true, // Enable getters to be used
    virtuals: true,
  },
})
export class Bill {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: SchemaTypes.Decimal128,
    required: true,
    get: (v: any) => (v ? parseFloat(v.toString()) : null),
  })
  amount: string;

  @Prop({ required: true })
  due_date: Date;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  status: string;

  @Prop()
  is_recurring: Boolean;

  @Prop()
  frequency: string;

  @Prop()
  notes: string;

  // Foreign key reference to User
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
