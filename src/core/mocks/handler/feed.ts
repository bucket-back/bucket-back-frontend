import { http, PathParams, DefaultBodyType } from 'msw';
import {
  CreateFeed,
  DeleteFeed,
  EditFeed,
  CreateComment,
  AdoptionComment,
  DeleteComment,
  EditComment,
  LikeFeed,
  UnlikeFeed,
  SearchFeed,
  DetailFeed,
  SearchFeedComment,
} from '../response/feed';

export interface CreateFeedReq {
  hobby: string;
  bucketId: number;
  content: string;
}

export interface ContentReq {
  content: string;
}

export interface CommentReq {
  comment: string;
}

export interface DetailFeedRes {
  memberInfo: MemberInfo;
  feedInfo: FeedInfo;
  feedItems: FeedItem[];
}
export interface SearchFeedCommentRes {
  commentCount: number;
  comments: Comment[];
}

export interface SearchFeedRes {
  nextCursorId: string;
  voteSummaries: VoteSummary[];
}

export interface MemberInfo {
  memberId: number;
  nickName: string;
  profileImage: string;
  level: number;
}

interface FeedInfo {
  hobby: string;
  feedId: number;
  likeCount: number;
  feedContent: string;
  bucketName: string;
  bucketBudget: number;
  isLike: boolean;
  hasAdoptedComment: boolean;
  createdAt: string;
}

interface FeedItem {
  itemId: number;
  itemName: string;
  itemPrice: number;
  itemImage: string;
}

interface Comment {
  memberInfo: MemberInfo;
  comment: string;
  likeCount: number;
  isLike: boolean;
  isAdopted: boolean;
  createAt: string;
}

interface VoteSummary {
  voteInfo: VoteInfo;
  option1Item: Option1Item;
  option2Item: Option2Item;
  cursorId: string;
}

interface VoteInfo {
  id: number;
  content: string;
  startTime: string;
  isVoting: boolean;
  participants: number;
}

interface Option1Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface Option2Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

const BASEURL = '/api/feeds';

export const handler = [
  http.post<PathParams, CreateFeedReq>(`${BASEURL}`, CreateFeed),
  http.delete<PathParams>(`${BASEURL}/:feedId`, DeleteFeed),
  http.put<PathParams, ContentReq>(`${BASEURL}/:feedId`, EditFeed),
  http.post<PathParams, CommentReq>(`${BASEURL}/:feedId/comments`, CreateComment),
  http.post<PathParams>(`${BASEURL}/:feedId/comments/:commentId/adoption`, AdoptionComment),
  http.delete<PathParams>(`${BASEURL}/:feedId/comments/:commentId`, DeleteComment),
  http.put<PathParams, CommentReq>(`${BASEURL}/:feedId/comments/:commentId`, EditComment),
  http.post<PathParams>(`${BASEURL}/:feedId/like`, LikeFeed),
  http.put<PathParams>(`${BASEURL}/:feedId/unlike`, UnlikeFeed),
  http.get<PathParams, undefined, DetailFeedRes>(`${BASEURL}/:feedId`, DetailFeed),
  http.get<PathParams, undefined, SearchFeedCommentRes>(
    `${BASEURL}/:feedId/comments`,
    SearchFeedComment
  ),
  http.get<PathParams, DefaultBodyType, SearchFeedRes>(`${BASEURL}`, SearchFeed),
];
