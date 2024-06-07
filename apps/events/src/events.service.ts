import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  UserUpdatedEventEntity,
  UserCreatedEventEntity,
} from './events.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(UserUpdatedEventEntity)
    private readonly usersUpdatedRepository: Repository<UserUpdatedEventEntity>,
    @InjectRepository(UserCreatedEventEntity)
    private readonly usersCreatedRepository: Repository<UserCreatedEventEntity>,
  ) {}

  async userCreatedTrigger(userId: number): Promise<void> {
    const newEvent = this.usersCreatedRepository.create({ entityId: userId });
    await this.usersCreatedRepository.save(newEvent);
  }

  async updatedTrigger(
    userId: number,
    changedColumns: string[],
  ): Promise<void> {
    const newEvent = this.usersUpdatedRepository.create({
      entityId: userId,
      changedColumns: changedColumns,
    });
    await this.usersUpdatedRepository.save(newEvent);
  }
}
