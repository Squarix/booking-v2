import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';

import {UserTypes} from "../users/user.entity";

@Injectable()
export class ModeratorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user)
      throw new UnauthorizedException();

    return user.type === UserTypes.moderator;
  }
}
