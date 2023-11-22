import { ItemInfo } from './item';

export interface VotesInfo {
  voteInfo: VoteInfo;
  item1Info: ItemInfo;
  item2Info: ItemInfo;
  cursorId: string;
}

export interface VoteInfo {
  id: number;
  content: string;
  startTime: string;
  isVoting: boolean;
  participants: number;
  item1Votes: number;
  item2Votes: number;
}
