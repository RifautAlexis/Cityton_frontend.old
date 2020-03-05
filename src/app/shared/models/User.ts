import { Role } from './Enum';

export interface IUser {
  id: number;
  username: string;
  phoneNumber: string;
  email: string;
  picture: string;
  role: Role;
  token: string;
  groupId: number;
}
