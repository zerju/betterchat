import { IUserSession } from './../../interfaces/user-session.interface';
import { IsEmail, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly id: string;

  readonly image: string;

  @IsBoolean()
  readonly isOnline: boolean;

  readonly password?: string;

  readonly sessions?: IUserSession[];
}
