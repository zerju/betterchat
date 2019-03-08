import { LogoutDto } from './dto/logout.dto';
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
import { User } from './../database/entities/user.entity';
import * as jwt_decode from 'jwt-decode';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Post('/register')
  createUser(@Body() createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    bcrypt.hash(password, 10, (err, hash) => {
      const user = new User();
      user.username = username;
      user.email = email;
      user.password = hash;
      this.authService.createUser(user);
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
    const jwt = jwt_decode(head.authorization.split(' ')[1]);
    const username = jwt.username;
    const user = await this.authService.getUser(username);
    const matches = await bcrypt.compare(password.password, user.password);
    return { correctPassword: matches };
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() login: LoginDto) {
    const user = await this.authService.getUser(login.username);
    if (user) {
      const matches = await bcrypt.compare(login.password, user.password);
      if (matches) {
        delete user.password;
        const jwt = await this.authService.generateJwt(user);
        this.authService.saveJwtToUser(user, jwt);
        user.jwtToken = jwt;
        return { user };
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
  async logout(@Body() logoutInfo: LogoutDto) {
    this.authService.invalidateUserJwt(logoutInfo.username);
  }
}
