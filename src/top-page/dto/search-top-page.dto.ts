/* eslint-disable prettier/prettier */
import { IsEnum } from 'class-validator';
import { TopLevelCategory } from '../top-page.model';

export class SearchTopPageDto {
  @IsEnum(TopLevelCategory)
  firsCategory: TopLevelCategory;
}
