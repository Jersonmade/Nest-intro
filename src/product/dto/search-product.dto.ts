/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator';

export class SearchProductDto {
  @IsString()
  title: string;

  @IsNumber()
  limit: number;
}
