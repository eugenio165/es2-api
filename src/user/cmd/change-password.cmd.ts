import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

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
  @ApiModelProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  newPassword: string;
}
