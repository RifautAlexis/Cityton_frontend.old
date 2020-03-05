import { IMediaMinimal as MediaMinimal } from '@shared/models/MediaMinimal';

export interface IMessage {
  id: number;
  content: string;
  media: MediaMinimal;
  author: IUser;
  createdAt: Date;
  discussionId: number;
}

interface IUser {
  id: number;
  username: string;
}
