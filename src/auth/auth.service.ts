import { CreateUserDto } from './../user/dto/create-user.dto';
import { AuthLoginCmd } from './cmd/auth-login.command';
import * as jwt from 'jsonwebtoken';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { ChangePasswordCmd } from 'user/cmd/change-password.cmd';
import { TokenDto } from './dto/token.dto';
import { TokenUserPayload } from './dto/token-user-payload.dto';
import { UserService } from '../user/user.service';
import { environment } from '../../environment/environment.dev';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async signUp(user: CreateUserDto) {
    const createduser = await this.userService.create(user);
    return this.createToken(createduser);
  }

  public async changePassword(cmd: ChangePasswordCmd): Promise<User> {
    let oldUser;
    try {
      oldUser = await this.userService.findOne({ email: cmd.email });
    } catch (error) {
      throw new NotFoundException(`No user was found for email: ${cmd.email}.`);
    }
    return this.userService.update(
      oldUser.id,
      new User({ ...oldUser, password: cmd.oldPassword }),
      cmd.newPassword,
    );
  }

  public async login(loginInfo: AuthLoginCmd) {
    const user = await this.userService.findOne({ email: loginInfo.email });
    try {
      await this.userService.testMatchingPasswords(user, loginInfo.password);
    } catch (e) {
      throw e;
    }
    return await this.createToken(user);
  }

  public async createToken(signedUser: User) {
    const expiresIn = environment.JWT_EXPIRATION;
    const secretOrKey = environment.SECRET_KEY;
    const user = new TokenUserPayload(signedUser);
    const userPOJO = JSON.parse(JSON.stringify(user));
    const accessToken = jwt.sign(userPOJO, secretOrKey, { expiresIn });
    return new TokenDto({
      expiresIn,
      accessToken,
    });
  }
}
