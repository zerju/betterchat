import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'src/entity/user.entity';
import { UserSession } from 'src/entity/user-session.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User, UserSession])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
