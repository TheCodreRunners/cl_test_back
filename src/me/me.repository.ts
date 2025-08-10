import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MeRepository {
  constructor(private prisma: PrismaService) {}

  async findUserById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId, deletedAt: null },
    });
  }

  async findBookById(bookId: string) {
    return this.prisma.book.findUnique({
      where: { id: bookId, deletedAt: null },
    });
  }

  async findUserBook(userId: string, bookId: string) {
    return this.prisma.userBook.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });
  }

  async getUserBooks(userId: string) {
    const userBooks = await this.prisma.userBook.findMany({
      where: { 
        userId,
        book: {
          deletedAt: null
        }
      },
      include: {
        book: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return {
      books: userBooks.map(ub => ({
        ...ub.book,
        addedAt: ub.createdAt,
      })),
    };
  }

  async addBookToUser(userId: string, bookId: string) {
    return this.prisma.userBook.create({
      data: {
        userId,
        bookId,
      },
      include: {
        book: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async removeBookFromUser(userId: string, bookId: string) {
    return this.prisma.userBook.delete({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });
  }
}
