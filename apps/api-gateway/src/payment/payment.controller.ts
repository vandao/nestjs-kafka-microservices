import { MakePaymentDto } from '@nestjs-microservices/shared/dto';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('pay')
  makePayment(@Body(ValidationPipe) makePaymentDto: MakePaymentDto) {
    return this.paymentService.makePayment(makePaymentDto);
  }

  @Get(':id')
  async getPayment(@Param('id', ParseIntPipe) paymentId: number) {
    return await this.paymentService.getPayment(paymentId);
  }

  @Get('')
  async getAllPayment() {
    return await this.paymentService.getAllPayment();
  }
}
