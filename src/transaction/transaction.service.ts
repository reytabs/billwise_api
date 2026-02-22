import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Transaction } from './schemas/transaction.schema';
import { SearchTransactionDto } from './dto/search-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: mongoose.Model<Transaction>,
  ) {}

  async findAll(query: SearchTransactionDto): Promise<Transaction[]> {
    const resPerPage = 2;
    const page = query.page || 1;
    const skip = resPerPage * (page - 1);

    const filter: any = {};
    if (query.transaction_name)
      filter.transaction_name = new RegExp(query.transaction_name, 'i');
    if (query.category) filter.category = new RegExp(query.category, 'i');

    const res = await this.transactionModel
      .find(filter)
      .limit(resPerPage)
      .skip(skip)
      .exec();
    return res;
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const res = await this.transactionModel.create(transaction);
    if (!res) throw new NotFoundException('Transaction could not be created.');
    return res;
  }

  async findById(id: string): Promise<Transaction> {
    const res = await this.transactionModel.findById(id);
    if (!res) throw new NotFoundException('Transaction not found.');
    return res;
  }

  async updateById(id: string, transaction: Transaction): Promise<Transaction> {
    const res = await this.transactionModel.findByIdAndUpdate(id, transaction, {
      new: true,
      runValidators: true,
    });
    if (!res)
      throw new NotFoundException(`Transaction with id ${id} not found`);
    return res;
  }

  async deleteById(id: string): Promise<Transaction> {
    const res = await this.transactionModel.findByIdAndDelete(id);
    if (!res)
      throw new NotFoundException(`Transaction with id ${id} not found`);
    return res;
  }
}
