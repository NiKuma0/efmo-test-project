import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import {
  UserCreatedEventEntity,
  UserUpdatedEventEntity,
} from './events.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // host: 'localhost',
      // port: 5432,
      // username: 'postgres',
      // password: 'postgres',
      database: 'app.db',
      synchronize: true,
      entities: [UserCreatedEventEntity, UserUpdatedEventEntity],
    }),
    TypeOrmModule.forFeature([UserCreatedEventEntity, UserUpdatedEventEntity]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
