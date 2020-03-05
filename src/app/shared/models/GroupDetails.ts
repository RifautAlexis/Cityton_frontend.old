import { Status } from '@shared/models/Enum';

export interface IGroupDetails {
  maxGroupSize: number;
  groupDetails: {
    groupId: number;
    name: string;
    createdAt: Date;
    members: IUser[];
    membershipRequests: IRequest[];
    creatorId: number;
  }

}

interface IUser {
  requestId: number;
  userId: number;
  username: string;
  isCreator: boolean;

}

interface IRequest {
  requestId: number;
  userId: number;
  username: string;
  status: Status;
  createdAt: Date;
}
