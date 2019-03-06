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
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './../database/entities/user.entity';

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
      try {
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = hash;
        this.authService.createUser(user);
      } catch (err) {
        console.error(err);
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    });
  }

  @Get('/user-exists')
  async userExists(@Query() queryParams: UserExistsDto) {
    try {
      let numOfUsers;
      if (queryParams.username) {
        numOfUsers = await this.authService.usernameExists(
          queryParams.username,
        );
      } else if (queryParams.email) {
        numOfUsers = await this.authService.emailExists(queryParams.email);
      }
      return { userExists: numOfUsers > 0 };
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
        return { jwt };
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
}
