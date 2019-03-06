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
    return await this.userRepository.find();
  }

  async createUser(user: User) {
    await this.userRepository.insert(user);
  }

  async usernameExists(username: string): Promise<number> {
    return await this.userRepository.count({ username });
  }
  async emailExists(email: string): Promise<number> {
    return await this.userRepository.count({ email });
  }

  async getUser(username: string): Promise<User> {
    return await this.userRepository.findOne({ username });
  }

  async generateJwt(user: User): Promise<string> {
    const payload: IJwtPayload = user;
    return this.jwtService.sign({ ...payload });
  }

  async saveJwtToUser(user: User, jwt: string) {
    await this.userRepository.update(user, { jwtToken: jwt });
  }

  async getUserByJwt(jwt: string): Promise<User> {
    return await this.userRepository.findOne({ jwtToken: jwt });
  }
}
