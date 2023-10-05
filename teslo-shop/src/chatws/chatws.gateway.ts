import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { ChatwsService } from './chatws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos';
import { JwtPayload } from '../auth/interfaces';

@WebSocketGateway({ cors: true, namespace: '/' })
export class ChatwsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  constructor(
    private readonly chatwsService: ChatwsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    console.log(token);
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(token);
      await this.chatwsService.registerClient(client, payload.id);
    } catch (error) {
      client.disconnect();
      return;
    }
    console.log(payload);
    this.wss.emit('clients-updated', this.chatwsService.getConnectedClients());
  }
  handleDisconnect(client: Socket) {
    this.chatwsService.removeClient(client.id);
    this.wss.emit('clients-updated', this.chatwsService.getConnectedClients());
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
      fullName: this.chatwsService.getUserName(client.id),
      message: payload.message,
    });
  }
}
