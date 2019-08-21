import { UserModule } from './../user/user.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';

@Module({
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  imports: [UserModule],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LogInMiddleware).forRoutes('/auth/login');
  }
}
