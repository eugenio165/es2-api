import { UserRole } from '../../user/user.entity';
import { IUser } from '../../user/user.interface';

export class DeleteUserDto {
  constructor(data: IUser) {
    this.id = data.id;
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.role = data.role;
  }
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: UserRole;
}
