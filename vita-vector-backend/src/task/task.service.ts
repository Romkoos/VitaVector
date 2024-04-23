import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateTaskDto, userId: string) {
    return this.prismaService.task.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(dto: Partial<UpdateTaskDto>, taskId: string, userId: string) {
    return this.prismaService.task.update({
      where: {
        id: taskId,
        userId,
      },
      data: dto,
    });
  }

  async delete(id: string) {
    return this.prismaService.task.delete({
      where: { id },
    });
  }

  async findOne(id: string) {
    return this.prismaService.task.findUnique({ where: { id } });
  }

  async findAll() {
    return this.prismaService.task.findMany();
  }

  async findAllByUserId(userId: string) {
    return this.prismaService.task.findMany({
      where: { userId },
    });
  }

  async findAllCompletedByUserId(userId: string) {
    return this.prismaService.task.findMany({
      where: { userId, isCompleted: true },
    });
  }

  async findAllTodayByUserId(userId: string, todayStart: string) {
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

  async findAllWeekByUserId(userId: string, weekStart: string) {
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
