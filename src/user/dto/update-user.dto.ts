import { UserRole } from '../user.entity';
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
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: UserRole;
}
