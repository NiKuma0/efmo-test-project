import { Repository, UpdateResult } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';

import { UserCreateRequest, UserUpdateRequest } from './users.dto';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @Inject('EventsService')
    private readonly client: ClientProxy,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async create(user: UserCreateRequest): Promise<UserEntity> {
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    this.client.emit('userCreated', { entityId: newUser.id });

    return newUser;
  }

  update(userId: number, userData: UserUpdateRequest): Promise<UpdateResult> {
    this.client.emit('userUpdated', {
      entityId: userId,
      changedColumns: Object.getOwnPropertyNames(userData),
    });

    return this.usersRepository.update(userId, userData);
  }
}
