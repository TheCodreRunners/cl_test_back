import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { MeRepository } from './me.repository';

@Injectable()
export class MeService {
  constructor(private readonly meRepository: MeRepository) {}

  async getUserBooks(userId: string) {
    return await this.meRepository.getUserBooks(userId);
  }

  async addBookToUser(userId: string, bookId: string) {
    const user = await this.meRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException({
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found',
        },
      });
    }

    const book = await this.meRepository.findBookById(bookId);
    if (!book) {
      throw new NotFoundException({
        error: {
          code: 'BOOK_NOT_FOUND',
          message: 'Book not found',
        },
      });
    }

    const existingUserBook = await this.meRepository.findUserBook(userId, bookId);
    if (existingUserBook) {
      throw new ConflictException({
        error: {
          code: 'BOOK_ALREADY_ADDED',
          message: 'Book already added to user list',
        },
      });
    }

    return await this.meRepository.addBookToUser(userId, bookId);
  }

  async removeBookFromUser(userId: string, bookId: string) {
    const userBook = await this.meRepository.findUserBook(userId, bookId);
    if (!userBook) {
      throw new NotFoundException({
        error: {
          code: 'USER_BOOK_NOT_FOUND',
          message: 'Book not found in user list',
        },
      });
    }

    return await this.meRepository.removeBookFromUser(userId, bookId);
  }
}
