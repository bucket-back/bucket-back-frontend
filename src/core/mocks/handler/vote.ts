import { PathParams, http } from 'msw';
import { CreateVote, JoinVote, DetailVote, DeleteVote, SearchVote } from '../response/vote';

const BASEURL = '/api/votes';

export interface CreateVoteReq {
  hobby: string;
  content: string;
  option1ItemId: number;
  option2ItemId: number;
}

export interface JoinVoteReq {
  itemId: number;
}

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

interface VoteSummary {
  voteInfo: VoteInfo;
  option1Item: OptionItem;
  option2Item: OptionItem;
  cursorId: string;
}
interface OptionItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface VoteInfo {
  id: number;
  content: string;
  createAt: string;
  isVoting: boolean;
  participants: number;
  option1Votes: number;
  option2Votes: number;
}

export const handler = [
  http.post<PathParams, CreateVoteReq>(`${BASEURL}`, CreateVote),
  http.post<PathParams, JoinVoteReq>(`${BASEURL}/:voteId/participation`, JoinVote),
  http.get<PathParams, undefined, DetailRes>(`${BASEURL}/:voteId`, DetailVote),
  http.delete<PathParams>(`${BASEURL}/:voteId`, DeleteVote),
  http.get<PathParams, undefined, SearchVoteRes>(`${BASEURL}`, SearchVote),
];
