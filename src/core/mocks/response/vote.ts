import { HttpResponse, ResponseResolver, PathParams, DefaultBodyType } from 'msw';
import { CreateVoteReq, DetailRes, JoinVoteReq, SearchVoteRes } from '../handler/vote';

export type HttpRequestResolverExtras<Params extends PathParams> = {
  params: Params;
  cookies: Record<string, string | Array<string>>;
};

export type ResponseBodyType<T> = T;

export const CreateVote: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  CreateVoteReq,
  undefined
> = async ({ request }) => {
  const voteInfo = await request.json();

  if (!voteInfo) {
    return HttpResponse.error();
  }

  return HttpResponse.json({ voteId: 1 });
};

export const JoinVote: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  JoinVoteReq,
  undefined
> = async ({ request }) => {
  const voteInfo = await request.json();

  if (!voteInfo) {
    return HttpResponse.error();
  }

  return new HttpResponse(null, { status: 200 });
};

// AsyncResponseResolverReturnType<BodyType>
// StrictResponse<DetailRes>
export const DetailVote: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  undefined,
  DetailRes
> = ({ params }) => {
  const { voteId } = params;
  if (!voteId) {
    return HttpResponse.error();
  }

  return HttpResponse.json({
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
    voteInfo: {
      id: 1,
      content: '어떤 농구공이 이쁜가?',
      createAt: '2023-10-26T00:00:00',
      isVoting: true,
      participants: 2,
      option1Votes: 0,
      option2Votes: 2,
    },
    isOwner: false,
    selectOptionId: 1, // 로그인 안하면 값 안보냄
  });
};

export const DeleteVote: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  DefaultBodyType,
  undefined
> = ({ params }) => {
  const { voteId } = params;
  if (!voteId) {
    return HttpResponse.error();
  }

  return new HttpResponse(null, { status: 200 });
};

export const SearchVote: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  DefaultBodyType,
  SearchVoteRes
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
          createAt: '2023-10-26T00:00:00',
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
