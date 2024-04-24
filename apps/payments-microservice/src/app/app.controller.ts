import { Controller, ParseIntPipe, ValidationPipe } from '@nestjs/common';

import { MakePaymentDto } from '@nestjs-microservices/shared/dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('process_payment')
  handleProcessPayment(@Payload(ValidationPipe) dto: MakePaymentDto) {
    return this.appService.processPayment(dto);
  }

  @MessagePattern('get_payment')
  handleGetPayment(@Payload('paymentId', ParseIntPipe) paymentId: number) {
    return this.appService.getPayment(paymentId);
  }

  @MessagePattern('get_all_payment')
  handleGetAllPayment() {
    return this.appService.getAllPayment();
  }
}
