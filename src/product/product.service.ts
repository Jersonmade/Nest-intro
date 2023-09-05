import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ProductModel } from './product.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { ReviewModel } from 'src/review/review.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel)
    private readonly productModel: ModelType<ProductModel>,
  ) {}

  async create(dto: CreateProductDto) {
    return this.productModel.create(dto);
  }

  async getById(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }
    return product;
  }

  async deleteById(id: string) {
    const deleteProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deleteProduct) {
      throw new NotFoundException('Продукт не найден');
    }
    return deleteProduct;
  }

  async updateById(id: string, dto: CreateProductDto) {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException('Продукт не найден');
    }
    return updatedProduct;
  }

  async searchProductWithReviews(dto: SearchProductDto) {
    return this.productModel
      .aggregate([
        {
          $match: {
            title: dto.title,
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $limit: dto.limit,
        },
        {
          $lookup: {
            from: 'Review',
            localField: '_id',
            foreignField: 'productId',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$reviews' },
            reviewAvg: { $avg: '$review.rating' },
            reviews: {
              $function: {
                body: `function(reviews) {
                  reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  return reviews;
                }`,
                args: ['$reviews'],
                lang: 'js',
              },
            },
          },
        },
      ])
      .exec() as unknown as (ProductModel & {
      review: ReviewModel[];
      reviewCount: number;
      reviewAvg: number;
    })[];
  }
}
