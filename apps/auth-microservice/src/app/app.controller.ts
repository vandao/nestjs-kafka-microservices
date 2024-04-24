import { Controller, ParseIntPipe, ValidationPipe } from '@nestjs/common';

import { CreateUserDto } from '@nestjs-microservices/shared/dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('create_user')
  handleUserCreate(@Payload(ValidationPipe) dto: CreateUserDto) {
    return this.appService.createUser(dto);
  }

  @MessagePattern('get_user')
  handleGetUser(@Payload('userId', ParseIntPipe) userId: number) {
    return this.appService.getUser(userId);
  }

  @MessagePattern('get_all_user')
  handleGetAllUser() {
    return this.appService.getAllUser();
  }
}
