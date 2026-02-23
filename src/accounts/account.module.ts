import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountSchema } from './schemas/account.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
    AuthModule,
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
