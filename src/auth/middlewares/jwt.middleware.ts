import * as passport from 'passport';

import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

import { User } from '../../user/user.entity';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    return await passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        throw new UnauthorizedException(err);
      } else if (typeof info !== 'undefined') {
        let message;
        switch (info.message) {
          case 'No auth token':
          case 'invalid signature':
          case 'jwt malformed':
            message = 'You must provide a valid authenticated access token';
            break;
          case 'jwt expired':
            message = 'Your session has expired. Please log in again';
            break;
        }
        throw new UnauthorizedException(message);
      } else {
        req.user = new User(user);
        next();
      }
    })(req, res, next);
  }
}
