import { ModelType } from '@typegoose/typegoose/lib/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TopLevelCategory, TopPageModel } from './top-page.model';
import { createTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel)
    private readonly topPageModel: ModelType<TopPageModel>,
  ) {}

  async create(dto: createTopPageDto) {
    return this.topPageModel.create(dto);
  }

  async getById(id: string) {
    const topPage = await this.topPageModel.findById(id).exec();
    if (!topPage) {
      throw new NotFoundException('Страница не найден');
    }
    return topPage;
  }

  async getByAlias(alias: string) {
    const topPage = await this.topPageModel.findOne({ alias }).exec();
    if (!topPage) {
      throw new NotFoundException('Страница не найден');
    }
    return topPage;
  }

  async getByCategory(firsCategory: TopLevelCategory) {
    return this.topPageModel
      .find({ firsCategory }, { alias: 1, secondCategory: 1, title: 1 })
      .exec();
  }

  async deleteById(id: string) {
    const deletedTopPage = await this.topPageModel.findByIdAndDelete(id).exec();
    if (!deletedTopPage) {
      throw new NotFoundException('Страница не найден');
    }
    return deletedTopPage;
  }

  async updateById(id: string, dto: createTopPageDto) {
    const updatedTopPage = await this.topPageModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updatedTopPage) {
      throw new NotFoundException('Страница не найден');
    }
    return updatedTopPage;
  }
}
