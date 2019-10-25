import { Socket } from './../entity/socket.entity';
import { UserRelationship } from './../entity/user-relationship.entity';
import { UserService } from './../user/user.service';
import { envVariables } from '../env-variables';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './../strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSession } from '../entity/user-session.entity';
import { User } from '../entity/user.entity';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserSession, UserRelationship, Socket]),
    passportModule,
    JwtModule.register({
      privateKey: envVariables.jwtSecret,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService],
  exports: [AuthService, passportModule],
})
export class AuthModule {}
