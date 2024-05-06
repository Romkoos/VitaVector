import { IsArray } from 'class-validator';
import { ColumnDto } from './column.dto';

export class ColumnsOrderDto {
  @IsArray()
  columns: ColumnDto[];
}
