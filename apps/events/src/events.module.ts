import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { CreatedEventEntity, UpdatedEventEntity } from './events.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'app',
      synchronize: true,
      entities: [CreatedEventEntity, UpdatedEventEntity],
    }),
    TypeOrmModule.forFeature([CreatedEventEntity, UpdatedEventEntity]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
