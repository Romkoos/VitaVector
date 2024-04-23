import { IsArray, IsString } from 'class-validator';

export class UpdateOrderTimeBlockDto {
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}
