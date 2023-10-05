import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatwsService } from './chatws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos';

@WebSocketGateway({ cors: true, namespace: '/' })
export class ChatwsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  constructor(private readonly chatwsService: ChatwsService) {}

  handleConnection(client: Socket) {
    this.chatwsService.registerClient(client);
    this.wss.emit('clients-updated', this.chatwsService.getConnectedClients());
  }
  handleDisconnect(client: Socket) {
    this.chatwsService.removeClient(client.id);
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    // Emite unicamente al cliente.
    /*
    client.emit('message-from-server', {
      fullName: 'aaaa',
      message: payload.message || 'No message!',
    });
    */
    // Emitir a todos menos al cliente inicial
    /*
    client.broadcast.emit('message-from-server', {
      fullName: 'aaaa',
      message: payload.message || 'No message!',
    });
    */
    // Emite a todos.
    this.wss.emit('message-from-server', {
      fullName: 'asadsd',
      message: payload.message,
    });
  }
}
