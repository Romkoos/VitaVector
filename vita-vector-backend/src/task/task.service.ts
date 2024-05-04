import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { ColumnDto } from './dto/column.dto';
import { ColumnsOrderDto } from './dto/columns-order.dto';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}

  // --------------- TASKS
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

  // --------------- COLUMNS

  async createColumnsOrder(dto: ColumnsOrderDto, userId: string) {
    return this.prismaService.columnOrder.create({
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

  async getColumnsOrder(userId: string) {
    return this.prismaService.columnOrder.findFirst({
      where: { userId },
    });
  }

  async updateColumnsOrder(dto: ColumnsOrderDto, userId: string) {
    return this.prismaService.columnOrder.update({
      where: {
        userId: userId,
      },
      data: dto,
    });
  }

  async createColumn(dto: CreateColumnDto, userId: string) {
    return this.prismaService.column.create({
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

  async deleteColumn(id: string) {
    return this.prismaService.column.delete({
      where: { id },
    });
  }

  async updateColumn(dto: ColumnDto, columnId: string, userId: string) {
    return this.prismaService.column.update({
      where: {
        id: columnId,
        userId,
      },
      data: dto,
    });
  }

  async getColumnsAndOrder(userId: string) {
    const columns = await this.prismaService.column.findMany({
      where: { userId },
    });

    const columnOrder = await this.prismaService.columnOrder.findFirst({
      where: { userId: userId },
    });

    // Маппинг колонок в формат, который вам нужен
    const columnsMap = columns.reduce((acc, column) => {
      acc[column.id] = {
        id: column.id,
        title: column.title,
        tasks: column.tasks,
      };
      return acc;
    }, {});

    return {
      columns: columnsMap,
      columnOrder: columnOrder ? columnOrder.columns : [],
    };
  }
}
