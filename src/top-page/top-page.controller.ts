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
import { TopPageModel } from './top-page.model';
import { SearchTopPageDto } from './dto/search-top-page.dto';
import { TopPageService } from './top-page.service';
import { createTopPageDto } from './dto/create-top-page.dto';
import { IDValidationPipe } from 'src/pipes/id-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: createTopPageDto) {
    return this.topPageService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IDValidationPipe) id: string) {
    return this.topPageService.getById(id);
  }

  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    return this.topPageService.getByAlias(alias);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IDValidationPipe) id: string) {
    return this.topPageService.deleteById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(
    @Param('id', IDValidationPipe) id: string,
    @Body() dto: TopPageModel,
  ) {
    return this.topPageService.updateById(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('search')
  @HttpCode(200)
  async search(@Body() dto: SearchTopPageDto) {
    return this.topPageService.getByCategory(dto.firsCategory);
  }
}
