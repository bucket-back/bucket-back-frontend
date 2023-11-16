export interface SearchVoteRes {
  nextCursorId: string;
  voteSummaries: VoteSummary[];
}

export interface DetailRes {
  option1Item: OptionItem;
  option2Item: OptionItem;
  voteInfo: VoteInfo;
  isOwner: boolean;
  selectOptionId: number;
}

export interface VoteSummary {
  voteInfo: VoteInfo;
  option1Item: OptionItem;
  option2Item: OptionItem;
  cursorId: string;
}
export interface OptionItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface VoteInfo {
  id: number;
  content: string;
  createAt: string;
  isVoting: boolean;
  participants: number;
  option1Votes: number;
  option2Votes: number;
}
