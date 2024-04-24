import { MakePaymentDto } from '@nestjs-microservices/shared/dto';
import { Payment, User } from '@nestjs-microservices/shared/entities';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka,
    private readonly paymentRepository: PaymentRepository
  ) {}

  async processPayment(dto: MakePaymentDto) {
    const { userId, amount } = dto;
    const user: User = await lastValueFrom(
      this.authClient.send('get_user', JSON.stringify({ userId }))
    );
    if (user) {
      this.paymentRepository.save({
        userId: userId,
        amount: amount,
        name: user.name,
        email: user.email,
      });
    }
  }

  getPayment(id: number): Payment {
    return this.paymentRepository.findOne(id);
  }

  getAllPayment(): Payment[] {
    return this.paymentRepository.findAll();
  }

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
    await this.authClient.connect();
  }
}
