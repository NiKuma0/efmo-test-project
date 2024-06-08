import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { CreatedEventData, UpdatedEventData } from './events.dto';
import { EventsService } from './events.service';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @EventPattern('userCreated')
  createdTrigger(data: CreatedEventData): Promise<void> {
    return this.eventsService.createdTrigger(data.entityId);
  }

  @EventPattern('userUpdated')
  updatedTrigger(data: UpdatedEventData): Promise<void> {
    return this.eventsService.updatedTrigger(
      data.entityId,
      data.changedColumns,
    );
  }
}
