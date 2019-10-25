import { UserService } from './../../user/user.service';
import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private userService: UserService) {}

  @SubscribeMessage('message')
  async handleMessage(
    client: Socket,
    data: { toUser: string; message: string },
  ) {
    const sockets = await this.userService.getUserSockets(data.toUser);
    for (const socket of sockets) {
      client.broadcast.to(socket.id).emit('message', { message: data.message });
    }
  }

  handleConnection(client: Socket, ...args: any[]) {
    const socketIdJWT = { socketId: client.id, jwt: client.request._query.jwt };
    this.userService.setUserSocketId(socketIdJWT);
  }
  handleDisconnect(client: Socket) {
    this.userService.deleteUserSocket(client.id);
  }
}
