import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ObjectID } from 'typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller(`user`)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  @Header(`cache-control`, `none`)
  async create(@Body() user: User): Promise<User> {
    return await this.userService.create(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(`:id`)
  findOne(@Param(`id`) id: ObjectID): Promise<User> {
    return this.userService.findById(id);
  }

  @Put(`:id`)
  @HttpCode(204)
  async update(@Param(`id`) id: ObjectID, @Body() user: User): Promise<void> {
    await this.userService.update(id, user);
  }

  @Delete(`:id`)
  @HttpCode(204)
  async remove(@Param(`id`) id: ObjectID): Promise<void> {
    await this.userService.delete(id);
  }
}
