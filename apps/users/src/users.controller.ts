import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserUpdateRequest, UserCreateRequest } from './users.dto';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Post()
  @HttpCode(201)
  create(@Body() user: UserCreateRequest): Promise<UserEntity> {
    return this.userService.create(user);
  }

  @Put(':id')
  @HttpCode(204)
  async update(
    @Param('id') userId: number,
    @Body() data: UserUpdateRequest,
  ): Promise<void> {
    await this.userService.update(userId, data);
  }
}
