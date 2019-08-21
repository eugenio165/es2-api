import { UserRole } from 'user/user.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { IUser } from '../../user/user.interface';

export class TokenUserPayload {
  constructor(data: IUser) {
    this.sub = data.id;
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.role = data.role;
  }
  @ApiModelProperty() sub: string;
  @ApiModelProperty() email: string;
  @ApiModelProperty() firstname: string;
  @ApiModelProperty() lastname: string;
  @ApiModelProperty() role: UserRole;
}
