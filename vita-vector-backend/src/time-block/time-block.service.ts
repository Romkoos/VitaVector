import { Injectable } from '@nestjs/common';
import { CreateTimeBlockDto } from './dto/create-time-block.dto';
import { PrismaService } from '../prisma.service';
import { TimeBlockDto } from './dto/time-block.dto';

@Injectable()
export class TimeBlockService {
  constructor(private prismaService: PrismaService) {}
  create(createTimeBlockDto: CreateTimeBlockDto, userId: string) {
    return this.prismaService.timeBlock.create({
      data: {
        ...createTimeBlockDto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findAll(userId: string) {
    return this.prismaService.timeBlock.findMany({
      where: { userId: userId },
      orderBy: { order: 'asc' },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} timeBlock`;
  }

  async update(tbId: string, dto: Partial<TimeBlockDto>, userId: string) {
    return this.prismaService.timeBlock.update({
      where: {
        id: tbId,
        userId,
      },
      data: dto,
    });
  }

  async delete(id: string) {
    return this.prismaService.timeBlock.delete({
      where: { id },
    });
  }

  async updateOrder(ids: string[]) {
    return this.prismaService.$transaction(
      ids.map((id, index) =>
        this.prismaService.timeBlock.update({
          where: { id },
          data: { order: index },
        }),
      ),
    );
  }
}
