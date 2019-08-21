import { UserRole } from '../user.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { IUser } from '../user.interface';

export class UpdateUserDto {
  constructor(data: IUser) {
    if (!!data) {
      this.id = data.id;
      this.email = data.email;
      this.firstname = data.firstname;
      this.lastname = data.lastname;
      this.role = data.role;
    }
  }
  @ApiModelProperty() id: string;
  @ApiModelProperty() email: string;
  @ApiModelProperty() firstname: string;
  @ApiModelProperty() lastname: string;
  @ApiModelProperty() role: UserRole;
}
