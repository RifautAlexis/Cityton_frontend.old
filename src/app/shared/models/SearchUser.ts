import { Role } from './Enum';

export interface ISearchUser {
  id: number;
  username: string;
  picture: string;
  role: Role;
}
