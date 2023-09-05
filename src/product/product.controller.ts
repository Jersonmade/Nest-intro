import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductModel } from './product.model';
import { SearchProductDto } from './dto/search-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { IDValidationPipe } from '../pipes/id-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IDValidationPipe) id: string) {
    return this.productService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IDValidationPipe) id: string) {
    return this.productService.deleteById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(
    @Param('id', IDValidationPipe) id: string,
    @Body() dto: ProductModel,
  ) {
    return this.productService.updateById(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('search')
  @HttpCode(200)
  async search(@Body() dto: SearchProductDto) {
    return this.productService.searchProductWithReviews(dto);
  }
}
