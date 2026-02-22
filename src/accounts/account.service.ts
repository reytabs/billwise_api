import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Account } from './schemas/account.schema';
import { SearchAccountDto } from './dto/search-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private accountModel: mongoose.Model<Account>,
  ) {}

  async findAll(query: SearchAccountDto): Promise<Account[]> {
    const resPerPage = 2;
    const page = query.page || 1;
    const skip = resPerPage * (page - 1);

    const filter: any = {};
    if (query.account_name)
      filter.account_name = new RegExp(query.account_name, 'i');

    const res = await this.accountModel
      .find(filter)
      .limit(resPerPage)
      .skip(skip)
      .exec();
    return res;
  }

  async create(account: Account): Promise<Account> {
    const res = await this.accountModel.create(account);
    if (!res) throw new NotFoundException('Account could not be created.');
    return res;
  }

  async findById(id: string): Promise<Account> {
    const res = await this.accountModel.findById(id);
    if (!res) throw new NotFoundException('Account not found.');
    return res;
  }

  async updateById(id: string, account: Account): Promise<Account> {
    const res = await this.accountModel.findByIdAndUpdate(id, account, {
      new: true,
      runValidators: true,
    });
    if (!res) throw new NotFoundException(`Account with id ${id} not found`);
    return res;
  }

  async deleteById(id: string): Promise<Account> {
    const res = await this.accountModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException(`Account with id ${id} not found`);
    return res;
  }
}
