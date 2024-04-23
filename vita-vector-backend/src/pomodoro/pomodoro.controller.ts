import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put,
} from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { CurrentUser } from '../decorators/user.decorator';
import { PomodoroSessionDto } from './dto/pomodoro-session.dto';
import { Auth } from '../decorators/auth.decorators';
import { PomodoroRoundDto } from './dto/pomodoro-round.dto';

@Controller('user/timer')
export class PomodoroController {
  constructor(private readonly pomodoroService: PomodoroService) {}

  @Get('today')
  @Auth()
  getTodaySession(@CurrentUser('id') userId: string) {
    return this.pomodoroService.getTodaySession(userId);
  }

  @HttpCode(200)
  @Post()
  @Auth()
  createSession(@CurrentUser('id') userId: string) {
    return this.pomodoroService.createSession(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('/session/:id')
  @Auth()
  updateSession(
    @Body() pomodoroSessionDto: PomodoroSessionDto,
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.pomodoroService.updateSession(pomodoroSessionDto, id, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('/round/:id')
  @Auth()
  updateRound(
    @Body() pomodoroRoundDto: PomodoroRoundDto,
    @Param('id') id: string,
  ) {
    return this.pomodoroService.updateRound(pomodoroRoundDto, id);
  }

  @HttpCode(200)
  @Delete('/session/:id')
  @Auth()
  deleteSession(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.pomodoroService.deleteSession(id, userId);
  }
}
