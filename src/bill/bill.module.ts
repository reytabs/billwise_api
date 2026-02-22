import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { Mongoose } from 'mongoose';
import { BillSchema } from './schemas/bill.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Bill', schema: BillSchema }]),
    AuthModule,
  ],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
