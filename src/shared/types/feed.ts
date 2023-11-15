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

export interface FeedInfo {
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

export interface FeedItem {
  itemId: number;
  itemName: string;
  itemPrice: number;
  itemImage: string;
}

export interface Comment {
  memberInfo: MemberInfo;
  comment: string;
  likeCount: number;
  isLike: boolean;
  isAdopted: boolean;
  createAt: string;
}

export interface VoteSummary {
  voteInfo: VoteInfo;
  option1Item: Option1Item;
  option2Item: Option2Item;
  cursorId: string;
}

export interface VoteInfo {
  id: number;
  content: string;
  startTime: string;
  isVoting: boolean;
  participants: number;
}

export interface Option1Item {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface Option2Item {
  id: number;
  name: string;
  price: number;
  image: string;
}
