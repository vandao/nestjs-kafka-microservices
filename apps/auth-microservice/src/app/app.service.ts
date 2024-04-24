import { CreateUserDto } from '@nestjs-microservices/shared/dto';
import { User } from '@nestjs-microservices/shared/entities';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class AppService {
  constructor(private readonly userRepository: UserRepository) {}

  createUser(dto: CreateUserDto): void {
    this.userRepository.save(dto);
  }

  getUser(id: number): User {
    return this.userRepository.findOne(id);
  }

  getAllUser(): User[] {
    return this.userRepository.findAll();
  }
}
