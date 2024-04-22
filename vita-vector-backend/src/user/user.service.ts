import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthDto } from '../dto/auth.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
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
    const completedTasks = await this.prismaService.task.count({});
  }

  async create(dto: AuthDto) {
    const user = {
      ...dto,
      password: await hash(dto.password),
    };
    return this.prismaService.user.create({ data: user });
  }

  async update(id: string, dto: AuthDto) {
    let data = dto;

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return this.prismaService.user.update({
      where: { id },
      data,
    });
  }
}
