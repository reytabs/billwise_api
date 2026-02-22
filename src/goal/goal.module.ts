import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';
import { GoalSchema } from './schemas/goal.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Goal', schema: GoalSchema }]),
    AuthModule,
  ],
  controllers: [GoalController],
  providers: [GoalService],
})
export class GoalModule {}
