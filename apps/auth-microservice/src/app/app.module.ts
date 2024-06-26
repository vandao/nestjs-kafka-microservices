import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [UserRepository, AppService],
})
export class AppModule {}
