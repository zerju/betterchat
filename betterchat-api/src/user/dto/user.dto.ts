import { IsEmail, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsNumber()
  readonly id: number;

  readonly image: string;

  @IsBoolean()
  readonly isOnline: boolean;

  readonly password?: string;
}
