import { UserService } from './../user/user.service';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private userService: UserService) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const token = context
      .switchToHttp()
      .getRequest()
      .headers.Authorization.split(' ')[1];
    const user = await this.userService.getUserByJwt(token);
    return !!user;
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
