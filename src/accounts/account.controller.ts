import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './schemas/account.schema';
import { SearchAccountDto } from './dto/search-account.dto';

@Controller('api/accounts')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  async getAllAccounts(@Query() query: SearchAccountDto): Promise<Account[]> {
    return this.accountService.findAll(query);
  }

  @Post()
  async createAccount(
    @Body() account: CreateAccountDto,
    @Req() req: any,
  ): Promise<Account> {
    const userId = req.user?.id || req.user?._id;
    return this.accountService.create(account as any, userId);
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
