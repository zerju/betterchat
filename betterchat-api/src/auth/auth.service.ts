import { Injectable, Inject } from '@nestjs/common';
import { databaseTokens } from './../database/constants/tokens';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(databaseTokens.userToken)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async createUser(user: User) {
    await this.userRepository.insert(user);
  }
}
