import { IUser } from './../interfaces/user.interface';
import { IJwtPayload } from './../interfaces/jwt-payload.interface';
import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { databaseTokens } from './../database/constants/tokens';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(databaseTokens.userToken)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (err) {
      console.error(err);
    }
  }

  async createUser(user: User) {
    try {
      await this.userRepository.insert(user);
    } catch (err) {
      console.error(err);
    }
  }

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

  async getUser(username: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ username });
    } catch (err) {
      console.error(err);
    }
  }

  async invalidateUserJwt(username: string) {
    try {
      await this.userRepository.update({ username }, { jwtToken: null });
    } catch (err) {
      console.error(err);
    }
  }

  async generateJwt(user: IUser): Promise<string> {
    try {
      const payload: IJwtPayload = { id: user.id, username: user.username };
      return this.jwtService.sign({ ...payload });
    } catch (err) {
      console.error(err);
    }
  }

  async saveJwtToUser(user: User, jwt: string) {
    try {
      await this.userRepository.update(user, { jwtToken: jwt });
    } catch (err) {
      console.error(err);
    }
  }

  async getUserByJwt(jwt: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ jwtToken: jwt });
    } catch (err) {
      console.error(err);
    }
  }
}
