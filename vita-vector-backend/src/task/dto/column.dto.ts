import { ArrayNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';

export class ColumnDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  taskIds?: string[];

  @IsString()
  @IsOptional()
  createdAt?: string;
}
