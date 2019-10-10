import { MessagesService } from './messages.service';
import { User } from './../entity/user.entity';
import { UserService } from './../user/user.service';
import {
  Controller,
  UseGuards,
  Get,
  Headers,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('messages')
export class MessagesController {
  constructor(
    private userService: UserService,
    private messageService: MessagesService,
  ) {}

  @UseGuards(AuthGuard())
  @Get('/:userId')
  async getMessages(@Headers() head, @Param('userId') userId) {
    const jwt = head.authorization.split(' ')[1];
    const user1 = await this.userService.getUserByJwt(jwt);
    const friends: User[] = await this.userService.getFriends(user1);
    const user2 = friends.filter(friend => friend.id === userId);
    if (user2.length === 0) {
      throw new HttpException(
        'The conversation does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    const messages = this.messageService.getMessages(user1, user2[0]);
    return messages;
  }

  /**
   * @todo Add functions for delete, update, insert messages using sockets
   */
}
