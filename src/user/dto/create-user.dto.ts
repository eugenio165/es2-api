import { ApiModelProperty } from '@nestjs/swagger';
import { IUser } from '../../user/user.interface';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'user/user.entity';

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
  @ApiModelProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  firstname: string;

  password: string;

  @ApiModelProperty({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  lastname: string;
}
