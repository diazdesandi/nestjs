import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Socket } from 'socket.io';
import { User } from '../auth/entities';
import { InjectRepository } from '@nestjs/typeorm';

interface Client {
  [id: string]: {
    socket: Socket;
    user: User;
  };
}

@Injectable()
export class ChatwsService {
  private connectedClient: Client = {};

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerClient(client: Socket, id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new Error('User not found!');
    if (!user.isActive) throw new Error('User not active!');

    this.checkUserConnection(user);

    this.connectedClient[client.id] = {
      socket: client,
      user,
    };
  }

  removeClient(clientId: string) {
    delete this.connectedClient[clientId];
  }

  getConnectedClients(): string[] {
    return Object.keys(this.connectedClient);
  }

  getUserName(sockedId: string) {
    return this.connectedClient[sockedId].user.fullName;
  }

  private checkUserConnection(user: User) {
    for (const id of Object.keys(this.connectedClient)) {
      const connectedClient = this.connectedClient[id];

      if (connectedClient.user.id === user.id) {
        connectedClient.socket.disconnect();
        break;
      }
    }
  }
}