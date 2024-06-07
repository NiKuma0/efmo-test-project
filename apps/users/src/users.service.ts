import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UserCreateRequest, UserUpdateRequest } from './users.dto';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async create(user: UserCreateRequest): Promise<UserEntity> {
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  update(userId: number, userData: UserUpdateRequest): Promise<UpdateResult> {
    return this.usersRepository.update(userId, userData);
  }
}
