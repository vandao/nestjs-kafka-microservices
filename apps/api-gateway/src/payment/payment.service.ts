import { MakePaymentDto } from '@nestjs-microservices/shared/dto';
import { User } from '@nestjs-microservices/shared/entities';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentService implements OnModuleInit {
  constructor(
    @Inject('PAYMENT_MICROSERVICE') private readonly paymentClient: ClientKafka
  ) {}

  makePayment(dto: MakePaymentDto) {
    return this.paymentClient.emit('process_payment', JSON.stringify(dto));
  }

  async getPayment(paymentId: number): Promise<User> {
    return await lastValueFrom(
      this.paymentClient.send('get_payment', JSON.stringify({ paymentId }))
    );
  }

  async getAllPayment(): Promise<User[]> {
    return await lastValueFrom(this.paymentClient.send('get_all_payment', {}));
  }

  async onModuleInit() {
    this.paymentClient.subscribeToResponseOf('get_payment');
    this.paymentClient.subscribeToResponseOf('get_all_payment');
    await this.paymentClient.connect();
  }
}
