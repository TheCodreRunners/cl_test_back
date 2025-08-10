import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id, deletedAt: null },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email, deletedAt: null },
    });
  }

  async findAllUsers(params: { skip?: number; take?: number }) {
    const { skip = 0, take = 10 } = params;
    
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take,
        where: { deletedAt: null },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({
        where: { deletedAt: null },
      }),
    ]);

    return {
      data: users,
      total,
      page: Math.floor(skip / take) + 1,
      limit: take,
      totalPages: Math.ceil(total / take),
    };
  }

  async updateUser(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }
}
