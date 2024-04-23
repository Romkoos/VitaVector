import { Module } from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { PomodoroController } from './pomodoro.controller';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';
import { TaskService } from '../task/task.service';

@Module({
  controllers: [PomodoroController],
  providers: [PomodoroService, PrismaService, UserService, TaskService],
})
export class PomodoroModule {}
