import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from './../database/entities/user.entity';
import { Controller, Body, Put, HttpCode, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard())
  @Put('/update')
  async updateUser(@Body() userData: User) {
    const user = this.userService.transformRequestUser(userData);
    await this.userService.updateUser(user);
    return { user };
  }
}
