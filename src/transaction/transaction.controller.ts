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
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './schemas/transaction.schema';
import { SearchTransactionDto } from './dto/search-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  async getAllTransactions(
    @Query() query: SearchTransactionDto,
    @Req() req: any,
  ): Promise<Transaction[]> {
    const userId = req.user?.id || req.user?._id;
    if (userId) {
      query.user = userId;
    }
    return this.transactionService.findAll(query);
  }

  @Post()
  async createTransaction(
    @Body() transaction: CreateTransactionDto,
    @Req() req: any,
  ): Promise<Transaction> {
    const userId = req.user?.id || req.user?._id;
    return this.transactionService.create(transaction as any, userId);
  }

  @Get(':id')
  async getTransaction(@Param('id') id: string): Promise<Transaction> {
    return this.transactionService.findById(id);
  }

  @Put(':id')
  async updateTransaction(
    @Param('id') id: string,
    @Body() transaction: UpdateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.updateById(id, transaction as any);
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') id: string): Promise<Transaction> {
    return this.transactionService.deleteById(id);
  }

  @Get('stats/summary')
  async getTransactionStats(
    @Req() req: any,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const userId = req.user?.id || req.user?._id;
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.transactionService.getTransactionStats(userId, start, end);
  }

  @Get('type/:type')
  async getTransactionsByType(
    @Param('type') type: string,
    @Req() req: any,
    @Query('limit') limit?: number,
  ): Promise<Transaction[]> {
    const userId = req.user?.id || req.user?._id;
    return this.transactionService.getTransactionsByType(userId, type, limit);
  }
}
