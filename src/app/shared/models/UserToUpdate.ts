import { Role } from './Enum';

export interface IUserToUpdate {
  id: number;
  username: string;
  phoneNumber: string;
  email: string;
  picture: string;
  role: Role;
  password: string;
}
