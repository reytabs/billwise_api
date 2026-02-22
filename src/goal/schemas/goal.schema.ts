import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Goal {
  @Prop({ required: true })
  name: string;

  @Prop({ type: SchemaTypes.Decimal128, required: true })
  target_amount: string;

  @Prop({ type: SchemaTypes.Decimal128, required: true })
  current_amount: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  target_date: Date;

  // optional user reference for ownership
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
