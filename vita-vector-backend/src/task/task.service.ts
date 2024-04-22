import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}
  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }

  findAllCompletedByUserId(userId: string) {
    return this.prismaService.task.findMany({
      where: { userId, isCompleted: true },
    });
  }

  findAllTodayByUserId(userId: string, todayStart: string) {
    return this.prismaService.task.findMany({
      where: {
        userId,
        isCompleted: false,
        createdAt: {
          gte: todayStart,
        },
      },
    });
  }

  findAllWeekByUserId(userId: string, weekStart: string) {
    return this.prismaService.task.findMany({
      where: {
        userId,
        isCompleted: false,
        createdAt: {
          gte: weekStart,
        },
      },
    });
  }
}
