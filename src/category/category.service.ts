import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category } from './schemas/category.schema';
import { SearchCategoryDto } from './dto/search-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: mongoose.Model<Category>,
  ) {}

  async findAll(query: SearchCategoryDto): Promise<Category[]> {
    const resPerPage = 2;
    const page = query.page || 1;
    const skip = resPerPage * (page - 1);

    const filter: any = {};
    if (query.name) filter.name = new RegExp(query.name, 'i');

    const res = await this.categoryModel
      .find(filter)
      .limit(resPerPage)
      .skip(skip)
      .exec();
    return res;
  }

  async create(category: Category): Promise<Category> {
    const res = await this.categoryModel.create(category);
    if (!res) throw new NotFoundException('Category could not be created.');
    return res;
  }

  async findById(id: string): Promise<Category> {
    const res = await this.categoryModel.findById(id);
    if (!res) throw new NotFoundException('Category not found.');
    return res;
  }

  async updateById(id: string, category: Category): Promise<Category> {
    const res = await this.categoryModel.findByIdAndUpdate(id, category, {
      new: true,
      runValidators: true,
    });
    if (!res) throw new NotFoundException(`Category with id ${id} not found`);
    return res;
  }

  async deleteById(id: string): Promise<Category> {
    const res = await this.categoryModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException(`Category with id ${id} not found`);
    return res;
  }
}
