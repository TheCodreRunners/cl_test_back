import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  async create(createBookDto: CreateBookDto) {
    return await this.booksRepository.createBook(createBookDto);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return await this.booksRepository.findAllBooks({ skip, take: limit });
  }

  async findOne(id: string) {
    const book = await this.booksRepository.findBookById(id);
    
    if (!book) {
      throw new NotFoundException({
        error: {
          code: 'BOOK_NOT_FOUND',
          message: 'Book not found',
        },
      });
    }
    
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.booksRepository.findBookById(id);
    
    if (!book) {
      throw new NotFoundException({
        error: {
          code: 'BOOK_NOT_FOUND',
          message: 'Book not found',
        },
      });
    }

    return await this.booksRepository.updateBook(id, updateBookDto);
  }

  async remove(id: string) {
    const book = await this.booksRepository.findBookById(id);
    
    if (!book) {
      throw new NotFoundException({
        error: {
          code: 'BOOK_NOT_FOUND',
          message: 'Book not found',
        },
      });
    }
    
    return await this.booksRepository.deleteBook(id);
  }
}
