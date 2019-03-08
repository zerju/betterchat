import { IUser } from './../interfaces/user.interface';
import { Injectable, Inject } from '@nestjs/common';
import { databaseTokens } from './../database/constants/tokens';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(databaseTokens.userToken)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateUser(user: IUser): Promise<IUser> {
    try {
      return this.prepareUserObject(
        await this.userRepository
          .update({ username: user.username }, this.prepareUserObject(user))
          .then(() => {
            return this.userRepository.findOne({ username: user.username });
          }),
      );
    } catch (err) {
      console.error(err);
    }
  }

  async updateUserWPw(user: IUser): Promise<IUser> {
    try {
      return this.prepareUserObject(
        await this.userRepository
          .update({ username: user.username }, user)
          .then(() => {
            return this.userRepository.findOne({ username: user.username });
          }),
      );
    } catch (err) {
      console.error(err);
    }
  }

  prepareUserObject(user: IUser): IUser {
    delete user.password;
    delete user.id;
    return user;
  }

  transformRequestUser(userData: IUser): IUser {
    const user: IUser = {
      id: userData.id,
      image: userData.image,
      username: userData.username,
      isOnline: userData.isOnline,
      email: userData.email,
    };
    return user;
  }
}
