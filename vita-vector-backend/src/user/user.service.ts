import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthDto } from '../dto/auth.dto';
import { hash } from 'argon2';
import { TaskService } from '../task/task.service';
import { startOfDay, subDays } from 'date-fns';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private taskService: TaskService,
  ) {}

  async getUserWithIntervalsById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      select: {
        intervalCount: true,
      },
    });
  }

  async getById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
      include: { tasks: true },
    });
  }

  async getByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async getProfile(id: string) {
    const profile = await this.getById(id);
    const totalTasks = profile.tasks.length;
    const completedTasks = await this.taskService.findAllCompletedByUserId(id);

    const todayStart = startOfDay(new Date());
    const weekStart = startOfDay(subDays(new Date(), 7));

    const todayTasks = await this.taskService.findAllTodayByUserId(
      id,
      todayStart.toISOString(),
    );

    const weekTasks = await this.taskService.findAllWeekByUserId(
      id,
      weekStart.toISOString(),
    );

    const { password, ...userProfile } = profile;

    return {
      user: userProfile,
      statistics: [
        { label: 'Total Tasks', value: totalTasks },
        { label: 'Completed Tasks', value: completedTasks.length },
        { label: 'Tasks Today', value: todayTasks.length },
        { label: 'Tasks This Week', value: weekTasks.length },
      ],
    };
  }

  async create(dto: AuthDto) {
    const user = {
      ...dto,
      password: await hash(dto.password),
    };
    return this.prismaService.user.create({ data: user });
  }

  async update(id: string, dto: UserDto) {
    let data = dto;

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return this.prismaService.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true },
    });
  }
}
