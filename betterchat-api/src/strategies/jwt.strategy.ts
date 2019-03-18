import { UserService } from './../user/user.service';
import { IJwtPayload } from './../interfaces/jwt-payload.interface';
import { envVariables } from '../env-variables';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envVariables.jwtSecret,
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.userService.getUser(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
