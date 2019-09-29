import { UserRole, UserStatus } from './user.entity';

export interface IUser {
  readonly id?: string;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly email?: string;
  readonly password?: string;
  readonly status?: UserStatus;
  readonly role?: UserRole;
  readonly createdAt?: string;
}
