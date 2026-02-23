import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Bill } from './schemas/bill.schema';
import { SearchBillDto } from '../bill/dto/search-bill.dto';

@Injectable()
export class BillService {
  constructor(
    @InjectModel(Bill.name)
    private billModel: mongoose.Model<Bill>,
  ) {}

  async findAll(query: SearchBillDto): Promise<Bill[]> {
    const resPerPage = 10;
    const page = query.page || 1;
    const skip = resPerPage * (page - 1);

    const filter: any = {};
    if (query.name) filter.name = new RegExp(query.name, 'i');
    if (query.user) filter.user = new RegExp(query.user, 'i');

    const res = await this.billModel
      .find(filter)
      .limit(resPerPage)
      .skip(skip)
      .exec();
    return res;
  }

  async create(bill: Bill, userId: string): Promise<Bill> {
    const toCreate = { ...bill, user: userId } as any;
    const res = await this.billModel.create(toCreate);

    if (!res) throw new NotFoundException('Bill could not be created.');

    return res;
  }

  async findById(id: string): Promise<Bill> {
    const res = await this.billModel.findById(id);

    if (!res) throw new NotFoundException('Bill not found.');

    return res;
  }

  async updateById(id: string, book: Bill): Promise<Bill> {
    const res = await this.billModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });

    if (!res) throw new NotFoundException(`Bill with id ${id} not found`);

    return res;
  }

  async deleteById(id: string): Promise<Bill> {
    const res = await this.billModel.findByIdAndDelete(id);

    if (!res) throw new NotFoundException(`Bill with id ${id} not found`);

    return res;
  }
}
