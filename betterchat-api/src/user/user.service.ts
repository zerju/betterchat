import { UserRelationship } from './../entity/user-relationship.entity';
import { IUser } from './../interfaces/user.interface';
import { Injectable, Inject } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
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
    @InjectRepository(UserRelationship)
    private readonly relationshipRepository: Repository<UserRelationship>,
  ) {}

  async updateUser(user: User): Promise<User> {
    try {
      delete user.id;
      const userToUpdate = { ...user };
      delete userToUpdate.username;
      delete userToUpdate.createdAt;
      delete userToUpdate.updatedAt;
      Object.keys(userToUpdate).forEach(
        key =>
          (userToUpdate[key] === undefined || userToUpdate[key] == null) &&
          delete userToUpdate[key],
      );
      return await this.userRepository
        .update({ username: user.username }, userToUpdate)
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
    if (user) {
      if (user.password) {
        delete user.password;
      }
      if (user.sessions) {
        for (const session of user.sessions) {
          delete session.jwt;
        }
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
        where: { jwt },
      });
      return sessions[0].user;
    } catch (err) {
      console.error(err);
    }
  }

  async searchUsers(username: string): Promise<User[]> {
    try {
      return await this.userRepository.find({
        username: Like(`%${username}%`),
      });
    } catch (err) {
      console.error(err);
    }
  }

  async getFriends(user: User) {
    try {
      const relation = await this.relationshipRepository.find({
        where: { relatingUserId: user },
        relations: ['relatedUserId'],
      });
      return relation
        .filter(rel => rel.relatedUserId.username !== user.username)
        .map(x => x.relatedUserId)
        .map(x => this.prepareUserObject(x));
    } catch (err) {
      console.log(err);
    }
  }

  async addFriend(user: User, friend: User) {
    const relationship: UserRelationship = {
      type: 'friend',
      relatedUserId: friend,
    };
    const relationship2: UserRelationship = {
      type: 'friend',
      relatedUserId: user,
    };
    const foundUser = await this.userRepository.findOne(user, {
      relations: ['relationships'],
    });
    const foundFriend = await this.userRepository.findOne(
      { username: friend.username },
      {
        relations: ['relationships'],
      },
    );
    foundUser.relationships = [...foundUser.relationships, relationship];
    foundFriend.relationships = [...foundFriend.relationships, relationship2];

    await this.userRepository
      .save(foundUser)
      .then(() => this.userRepository.save(foundFriend));
  }

  async removeFriend(user: User, friend: User) {
    try {
      await this.relationshipRepository.delete({
        relatedUserId: user,
        relatingUserId: friend,
      });
      await this.relationshipRepository.delete({
        relatedUserId: friend,
        relatingUserId: user,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
