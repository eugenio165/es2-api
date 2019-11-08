import { PostoModule } from './posto/posto.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CombustivelModule } from './combustivel/combustivel.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    PostoModule,
    CombustivelModule,
  ],
})
export class AppModule {}
