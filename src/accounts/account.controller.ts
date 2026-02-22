import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './schemas/account.schema';
import { SearchAccountDto } from './dto/search-account.dto';

@Controller('api/accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  async getAllAccounts(@Query() query: SearchAccountDto): Promise<Account[]> {
    return this.accountService.findAll(query);
  }

  @Post()
  async createAccount(@Body() account: CreateAccountDto): Promise<Account> {
    return this.accountService.create(account as any);
  }

  @Get(':id')
  async getAccount(@Param('id') id: string): Promise<Account> {
    return this.accountService.findById(id);
  }

  @Put(':id')
  async updateAccount(
    @Param('id') id: string,
    @Body() account: UpdateAccountDto,
  ): Promise<Account> {
    return this.accountService.updateById(id, account as any);
  }

  @Delete(':id')
  async deleteAccount(@Param('id') id: string): Promise<Account> {
    return this.accountService.deleteById(id);
  }
}
