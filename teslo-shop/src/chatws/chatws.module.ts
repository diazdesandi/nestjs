import { Module } from '@nestjs/common';
import { ChatwsService } from './chatws.service';
import { ChatwsGateway } from './chatws.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [ChatwsGateway, ChatwsService],
  imports: [AuthModule],
})
export class ChatwsModule {}
