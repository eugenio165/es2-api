import { UserRole } from '../user.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { IUser } from '../user.interface';
import { IsNotEmpty, IsEmail, IsString, IsIn, IsEnum } from 'class-validator';

export class UpdateUserCmd {
  constructor(data: IUser) {
    if (!!data) {
      this.email = data.email;
      this.firstname = data.firstname;
      this.lastname = data.lastname;
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

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsIn([UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.USER])
  role: UserRole;
}
