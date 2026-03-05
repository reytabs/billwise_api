import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Budget } from './schemas/budget.schema';
import { SearchBudgetDto } from './dto/search-budget.dto';

@Injectable()
export class BudgetService {
  constructor(
    @InjectModel(Budget.name)
    private budgetModel: mongoose.Model<Budget>,
  ) {}

  async findAll(query: SearchBudgetDto): Promise<Budget[]> {
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = limit * (page - 1);

    const filter: any = {};
    if (query.category) filter.category = new RegExp(query.category, 'i');
    if (query.month !== undefined) filter.month = query.month;
    if (query.year !== undefined) filter.year = query.year;
    if (query.account_id) filter.account_id = query.account_id;
    if (query.user_id) filter.user_id = query.user_id;
    if (query.goal_id) filter.goal_id = query.goal_id;

    const res = await this.budgetModel.find(filter).limit(limit).skip(skip).exec();
    return res;
  }

  async create(budget: any): Promise<Budget> {
    const toCreate: any = { ...budget };
    if (toCreate.budget_amount !== undefined && toCreate.budget_amount !== null) {
      toCreate.budget_amount = mongoose.Types.Decimal128.fromString(
        String(toCreate.budget_amount),
      );
    }

    const res = await this.budgetModel.create(toCreate);
    if (!res) throw new NotFoundException('Budget could not be created.');
    return res;
  }

  async findById(id: string): Promise<Budget> {
    const res = await this.budgetModel.findById(id);
    if (!res) throw new NotFoundException('Budget not found.');
    return res;
  }

  async updateById(id: string, budget: any): Promise<Budget> {
    const toUpdate: any = { ...budget };
    if (toUpdate.budget_amount !== undefined && toUpdate.budget_amount !== null) {
      toUpdate.budget_amount = mongoose.Types.Decimal128.fromString(
        String(toUpdate.budget_amount),
      );
    }

    const res = await this.budgetModel.findByIdAndUpdate(id, toUpdate, {
      new: true,
      runValidators: true,
    });
    if (!res) throw new NotFoundException(`Budget with id ${id} not found`);
    return res;
  }

  async deleteById(id: string): Promise<Budget> {
    const res = await this.budgetModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException(`Budget with id ${id} not found`);
    return res;
  }
}
