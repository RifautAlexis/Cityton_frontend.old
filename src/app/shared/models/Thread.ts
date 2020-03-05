import { IUserMinimal as UserMinimal } from '@shared/models/UserMinimal';

export interface IThread {
  discussionId: number;
  name: string;
  participants: UserMinimal[];
}
