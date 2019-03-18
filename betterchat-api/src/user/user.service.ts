import { IUser } from './../interfaces/user.interface';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserSession } from 'src/entity/user-session.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserSession)
    private readonly sessionRepository: Repository<UserSession>,
  ) {}

  async updateUser(user: User): Promise<User> {
    try {
      delete user.id;
      Object.keys(user).forEach(
        key =>
          (user[key] === undefined || user[key] == null) && delete user[key],
      );
      return await this.userRepository
        .update({ username: user.username }, user)
        .then(() => {
          return this.userRepository.findOne({ username: user.username });
        });
    } catch (err) {
      console.error(err);
    }
  }

  // async updateUserWPw(user: User): Promise<User> {
  //   try {
  //     return this.prepareUserObject(
  //       await this.userRepository
  //         .update({ username: user.username }, user)
  //         .then(() => {
  //           return this.userRepository.findOne({ username: user.username });
  //         }),
  //       true,
  //     );
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  prepareUserObject(user: User, deleteId = false): User {
    delete user.password;
    if (deleteId) {
      delete user.id;
    }
    if (user.sessions) {
      for (const session of user.sessions) {
        delete session.jwt;
      }
    }
    return user;
  }

  transformRequestUser(userData: User): User {
    const user = {
      id: userData.id,
      image: userData.image,
      username: userData.username,
      isOnline: userData.isOnline,
      email: userData.email,
      password: userData.password,
    };
    return user;
  }

  async createUser(user: User) {
    try {
      await this.userRepository.insert(user);
    } catch (err) {
      console.error(err);
    }
  }
  async getUser(username: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ username });
      return user;
    } catch (err) {
      console.error(err);
    }
  }
  async getUserByJwt(jwt: string): Promise<User> {
    try {
      const sessions = await this.sessionRepository.find({
        relations: ['user'],
        jwt,
      });
      return sessions[0].user;
    } catch (err) {
      console.error(err);
    }
  }
}
