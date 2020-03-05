export interface IChallenge {
  id: number;
  name: string;
  statement: string;
  author: string;
  unlockedAt: Date;
  successRate: number;
}
