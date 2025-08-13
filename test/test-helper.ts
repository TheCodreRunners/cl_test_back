import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';

export class TestHelper {
  static async createTestModule(providers: any[] = []): Promise<TestingModule> {
    return Test.createTestingModule({
      providers: [
        PrismaService,
        ...providers,
      ],
    }).compile();
  }

  static mockPrismaService() {
    return {
      user: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      book: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      userBook: {
        create: jest.fn(),
        findMany: jest.fn(),
        delete: jest.fn(),
      },
      $transaction: jest.fn(),
    };
  }

  static mockUser() {
    return {
      id: 1,
      email: 'test@example.com',
      password: '$2b$10$hashedPassword',
      name: 'Test User',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static mockBook() {
    return {
      id: 1,
      title: 'Test Book',
      author: 'Test Author',
      description: 'Test Description',
      imageUrl: 'http://example.com/image.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
