import { UserRole } from '../user.entity';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { AdvancedConsoleLogger } from 'typeorm';

export interface IChangePasswordCmd {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export class ChangePasswordCmd {
  constructor(data: IChangePasswordCmd) {
    if (!!data) {
      this.email = data.email;
      this.oldPassword = data.oldPassword;
      this.newPassword = data.newPassword;
    }
  }
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
