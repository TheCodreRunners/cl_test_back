import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUsersRepository = {
    createUser: jest.fn(),
    findUserById: jest.fn(),
    findByEmail: jest.fn(),
    findAllUsers: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user with hashed password', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'plainPassword',
        name: 'Test User',
      };

      const hashedPassword = '$2b$10$hashedPassword';
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);
      mockUsersRepository.findByEmail.mockResolvedValue(null);
      mockUsersRepository.createUser.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual(mockUser);
      expect(bcrypt.hash).toHaveBeenCalledWith('plainPassword', 12);
      expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(mockUsersRepository.createUser).toHaveBeenCalledWith({
        ...createUserDto,
        password: hashedPassword,
      });
    });

    it('should throw ConflictException if email already exists', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'plainPassword',
        name: 'Test User',
      };
      
      mockUsersRepository.findByEmail.mockResolvedValue(mockUser);

      await expect(service.create(createUserDto)).rejects.toThrow();
      expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    });
  });

  describe('findByEmail', () => {
    it('should return user by email', async () => {
      mockUsersRepository.findByEmail.mockResolvedValue(mockUser);

      const result = await service.findByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    });

    it('should return null if user not found', async () => {
      mockUsersRepository.findByEmail.mockResolvedValue(null);

      const result = await service.findByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });
  });

  describe('findById', () => {
    it('should return user by id', async () => {
      mockUsersRepository.findUserById.mockResolvedValue(mockUser);

      const result = await service.findById('1');

      expect(result).toEqual(mockUser);
      expect(mockUsersRepository.findUserById).toHaveBeenCalledWith('1');
    });
  });

  describe('findAll', () => {
    it('should return paginated users', async () => {
      const mockPaginatedResult = {
        data: [mockUser],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      };
      mockUsersRepository.findAllUsers.mockResolvedValue(mockPaginatedResult);

      const result = await service.findAll(1, 10);

      expect(result).toEqual(mockPaginatedResult);
      expect(mockUsersRepository.findAllUsers).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
    });
  });
});
