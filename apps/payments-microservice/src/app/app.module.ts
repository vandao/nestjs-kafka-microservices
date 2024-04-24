import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentRepository } from './payment.repository';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:9094'],
          },
          consumer: {
            groupId: 'payment-auth-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [PaymentRepository, AppService],
})
export class AppModule {}
