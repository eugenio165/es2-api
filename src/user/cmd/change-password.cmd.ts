import { UserRole } from '../user.entity';

import { ApiModelProperty } from '@nestjs/swagger';
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
  @ApiModelProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
