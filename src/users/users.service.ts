import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findByEmail(createUserDto.email);
    
    if (existingUser) {
      throw new ConflictException({
        error: {
          code: 'EMAIL_ALREADY_EXISTS',
          message: 'Email already exists',
        },
      });
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    
    return await this.usersRepository.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return await this.usersRepository.findAllUsers({ skip, take: limit });
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findUserById(id);
    
    if (!user) {
      throw new NotFoundException({
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found',
        },
      });
    }
    
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findUserById(id);
    
    if (!user) {
      throw new NotFoundException({
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found',
        },
      });
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.usersRepository.findByEmail(updateUserDto.email);
      if (existingUser) {
        throw new ConflictException({
          error: {
            code: 'EMAIL_ALREADY_EXISTS',
            message: 'Email already exists',
          },
        });
      }
    }

    const updateData = { ...updateUserDto };
    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 12);
    }

    return await this.usersRepository.updateUser(id, updateData);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findUserById(id);
    
    if (!user) {
      throw new NotFoundException({
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found',
        },
      });
    }
    
    return await this.usersRepository.deleteUser(id);
  }
}
