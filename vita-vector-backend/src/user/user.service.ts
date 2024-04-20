import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

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

}
