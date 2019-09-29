import { IUser } from '../../user/user.interface';
import { UserRole, UserStatus } from '../user.entity';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class GetUserDto implements IUser {
  constructor(data: IUser) {
    if (!!data) {
      this.id = data.id;
      this.email = data.email;
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      this.role = data.role;
    }
  }
  @ApiModelPropertyOptional()
  id: string;

  @ApiModelPropertyOptional()
  email: string;

  @ApiModelPropertyOptional()
  firstname: string;

  @ApiModelPropertyOptional()
  lastname: string;

  @ApiModelPropertyOptional({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @ApiModelPropertyOptional({ enum: UserStatus, default: UserStatus.NORMAL })
  status: UserStatus;

  @ApiModelPropertyOptional()
  createdAt: string;
}
