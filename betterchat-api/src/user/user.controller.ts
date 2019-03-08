import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Controller, Body, Put, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard())
  @Put('/update')
  async updateUser(@Body() userData: UserDto) {
    let user;
    if (userData.password) {
      const hash = await bcrypt.hash(userData.password, 10);
      user = {
        username: userData.username,
        email: userData.email,
        password: hash,
      };
      user = await this.userService.updateUserWPw(user);
    } else {
      user = this.userService.transformRequestUser(userData);
      user = await this.userService.updateUser(user);
    }
    return { user };
  }
}
