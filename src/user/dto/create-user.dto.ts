import { IUser } from '../../user/user.interface';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../user.entity';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto implements IUser {
  constructor(data: IUser) {
    if (!!data) {
      this.email = data.email;
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      this.password = data.password;
      this.role = data.role;
    }
  }
  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  firstname: string;

  password: string;

  @ApiModelProperty()
  role: UserRole;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  lastname: string;
}
