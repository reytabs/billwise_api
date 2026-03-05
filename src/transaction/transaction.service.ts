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
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = limit * (page - 1);

    const filter: any = {};
    if (query.transaction_name)
      filter.transaction_name = new RegExp(query.transaction_name, 'i');
    if (query.category) filter.category = new RegExp(query.category, 'i');
    if (query.transaction_type) filter.transaction_type = query.transaction_type;
    if (query.bank_account) filter.bank_account = query.bank_account;
    if (query.user) filter.user = query.user;

    // Date range filtering
    if (query.start_date || query.end_date) {
      filter.date = {};
      if (query.start_date) filter.date.$gte = new Date(query.start_date);
      if (query.end_date) filter.date.$lte = new Date(query.end_date);
    }

    const res = await this.transactionModel
      .find(filter)
      .populate('bank_account')
      .sort({ date: -1 })
      .limit(limit)
      .skip(skip)
      .exec();
    return res;
  }

  async create(transaction: any, userId: string): Promise<Transaction> {
    const toCreate: any = { ...transaction, user: userId };
    if (toCreate.amount !== undefined && toCreate.amount !== null) {
      toCreate.amount = mongoose.Types.Decimal128.fromString(
        String(toCreate.amount),
      );
    }
    if (toCreate.date) {
      toCreate.date = new Date(toCreate.date);
    }

    const res = await this.transactionModel.create(toCreate);
    if (!res) throw new NotFoundException('Transaction could not be created.');
    return res;
  }

  async findById(id: string): Promise<Transaction> {
    const res = await this.transactionModel.findById(id);
    if (!res) throw new NotFoundException('Transaction not found.');
    return res;
  }

  async updateById(id: string, transaction: any): Promise<Transaction> {
    const toUpdate: any = { ...transaction };
    if (toUpdate.amount !== undefined && toUpdate.amount !== null) {
      toUpdate.amount = mongoose.Types.Decimal128.fromString(
        String(toUpdate.amount),
      );
    }
    if (toUpdate.date) {
      toUpdate.date = new Date(toUpdate.date);
    }

    const res = await this.transactionModel.findByIdAndUpdate(id, toUpdate, {
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

  async getTransactionStats(userId: string, startDate?: Date, endDate?: Date) {
    const matchFilter: any = { user: userId };

    if (startDate || endDate) {
      matchFilter.date = {};
      if (startDate) matchFilter.date.$gte = startDate;
      if (endDate) matchFilter.date.$lte = endDate;
    }

    const stats = await this.transactionModel.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: '$transaction_type',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    return stats;
  }

  async getTransactionsByType(userId: string, type: string, limit = 10) {
    return this.transactionModel
      .find({ user: userId, transaction_type: type })
      .populate('bank_account')
      .sort({ date: -1 })
      .limit(limit)
      .exec();
  }
}
