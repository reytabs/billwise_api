import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Budget } from './schemas/budget.schema';
import { SearchBudgetDto } from './dto/search-budget.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/budgets')
@UseGuards(JwtAuthGuard)
export class BudgetController {
  constructor(private budgetService: BudgetService) {}

  @Get()
  async getAllBudgets(@Query() query: SearchBudgetDto): Promise<Budget[]> {
    return this.budgetService.findAll(query);
  }

  @Post()
  async createBudget(@Body() budget: CreateBudgetDto): Promise<Budget> {
    return this.budgetService.create(budget as any);
  }

  @Get(':id')
  async getBudget(@Param('id') id: string): Promise<Budget> {
    return this.budgetService.findById(id);
  }

  @Put(':id')
  async updateBudget(
    @Param('id') id: string,
    @Body() budget: UpdateBudgetDto,
  ): Promise<Budget> {
    return this.budgetService.updateById(id, budget as any);
  }

  @Delete(':id')
  async deleteBudget(@Param('id') id: string): Promise<Budget> {
    return this.budgetService.deleteById(id);
  }
}
