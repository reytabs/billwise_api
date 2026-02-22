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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';
import { SearchCategoryDto } from './dto/search-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/categories')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async getAllCategories(
    @Query() query: SearchCategoryDto,
  ): Promise<Category[]> {
    return this.categoryService.findAll(query);
  }

  @Post()
  async createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(category as any);
  }

  @Get(':id')
  async getCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findById(id);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() category: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateById(id, category as any);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.categoryService.deleteById(id);
  }
}
