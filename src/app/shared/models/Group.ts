export interface IGroup {
  id: number;
  name: string;
  members: User[];
  createdAt: Date;
  hasRequested: boolean;
}

interface User {
  id: number;
  username: string;
  isCreator: boolean;
}
