import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from '../bill/dto/create-bill.dto';
import { UpdateBillDto } from '../bill/dto/update-bill.dto';
import { Bill } from './schemas/bill.schema';
import { SearchBillDto } from '../bill/dto/search-bill.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/bills')
@UseGuards(JwtAuthGuard)
export class BillController {
  constructor(private billService: BillService) {}

  @Get()
  async getAllBills(@Query() query: SearchBillDto): Promise<Bill[]> {
    return this.billService.findAll(query);
  }

  @Post()
  async createBill(
    @Body()
    bill: CreateBillDto,
  ): Promise<Bill> {
    return this.billService.create(bill);
  }

  @Get(':id')
  async getBill(
    @Param('id')
    id: string,
  ): Promise<Bill> {
    return this.billService.findById(id);
  }

  @Put(':id')
  async updateBill(
    @Param('id')
    id: string,
    @Body()
    bill: UpdateBillDto,
  ): Promise<Bill> {
    return this.billService.updateById(id, bill);
  }

  @Delete(':id')
  async deleteBill(
    @Param('id')
    id: string,
  ): Promise<Bill> {
    return this.billService.deleteById(id);
  }
}
