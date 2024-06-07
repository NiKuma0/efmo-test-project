import { Body, Controller, Post } from '@nestjs/common';

import { UserCreatedRequest, UserUpdatedRequest } from './events.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('userCreated')
  userCreatedTrigger(@Body() event: UserCreatedRequest): Promise<void> {
    return this.eventsService.userCreatedTrigger(event.entityId);
  }

  @Post('userUpdated')
  userUpdatedTrigger(@Body() event: UserUpdatedRequest): Promise<void> {
    return this.eventsService.updatedTrigger(
      event.entityId,
      event.changedColumns,
    );
  }
}
