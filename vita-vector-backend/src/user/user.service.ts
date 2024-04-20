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
        include: { Tasks: true }
      });
    }

    async getByEmail(email: string) {
      return this.prismaService.user.findUnique({
        where: { email }
      });
    }

    async create(dto: AuthDto) {
    const user = {
      ...dto,
      password: await hash(dto.password),
    }
    return this.prismaService.user.create({ data: user });
    }

}
