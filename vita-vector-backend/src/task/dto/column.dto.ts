import { IsArray, IsOptional, IsString } from 'class-validator';

export class ColumnDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @IsOptional()
  tasks?: string[];

  @IsString()
  @IsOptional()
  createdAt?: string;
}
