import { UserService } from './../user/user.service';
import { LoginDto } from './dto/login.dto';
import { UserExistsDto } from './dto/user-exists.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Query,
  HttpCode,
  Headers,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  createUser(@Body() createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    bcrypt.hash(password, 10, (err, hash) => {
      const user = new User();
      user.username = username;
      user.email = email;
      user.password = hash;
      this.userService.createUser(user);
    });
  }

  @Get('/user-exists')
  async userExists(@Query() queryParams: UserExistsDto) {
    let numOfUsers;
    if (queryParams.username) {
      numOfUsers = await this.authService.usernameExists(queryParams.username);
    } else if (queryParams.email) {
      numOfUsers = await this.authService.emailExists(queryParams.email);
    }
    return { userExists: numOfUsers > 0 };
  }

  @Post('/check-password')
  async checkPassword(@Body() password: { password: string }, @Headers() head) {
    const jwt = head.authorization.split(' ')[1];
    const user = await this.userService.getUserByJwt(jwt);
    const matches =
      user && (await bcrypt.compare(password.password, user.password));
    return { correctPassword: matches };
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() login: LoginDto) {
    let user = await this.userService.getUser(login.username);
    if (user) {
      const matches = await bcrypt.compare(login.password, user.password);
      if (matches) {
        const jwt = await this.authService.generateJwt(user);
        this.authService.saveJwtToUser(user, jwt);
        user = await this.userService.getUser(login.username);
        user = this.userService.prepareUserObject(user);
        return { user, jwt };
      } else {
        throw new HttpException(
          'Wrong username or password',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException(
        'Wrong username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('/logout')
  async logout(@Headers() head) {
    const jwt = head.authorization.split(' ')[1];
    this.authService.invalidateUserJwt(jwt);
  }
}
