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
export class Account {
  @Prop({ required: true })
  account_name: string;

  @Prop({ required: true })
  bank_name: string;

  @Prop({ required: true })
  account_type: string;

  @Prop({
    type: SchemaTypes.Decimal128,
    required: true,
    get: (v: Types.Decimal128) => (v ? parseFloat(v.toString()) : null),
  })
  current_balance: string;

  @Prop({ required: false })
  last_4_digits?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
