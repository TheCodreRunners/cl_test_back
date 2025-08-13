
import { JwtService } from '@nestjs/jwt';
import { TestingModule, Test } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUser = {
    id: "1",
    email: 'test@example.com',
    password: '$2b$10$hashedPassword',
    name: 'Test User',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user and return auth response', async () => {
      const createUserDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
      };
      const mockToken = 'mock.jwt.token';
      
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue(mockToken);

      const result = await service.register(createUserDto);

      expect(result).toEqual({
        user: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          createdAt: mockUser.createdAt,
          updatedAt: mockUser.updatedAt,
        },
        token: mockToken,
      });
      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(createUserDto.email);
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw ConflictException when email already exists', async () => {
      const createUserDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
      };
      
      mockUsersService.findByEmail.mockResolvedValue(mockUser);

      await expect(service.register(createUserDto)).rejects.toThrow();
    });
  });

  describe('validateUser', () => {
    it('should return user data when user exists', async () => {
      mockUsersService.findById = jest.fn().mockResolvedValue(mockUser);

      const result = await service.validateUser('1');

      expect(result).toEqual(mockUser);
      expect(mockUsersService.findById).toHaveBeenCalledWith('1');
    });

    it('should return null when user does not exist', async () => {
      mockUsersService.findById = jest.fn().mockResolvedValue(null);

      const result = await service.validateUser('999');

      expect(result).toBeNull();
      expect(mockUsersService.findById).toHaveBeenCalledWith('999');
    });
  });

  describe('login', () => {
    it('should return auth response with token', async () => {
      const mockUserWithPassword = { ...mockUser, password: '$2b$10$hashedPassword' };
      const mockToken = 'mock.jwt.token';
      const loginRequest = { email: 'test@example.com', password: 'password' };
      
      mockUsersService.findByEmail.mockResolvedValue(mockUserWithPassword);
      jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue(mockToken);

      const result = await service.login(loginRequest);

      expect(result).toEqual({
        user: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          createdAt: mockUser.createdAt,
          updatedAt: mockUser.updatedAt,
        },
        token: mockToken,
      });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email: mockUser.email,
        sub: mockUser.id,
      });
    });

    it('should throw UnauthorizedException when user not found', async () => {
      const loginRequest = { email: 'test@example.com', password: 'password' };
      
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(service.login(loginRequest)).rejects.toThrow();
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      const mockUserWithPassword = { ...mockUser, password: '$2b$10$hashedPassword' };
      const loginRequest = { email: 'test@example.com', password: 'wrongpassword' };
      
      mockUsersService.findByEmail.mockResolvedValue(mockUserWithPassword);
      jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(false);

      await expect(service.login(loginRequest)).rejects.toThrow();
    });
  });
});
