import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsArray()
  @IsOptional()
  tasks?: string[];

  @IsString()
  @IsOptional()
  createdAt?: string;
}
