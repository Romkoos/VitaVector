import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  taskIds?: string[];

  @IsString()
  @IsOptional()
  createdAt?: string;
}
