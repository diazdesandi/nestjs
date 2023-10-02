import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { ChatwsService } from './chatws.service';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: '/' })
export class ChatwsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatwsService: ChatwsService) {}

  handleConnection(client: Socket) {
    console.log('Cliente conectado' + client.id);
  }
  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado' + client.id);
  }
}
