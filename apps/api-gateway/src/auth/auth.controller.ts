import { CreateUserDto } from '@nestjs-microservices/shared/dto';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Get('users/:id')
  async getUser(@Param('id', ParseIntPipe) userId: number) {
    return await this.authService.getUser(userId);
  }

  @Get('users')
  async getAllUser() {
    return await this.authService.getAllUser();
  }
}
