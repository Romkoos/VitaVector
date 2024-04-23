import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class PomodoroRoundDto {
  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;

  @IsNumber()
  totalSeconds: number;
}
