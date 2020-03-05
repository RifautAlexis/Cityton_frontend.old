import { StatusChallenge } from './Enum';

export interface IChallengeChat {
  challengeGivenId: number;
  name: string;
  statement: string;
  author: string;
  status: StatusChallenge;
}
