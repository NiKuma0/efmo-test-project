import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
      entities: [UserEntity],
    }),
    TypeOrmModule.forFeature([UserEntity]),
    ClientsModule.register([
      { name: 'EventsService', transport: Transport.TCP },
    ]),
  ],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
