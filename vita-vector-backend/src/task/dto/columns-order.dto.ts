import { IsArray } from 'class-validator';

export class ColumnsOrderDto {
  @IsArray()
  columns: string[];
}
