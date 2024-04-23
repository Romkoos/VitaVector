import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PomodoroSessionDto } from './dto/pomodoro-session.dto';
import { UserService } from '../user/user.service';
import { PomodoroRoundDto } from './dto/pomodoro-round.dto';

@Injectable()
export class PomodoroService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  async getTodaySession(userId: string) {
    const today = new Date().toISOString().split('T')[0];
    return this.prismaService.pomodoroSession.findFirst({
      where: {
        createdAt: {
          gte: new Date(today),
        },
        userId,
      },
      include: {
        rounds: {
          orderBy: {
            id: 'asc',
          },
        },
      },
    });
  }

  async createSession(userId: string) {
    const todaySession = await this.getTodaySession(userId);

    if (todaySession) return todaySession;

    const user = await this.userService.getUserWithIntervalsById(userId);

    if (!user) throw new NotFoundException('User not found');

    return this.prismaService.pomodoroSession.create({
      data: {
        rounds: {
          createMany: {
            data: Array.from({ length: user.intervalCount }, () => ({
              totalSeconds: 0,
            })),
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        rounds: true,
      },
    });
  }

  async updateSession(
    dto: Partial<PomodoroSessionDto>,
    pomodoroSessionId: string,
    userId: string,
  ) {
    return this.prismaService.pomodoroSession.update({
      where: {
        id: pomodoroSessionId,
        userId,
      },
      data: dto,
    });
  }

  async updateRound(dto: Partial<PomodoroRoundDto>, pomodoroRoundId: string) {
    return this.prismaService.pomodoroRaund.update({
      where: {
        id: pomodoroRoundId,
      },
      data: dto,
    });
  }

  async deleteSession(id: string, userId: string) {
    return this.prismaService.pomodoroSession.delete({
      where: { id, userId },
    });
  }
}
