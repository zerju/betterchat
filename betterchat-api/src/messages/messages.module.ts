import { Socket } from './../entity/socket.entity';
import { UserSession } from './../entity/user-session.entity';
import { User } from './../entity/user.entity';
import { UserRelationship } from './../entity/user-relationship.entity';
import { UserModule } from './../user/user.module';
import { UserService } from './../user/user.service';
import { AuthModule } from './../auth/auth.module';
import { MessagesController } from './messages.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../entity/message.entity';
import { MessagesService } from './messages.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([
      Message,
      User,
      UserSession,
      UserRelationship,
      Socket,
    ]),
  ],
  controllers: [MessagesController],
  providers: [UserService, MessagesService],
})
export class MessagesModule {}
