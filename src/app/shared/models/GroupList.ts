import { IGroup as Group } from '@shared/models/Group';

export interface IGroupList {
  maxGroupSize: number;
  groups: Group[];
}
