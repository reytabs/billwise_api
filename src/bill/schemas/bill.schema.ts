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
  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: SchemaTypes.Decimal128,
    required: true,
    get: (v: any) => (v ? parseFloat(v.toString()) : null),
  })
  amount: string;

  @Prop({ type: Date, required: true })
  due_date: Date;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({ type: String, default: 'pending' })
  status: string;

  @Prop({ type: Boolean, default: false })
  is_recurring: Boolean;

  @Prop({ type: String })
  frequency: string;

  @Prop({ type: String })
  notes: string;

  // Foreign key reference to User
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
