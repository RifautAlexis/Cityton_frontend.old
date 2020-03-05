export interface IGroupToEdit {
  id: number,
  name: string;
  creator: User;
  members: User[];
}

interface User {
  id: number,
  username: string
}
