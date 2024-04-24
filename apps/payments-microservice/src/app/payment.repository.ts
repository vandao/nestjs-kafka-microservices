import { Payment } from '@nestjs-microservices/shared/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentRepository {
  private readonly payments: Payment[] = [];

  save(payment: Payment) {
    this.payments.push({ ...payment, id: this.payments.length + 1 });
  }

  findOne(id: number) {
    return this.payments.find((user) => user.id == id) || null;
  }

  findAll() {
    return this.payments;
  }
}
