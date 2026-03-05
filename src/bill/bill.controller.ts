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
  async getAllBills(
    @Query() query: SearchBillDto,
    @Req() req: any,
  ): Promise<Bill[]> {
    query.user = req.user?.id || req.user?._id;
    return this.billService.findAll({ ...query } as any);
  }

  @Post()
  async createBill(
    @Body()
    bill: CreateBillDto,
    @Req() req: any,
  ): Promise<Bill | Bill[]> {
    const userId = req.user?.id || req.user?._id;
    console.log('Creating bill for user:', userId);
    return this.billService.create(bill as any, userId);
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
