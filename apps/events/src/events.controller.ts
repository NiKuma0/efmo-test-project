import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { UserCreatedEventData, UserUpdatedEventData } from './events.dto';
import { EventsService } from './events.service';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @EventPattern('userCreated')
  userCreatedTrigger(data: UserCreatedEventData): Promise<void> {
    return this.eventsService.userCreatedTrigger(data.entityId);
  }

  @EventPattern('userUpdated')
  userUpdatedTrigger(data: UserUpdatedEventData): Promise<void> {
    return this.eventsService.updatedTrigger(
      data.entityId,
      data.changedColumns,
    );
  }
}
