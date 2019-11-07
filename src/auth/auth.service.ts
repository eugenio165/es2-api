import { GoogleLoginDTO } from './dto/google-login.dto';
import { FacebookLoginDTO } from './dto/facebook-login.dto';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { AuthLoginCmd } from './cmd/auth-login.command';
import * as jwt from 'jsonwebtoken';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { ChangePasswordCmd } from '../user/cmd/change-password.cmd';
import { TokenDto } from './dto/token.dto';
import { TokenUserPayload } from './dto/token-user-payload.dto';
import { UserService } from '../user/user.service';
import { environment } from '../environment/environment.dev';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  public async signUp(user: CreateUserDto) {
    const createduser = await this.userService.create(user);
    return this.createToken(createduser);
  }

  public async changePassword(cmd: ChangePasswordCmd): Promise<User> {
    const oldUser = await this.userService.findOne({ email: cmd.email });
    if (!oldUser)
      throw new NotFoundException(`No user was found for email: ${cmd.email}.`);

    return this.userService.update(
      oldUser.id,
      new User({ ...oldUser, password: cmd.oldPassword }),
      cmd.newPassword,
    );
  }

  async loginFacebook(loginFacebookInput: FacebookLoginDTO) {

    await this.registerFacebookLogin(loginFacebookInput);
    const usuario = await this.userService.findOne({
      email: loginFacebookInput.email,
      facebookId: loginFacebookInput.facebookId,
    });

    const token = await this.createToken(usuario);
    return token;
  }

  private async getFacebookLogin(loginFacebookInput: FacebookLoginDTO): Promise<User> {
    const usuario = await this.userService.findOne({ email: loginFacebookInput.email });

    if (usuario && !usuario.facebookId) {
      await this.userService.update(usuario.id, { ...usuario, facebookId: loginFacebookInput.facebookId });
    }

    return usuario;
  }

  private async registerFacebookLogin(loginFacebookInput: FacebookLoginDTO) {
    const usuario = await this.getFacebookLogin(loginFacebookInput);
    if (!usuario) {
      await this.userService.create(new CreateUserDto({
        email: loginFacebookInput.email,
        facebookId: loginFacebookInput.facebookId,
        firstname: loginFacebookInput.nome,
        lastname: '',
      }));
    }
  }

  private async getGoogleLogin(loginGoogleInput: GoogleLoginDTO): Promise<User> {
    const usuario = await this.userService.findOne({ email: loginGoogleInput.email });

    if (usuario && !usuario.googleId) {
      await this.userService.update(usuario.id, { ...usuario, googleId: loginGoogleInput.googleId });
    }

    return usuario;
  }

  private async registerGoogleLogin(loginGoogleInput: GoogleLoginDTO) {
    const usuario = await this.getGoogleLogin(loginGoogleInput);
    if (!usuario) {
      await this.userService.create(new CreateUserDto({
        firstname: loginGoogleInput.nome,
        lastname: ' ',
        email: loginGoogleInput.email,
        googleId: loginGoogleInput.googleId,
      }));
    }
  }

  async loginGoogle(loginGoogleInput: GoogleLoginDTO) {
    await this.registerGoogleLogin(loginGoogleInput);
    const usuario = await this.userService.findOne({
      email: loginGoogleInput.email,
      googleId: loginGoogleInput.googleId,
    });
    const token = await this.createToken(usuario);
    return token;
  }

  public async login(loginInfo: AuthLoginCmd) {
    const user = await this.userService.findOne({ email: loginInfo.email });
    if (!user)
      throw new NotFoundException('Não existe usuário com este e-mail!');
    await this.userService.testMatchingPasswords(user, loginInfo.password);
    return await this.createToken(user);
  }

  public async createToken(signedUser: User) {
    const secretOrKey = environment.SECRET_KEY;
    const user = new TokenUserPayload(signedUser);
    const userPOJO = JSON.parse(JSON.stringify(user));
    const accessToken = jwt.sign(userPOJO, secretOrKey);
    return new TokenDto({
      user,
      accessToken,
    });
  }
}
