import { Socket } from './../entity/socket.entity';
import { UserRelationship } from './../entity/user-relationship.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';
import { UserSession } from '../entity/user-session.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([User, UserSession, UserRelationship, Socket]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
