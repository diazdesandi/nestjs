import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface Client {
  [id: string]: Socket;
}

@Injectable()
export class ChatwsService {
  private connectedClient: Client = {};

  registerClient(client: Socket) {
    this.connectedClient[client.id] = client;
  }

  removeClient(clientId: string) {
    delete this.connectedClient[clientId];
  }

  getConnectedClients(): string[] {
    return Object.keys(this.connectedClient);
  }
}
