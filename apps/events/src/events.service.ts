import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdatedEventEntity, CreatedEventEntity } from './events.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(UpdatedEventEntity)
    private readonly usersUpdatedRepository: Repository<UpdatedEventEntity>,
    @InjectRepository(CreatedEventEntity)
    private readonly usersCreatedRepository: Repository<CreatedEventEntity>,
  ) {}

  async createdTrigger(userId: number): Promise<void> {
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
