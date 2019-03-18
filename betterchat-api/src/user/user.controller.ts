import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import {
  Controller,
  Body,
  Put,
  UseGuards,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

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
}
