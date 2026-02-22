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
    const resPerPage = 2;
    const page = query.page || 1;
    const skip = resPerPage * (page - 1);

    const filter: any = {};
    if (query.category) filter.category = new RegExp(query.category, 'i');

    const res = await this.budgetModel
      .find(filter)
      .limit(resPerPage)
      .skip(skip)
      .exec();
    return res;
  }

  async create(budget: Budget): Promise<Budget> {
    const res = await this.budgetModel.create(budget);
    if (!res) throw new NotFoundException('Budget could not be created.');
    return res;
  }

  async findById(id: string): Promise<Budget> {
    const res = await this.budgetModel.findById(id);
    if (!res) throw new NotFoundException('Budget not found.');
    return res;
  }

  async updateById(id: string, budget: Budget): Promise<Budget> {
    const res = await this.budgetModel.findByIdAndUpdate(id, budget, {
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
