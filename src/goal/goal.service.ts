import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Goal } from './schemas/goal.schema';
import { SearchGoalDto } from './dto/search-goal.dto';

@Injectable()
export class GoalService {
  constructor(
    @InjectModel(Goal.name)
    private goalModel: mongoose.Model<Goal>,
  ) {}

  async findAll(query: SearchGoalDto): Promise<Goal[]> {
    const resPerPage = 2;
    const page = query.page || 1;
    const skip = resPerPage * (page - 1);

    const filter: any = {};
    if (query.name) filter.name = new RegExp(query.name, 'i');

    const res = await this.goalModel
      .find(filter)
      .limit(resPerPage)
      .skip(skip)
      .exec();
    return res;
  }

  async create(goal: Goal): Promise<Goal> {
    const res = await this.goalModel.create(goal);
    if (!res) throw new NotFoundException('Goal could not be created.');
    return res;
  }

  async findById(id: string): Promise<Goal> {
    const res = await this.goalModel.findById(id);
    if (!res) throw new NotFoundException('Goal not found.');
    return res;
  }

  async updateById(id: string, goal: Goal): Promise<Goal> {
    const res = await this.goalModel.findByIdAndUpdate(id, goal, {
      new: true,
      runValidators: true,
    });
    if (!res) throw new NotFoundException(`Goal with id ${id} not found`);
    return res;
  }

  async deleteById(id: string): Promise<Goal> {
    const res = await this.goalModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException(`Goal with id ${id} not found`);
    return res;
  }
}
