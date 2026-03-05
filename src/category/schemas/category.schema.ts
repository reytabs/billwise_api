import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Type {
  ACCOUNT_TYPE = 'account_type ',
  BILL_TYPE = 'bill_type',
}

@Schema({
  timestamps: true,
})
export class Category {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, enum: Type, required: true })
  type: Type;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
