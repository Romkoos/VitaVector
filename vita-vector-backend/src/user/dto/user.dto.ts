import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class PomodoroSettignsDto {
  @IsNumber()
  @IsOptional()
  @Min(1)
  workInterval?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  breakInterval?: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(10)
  intervalsCount?: number;
}

export class UserDto extends PomodoroSettignsDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @MinLength(6, {
    message: 'Password must be at least 6 characters long.',
  })
  @IsOptional()
  @IsString()
  password?: string;
}
