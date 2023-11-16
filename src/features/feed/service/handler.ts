import { axiosClient } from '@/core/service/axios';

const FEEDS = 'feeds';

interface FeedItems {
  id: number;
  image: string;
  url: string;
}

interface FeedsData {
  cursorId: string;
  memberInfo: MemberInfo;
  feedId: number;
  content: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  feedItems: FeedItems[];
  isLike: boolean;
}

interface Feeds {
  nextCursorId: string;
  feeds: FeedsData[];
}

interface GetFeedsProps {
  hobbyName: string;
  nickname?: string;
  sortCondition?: 'popularity' | 'latest';
  cursorId?: string;
  size: number;
}

export const getFeeds = async ({
  hobbyName,
  nickname,
  sortCondition,
  cursorId,
  size,
}: GetFeedsProps) => {
  const res = await axiosClient.get<Feeds>(
    `${FEEDS}?hobbyName=${hobbyName}${nickname ? `&nickname=${nickname}` : ''}${
      sortCondition ? `&sortCondition=${sortCondition}` : ''
    }`,
    { params: cursorId ? { cursorId, size } : { size } }
  );

  return res.data;
};

interface MemberInfo {
  memberId: number;
  nickName: string;
  profileImage: string;
  level: number;
}

interface FeedInfo {
  id: number;
  hobby: string;
  content: {
    content: string;
  };
  bucketName: string;
  bucketBudget: number;
  createdAt: string;
  hasAdoptedComment: boolean;
  likeCount: number;
  isLiked: boolean;
}

interface FeedItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface FeedDetail {
  memberInfo: MemberInfo;
  feedInfo: FeedInfo;
  feedItems: FeedItem[];
}

export const getFeedDetail = async (feedId: number) => {
  const res = await axiosClient.get<FeedDetail>(`${FEEDS}/${feedId}`);

  return res.data;
};

interface PostFeedRes {
  feedId: number;
}

interface PostFeedProps {
  bucketId: number;
  content: string;
}

export const postFeed = async ({ bucketId, content }: PostFeedProps) => {
  const res = await axiosClient.post<PostFeedRes>(FEEDS, { bucketId, content });

  return res.data;
};
