import { IUserSession } from './../interfaces/user-session.interface';
import { IJwtPayload } from './../interfaces/jwt-payload.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserSession } from '../entity/user-session.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(UserSession)
    private readonly sessionRepository: Repository<UserSession>,
  ) {}

  async usernameExists(username: string): Promise<number> {
    try {
      return await this.userRepository.count({ username });
    } catch (err) {
      console.error(err);
    }
  }
  async emailExists(email: string): Promise<number> {
    try {
      return await this.userRepository.count({ email });
    } catch (err) {
      console.error(err);
    }
  }

  async invalidateUserJwt(jwt: string) {
    try {
      await this.sessionRepository.delete({ jwt });
    } catch (err) {
      console.error(err);
    }
  }

  async generateJwt(user: User): Promise<string> {
    try {
      const payload: IJwtPayload = { id: user.id, username: user.username };
      return this.jwtService.sign({ ...payload });
    } catch (err) {
      console.error(err);
    }
  }

  async saveJwtToUser(user: User, jwt: string) {
    try {
      const session: IUserSession = {
        jwt,
        lastActivity: Date.now(),
      };
      const foundUser = await this.userRepository.findOne(user, {
        relations: ['sessions'],
      });
      foundUser.sessions = [...foundUser.sessions, session];
      await this.userRepository.save(foundUser);
    } catch (err) {
      console.error(err);
    }
  }
}
