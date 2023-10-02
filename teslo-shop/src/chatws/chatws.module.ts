import { Module } from '@nestjs/common';
import { ChatwsService } from './chatws.service';
import { ChatwsGateway } from './chatws.gateway';

@Module({
  providers: [ChatwsGateway, ChatwsService],
})
export class ChatwsModule {}
