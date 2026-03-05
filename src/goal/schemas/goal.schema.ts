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
export class Goal {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: SchemaTypes.Decimal128,
    required: true,
    get: (v: any) => (v ? parseFloat(v.toString()) : null),
  })
  target_amount: string;

  @Prop({
    type: SchemaTypes.Decimal128,
    required: true,
    get: (v: any) => (v ? parseFloat(v.toString()) : null),
  })
  current_amount: string;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({ type: Date, required: true })
  target_date: Date;

  // optional user reference for ownership
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
