import { HttpResponse, ResponseResolver, PathParams, DefaultBodyType } from 'msw';
import { HttpRequestResolverExtras } from './vote';
import {
  ContentReq,
  CreateFeedReq,
  CommentReq,
  DetailFeedRes,
  SearchFeedCommentRes,
  SearchFeedRes,
} from '../handler/feed';

export const CreateFeed: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  CreateFeedReq
> = async ({ request }) => {
  const feedInfo = await request.json();

  if (!feedInfo.hobby || !feedInfo.bucketId || !feedInfo.content) {
    return HttpResponse.error();
  }

  return new HttpResponse(null, { status: 200 });
};

export const DeleteFeed: ResponseResolver<HttpRequestResolverExtras<PathParams>> = ({ params }) => {
  const { feedId } = params;

  if (!feedId) {
    return HttpResponse.error();
  }

  return new HttpResponse(null, { status: 200 });
};

export const EditFeed: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  ContentReq
> = async ({ request }) => {
  const feedInfo = await request.json();

  if (!feedInfo.content) {
    return HttpResponse.error();
  }

  return new HttpResponse(null, { status: 200 });
};

export const CreateComment: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  CommentReq
> = async ({ params, request }) => {
  const { feedId } = params;
  const commentInfo = await request.json();

  if (!feedId || !commentInfo.comment) {
    return HttpResponse.error();
  }

  return new HttpResponse(null, { status: 200 });
};

export const AdoptionComment: ResponseResolver<HttpRequestResolverExtras<PathParams>> = ({
  params,
}) => {
  const { feedId, commentId } = params;
  if (!feedId || !commentId) {
    return HttpResponse.error();
  }

  return new HttpResponse(null, { status: 200 });
};

export const DeleteComment: ResponseResolver<HttpRequestResolverExtras<PathParams>> = ({
  params,
}) => {
  const { feedId, commentId } = params;
  if (!feedId || !commentId) {
    return HttpResponse.error();
  }

  return new HttpResponse(null, { status: 200 });
};

export const EditComment: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  CommentReq
> = async ({ params, request }) => {
  const { feedId, commentId } = params;
  if (!feedId || !commentId) {
    return HttpResponse.error();
  }
  const commentInfo = await request.json();

  if (!commentInfo.comment) {
    return HttpResponse.error();
  }

  return new HttpResponse(null, { status: 200 });
};

export const LikeFeed: ResponseResolver<HttpRequestResolverExtras<PathParams>> = ({ params }) => {
  const { feedId } = params;
  if (!feedId) {
    return HttpResponse.error();
  }

  return new HttpResponse(null, { status: 200 });
};

export const UnlikeFeed: ResponseResolver<HttpRequestResolverExtras<PathParams>> = ({ params }) => {
  const { feedId } = params;
  if (!feedId) {
    return HttpResponse.error();
  }

  return new HttpResponse(null, { status: 200 });
};

export const DetailFeed: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  undefined,
  DetailFeedRes
> = ({ params }) => {
  const { feedId } = params;

  if (!feedId) {
    return HttpResponse.error();
  }

  return HttpResponse.json({
    memberInfo: {
      memberId: 1,
      nickName: 'byeong',
      profileImage: 's3.aws.com',
      level: 10,
    },
    feedInfo: {
      hobby: '농구',
      feedId: 1,
      likeCount: 150,
      feedContent: '나 농구초보자 셋 맞추고샀는데 어떰',
      bucketName: '뉴비 초보자 셋',
      bucketBudget: 100000,
      isLike: true,
      hasAdoptedComment: false,
      createdAt: '2021-10-15T20:48:19.816Z',
    },

    feedItems: [
      {
        itemId: 1,
        itemName: '나이키 운동화',
        itemPrice: 10000,
        itemImage: 'www.image data',
      },
      {
        itemId: 2,
        itemName: '조던 상의',
        itemPrice: 10000,
        itemImage: 'www.image data',
      },
      {
        itemId: 3,
        itemName: '조던 하의',
        itemPrice: 10000,
        itemImage: 'www.image data',
      },
    ],
  });
};

export const SearchFeedComment: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  undefined,
  SearchFeedCommentRes
> = ({ params }) => {
  const { feedId } = params;
  console.log(feedId);
  if (!feedId) {
    return HttpResponse.error();
  }

  return HttpResponse.json({
    commentCount: 10,
    comments: [
      {
        memberInfo: {
          nickName: 'byeong',
          profileImage: 's3.aws.com',
          level: 10,
          memberId: 1,
        },
        comment: '오 까리한데',
        likeCount: 10,
        isLike: false,
        isAdopted: false,
        createAt: 'Tue Nov 07 2023 19:00:12 GMT+0900',
      },

      {
        memberInfo: {
          nickName: 'gorani',
          profileImage: 's3.aws.com',
          level: 10,
          memberId: 1,
        },
        comment: '오호',
        likeCount: 10,
        isLike: false,
        isAdopted: false,
        createAt: 'Tue Nov 07 2023 19:00:12 GMT+0900',
      },
    ],
  });
};
export const SearchFeed: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  DefaultBodyType,
  SearchFeedRes
> = ({ request }) => {
  const url = new URL(request.url);
  // 정렬기준
  // const sortCondition = url.searchParams.get('sortCondition');
  // 커서id(처음 요청엔 안보내도됨)
  // const cursorId = url.searchParams.get('cursorId');
  // 페이지 사이즈
  // const size = url.searchParams.get('size');

  // 투표상태
  const statusCondition = url.searchParams.get('statusCondition');
  // 취미
  const hobby = url.searchParams.get('hobby');

  if (!statusCondition || !hobby) {
    return HttpResponse.error();
  }

  return HttpResponse.json({
    nextCursorId: '2023110117232992516800000001',
    voteSummaries: [
      {
        voteInfo: {
          id: 1,
          content: '어떤 농구공이 이쁜가?',
          startTime: '2023-10-26T00:00:00',
          isVoting: true,
          participants: 2,
        },
        option1Item: {
          id: 1,
          name: '몰텐 농구공 BG3800 7호',
          price: 49790,
          image:
            'https://team-02-bucket.s3.ap-northeast-2.amazonaws.com/bucket-back-images/%EB%AA%B0%ED%85%90+%EB%86%8D%EA%B5%AC%EA%B3%B5.PNG',
        },
        option2Item: {
          id: 2,
          name: '스타스포츠 STAR 스타 농구공 점보 매직 5호 BB605',
          price: 10920,
          image:
            'https://team-02-bucket.s3.ap-northeast-2.amazonaws.com/bucket-back-images/%EB%B8%8C%EB%9E%9C%EB%93%9C%EC%8A%A4%ED%83%80%ED%8F%AC%EC%B8%A0+%EB%86%8D%EA%B5%AC%EA%B3%B5.PNG',
        },
        cursorId: '2023110117244939600300000002',
      },
    ],
  });
};
