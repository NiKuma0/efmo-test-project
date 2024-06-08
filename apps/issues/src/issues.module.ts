import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';
import { UserIssuesEntity } from './issues.entity';

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
      entities: [UserIssuesEntity],
    }),
    TypeOrmModule.forFeature([UserIssuesEntity]),
  ],
  controllers: [IssuesController],
  providers: [IssuesService],
})
export class IssuesModule {}
