import { CreateUserDto } from '@nestjs-microservices/shared/dto';
import { User } from '@nestjs-microservices/shared/entities';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
  ) {}

  createUser(createUserDto: CreateUserDto) {
    return this.authClient.emit('create_user', JSON.stringify(createUserDto));
  }

  async getUser(userId: number): Promise<User> {
    return await lastValueFrom(
      this.authClient.send('get_user', JSON.stringify({ userId }))
    );
  }

  async getAllUser(): Promise<User[]> {
    return await lastValueFrom(this.authClient.send('get_all_user', {}));
  }

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
    this.authClient.subscribeToResponseOf('get_all_user');
    await this.authClient.connect();
  }
}
