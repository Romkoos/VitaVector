import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Priority } from '@prisma/client';
import { Transform } from 'class-transformer';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  isCompleted?: boolean;

  @IsString()
  @IsOptional()
  createdAt?: string;

  @IsEnum(Priority)
  @IsOptional()
  @Transform(({ value }) => ('' + value).toLowerCase().replace(' ', '_'))
  priority?: Priority;
}
