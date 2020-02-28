import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import {
  Controller,
  Body,
  Put,
  UseGuards,
  HttpStatus,
  HttpException,
  Post,
  UseInterceptors,
  UploadedFile,
  Headers,
  Get,
  Param,
  Res,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { envVariables } from '../env-variables';
import { decode } from 'jsonwebtoken';
import { Guid } from 'guid-typescript';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard())
  @Put('/update')
  async updateUser(@Body() userData: UserDto) {
    let user = this.userService.transformRequestUser(userData);
    if (userData.password !== undefined && userData.password != null) {
      if (userData.password.length > 2) {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
      } else {
        throw new HttpException(
          'Password has to be longer than 2 chars',
          HttpStatus.LENGTH_REQUIRED,
        );
      }
    }
    user = await this.userService.updateUser(user);
    user = this.userService.prepareUserObject(user);
    return { user };
  }

  @UseGuards(AuthGuard())
  @Post('/avatar')
  @UseInterceptors(
    FileInterceptor('image', {
      // Enable file size limits
      limits: {
        fileSize: +process.env.MAX_FILE_SIZE,
      },
      // Check the mimetypes to allow for upload
      fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          return cb(
            new HttpException(
              `Unsupported file type ${file.originalname.split('.').pop()}`,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
      },
      storage: diskStorage({
        // Specify where to save the file
        destination: (req, file, cb) => {
          cb(null, envVariables.uploadsFolder);
        },
        // Specify the file name
        filename: (req, file, cb) => {
          const name = file.originalname;
          const lastDot = name.lastIndexOf('.');
          const ext = name.substring(lastDot);
          const imageName = `${Guid.create()}${ext}`;
          cb(null, imageName);
        },
      }),
    }),
  )
  async uploadAvatar(@UploadedFile() image, @Headers() head) {
    const jwt = head.authorization.split(' ')[1];
    const user = await this.userService.getUserByJwt(jwt);
    const previousImage = { ...user }.image;
    user.image = image.filename;
    const updatedUser = await this.userService.updateUser(user);
    if (previousImage) {
      fs.unlink(`${envVariables.uploadsFolder}/${previousImage}`, err => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }
    return { user: this.userService.prepareUserObject(updatedUser), jwt };
  }

  @Get('/avatar/:imgId')
  async getAvatar(@Param('imgId') imgId, @Res() res) {
    const imgPath = `${envVariables.uploadsFolder}/${imgId}`;
    return res.sendFile(imgPath, { root: 'public' });
  }

  @UseGuards(AuthGuard())
  @Get('/search/:username')
  async getUsers(@Param('username') username, @Headers() head) {
    const jwt = head.authorization.split(' ')[1];
    const jwtUsername = (decode(jwt) as any).username;
    let users = await this.userService.searchUsers(username);
    users = users
      .map(user => this.userService.prepareUserObject(user))
      .filter(user => user.username !== jwtUsername);
    return users;
  }

  @UseGuards(AuthGuard())
  @Post('/add-friend')
  async addFriend(@Body() friend, @Headers() head) {
    const jwt = head.authorization.split(' ')[1];
    const user = await this.userService.getUserByJwt(jwt);
    const friends: any = await this.userService.getFriends(user);
    const found = friends.some(el => el.username === friend.username);
    if (!found) {
      await this.userService.addFriend(user, friend);
    } else {
      throw new HttpException(
        'This person is already your friend',
        HttpStatus.CONFLICT,
      );
    }
  }

  @UseGuards(AuthGuard())
  @Get('/friends')
  async getFriends(@Headers() head) {
    const jwt = head.authorization.split(' ')[1];
    const foundU = await this.userService.getUserByJwt(jwt);
    const friends: any = await this.userService.getFriends(foundU);
    friends.map(friend => (friend.isFriend = true));
    return friends;
  }

  @UseGuards(AuthGuard())
  @Delete('/friends/:username')
  async removeFriend(@Param('username') username, @Headers() head) {
    const friend = await this.userService.getUser(username);
    const jwt = head.authorization.split(' ')[1];
    const foundU = await this.userService.getUserByJwt(jwt);
    await this.userService.removeFriend(foundU, friend);
  }
}
