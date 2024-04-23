import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Priority } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  name: string;

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
