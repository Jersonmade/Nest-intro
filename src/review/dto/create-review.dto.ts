/* eslint-disable prettier/prettier */
import { IsNumber, IsString, Max, Min } from 'class-validator';
/* eslint-disable prettier/prettier */
export class CreateReviewDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @Min(1)
  @Max(5)
  @IsNumber()
  rating: number;

  @IsString()
  productId: string;
}