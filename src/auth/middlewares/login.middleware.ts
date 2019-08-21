import * as passport from 'passport';

import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

import { User } from '../../user/user.entity';

@Injectable()
export class LogInMiddleware implements NestMiddleware {
  public resolve() {
    return async (req, res, next) => {
      return await passport.authenticate('local', { session: false }, (err, user, info) => {
        if (typeof info !== 'undefined') {
          next(new UnauthorizedException(info.message));
        } else if (err) {
          next(err);
        } else {
          req.user = new User(user);
          next();
        }
      })(req, res, next);
    };
  }
}
