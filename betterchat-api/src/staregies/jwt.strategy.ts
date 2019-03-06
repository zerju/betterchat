import { IJwtPayload } from './../interfaces/jwt-payload.interface';
import { AuthService } from './../auth/auth.service';
import { envVariables } from './../database/constants/tokens';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envVariables.jwtSecret,
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.authService.getUser(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
