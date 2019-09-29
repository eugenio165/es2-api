import { UserRole } from '../user.entity';
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
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @IsIn([UserRole.ADMIN, UserRole.SUPERADMIN, UserRole.USER])
  role: UserRole;
}
