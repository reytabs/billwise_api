import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { Goal } from './schemas/goal.schema';
import { SearchGoalDto } from './dto/search-goal.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/goals')
@UseGuards(JwtAuthGuard)
export class GoalController {
  constructor(private goalService: GoalService) {}

  @Get()
  async getAllGoals(@Query() query: SearchGoalDto): Promise<Goal[]> {
    return this.goalService.findAll(query);
  }

  @Post()
  async createGoal(
    @Body() goal: CreateGoalDto,
    @Req() req: any,
  ): Promise<Goal> {
    const userId = req.user?.id || req.user?._id;
    return this.goalService.create(goal as any, userId);
  }

  @Get(':id')
  async getGoal(@Param('id') id: string): Promise<Goal> {
    return this.goalService.findById(id);
  }

  @Put(':id')
  async updateGoal(
    @Param('id') id: string,
    @Body() goal: UpdateGoalDto,
  ): Promise<Goal> {
    return this.goalService.updateById(id, goal as any);
  }

  @Delete(':id')
  async deleteGoal(@Param('id') id: string): Promise<Goal> {
    return this.goalService.deleteById(id);
  }
}
