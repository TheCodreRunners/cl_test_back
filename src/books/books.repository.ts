import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksRepository {
  constructor(private prisma: PrismaService) {}

  async createBook(data: CreateBookDto) {
    return this.prisma.book.create({
      data,
      select: {
        id: true,
        name: true,
        author: true,
        description: true,
        cover: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findBookById(id: string) {
    return this.prisma.book.findUnique({
      where: { id, deletedAt: null },
      select: {
        id: true,
        name: true,
        author: true,
        description: true,
        cover: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAllBooks(params: { skip?: number; take?: number }) {
    const { skip = 0, take = 10 } = params;
    
    const [books, total] = await Promise.all([
      this.prisma.book.findMany({
        skip,
        take,
        where: { deletedAt: null },
        select: {
          id: true,
          name: true,
          author: true,
          description: true,
          cover: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.book.count({
        where: { deletedAt: null },
      }),
    ]);

    return {
      data: books,
      total,
      page: Math.floor(skip / take) + 1,
      limit: take,
      totalPages: Math.ceil(total / take),
    };
  }

  async updateBook(id: string, data: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        author: true,
        description: true,
        cover: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async deleteBook(id: string) {
    return this.prisma.book.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: {
        id: true,
        name: true,
        author: true,
        description: true,
        cover: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }
}
