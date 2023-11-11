import { HttpResponse, ResponseResolver, PathParams, DefaultBodyType } from 'msw';
import { HttpRequestResolverExtras } from 'node_modules/msw/lib/core/handlers/HttpHandler';
import {
  CreateItemReq,
  ReadDetailItemRes,
  TakeItemReq,
  ReadReviewListRes,
  CursorInfo,
  SearchItemListRes,
  SearchKeywordItemListRes,
  ReviewInfo,
} from '../handler/item';

export const CreateItem: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  CreateItemReq,
  undefined
> = async ({ request }) => {
  const itemInfo = await request.json();
  if (!itemInfo.hobby || !itemInfo.itemUrl) {
    return HttpResponse.error();
  }

  return new HttpResponse(null, { status: 200 });
};

export const TakeItem: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  TakeItemReq,
  undefined
> = async ({ request }) => {
  const itemInfo = await request.json();
  if (itemInfo.itemIds.length < 0) {
    return HttpResponse.error();
  }

  return new HttpResponse(null, { status: 200 });
};

export const ReadDetailItem: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  DefaultBodyType,
  ReadDetailItemRes
> = ({ params }) => {
  const { itemId } = params;
  if (!itemId) {
    return HttpResponse.error();
  }

  return HttpResponse.json({
    itemInfo: {
      id: 1,
      name: '몰텐 농구공 BG3800 7호',
      price: 49790,
      image:
        'https://team-02-bucket.s3.ap-northeast-2.amazonaws.com/bucket-back-images/%EB%AA%B0%ED%85%90+%EB%86%8D%EA%B5%AC%EA%B3%B5.PNG',
    },
    itemUrl:
      'https://search.shopping.naver.com/catalog/28387288564?cat_id=50001440&frm=NVSCPRO&query=%EB%86%8D%EA%B5%AC%EA%B3%B5&NaPm=ct%3Dlo5yg6mw%7Cci%3Dc7b4d879261de032b36ef133d1c8dad0c09f90c0%7Ctr%3Dsls%7Csn%3D95694%7Chk%3D7fe52870e0afdf72ae8313b2bc965076f54b7928',
    itemAvgRate: 2.0,
    isMemberItem: false,
  });
};

export const ReadReviewList: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  DefaultBodyType,
  ReadReviewListRes
> = ({ params }) => {
  const { itemId } = params;
  if (!itemId) {
    return HttpResponse.error();
  }

  return HttpResponse.json({
    reviewCount: 7,
    nextCursorId: '2023110315510600000003',
    reviews: [
      {
        cursorId: '2023110715510600000007',
        memberInfo: {
          memberId: 1,
          nickName: 'byoeng_gorani',
          profileImage: null,
          level: 0,
        },
        reviewId: 7,
        rate: 1,
        content: '7번 리뷰',
        createdAt: '2023-11-07T15:51:06.58369',
        updatedAt: '2023-11-01T15:51:06.58369',
      },
      {
        cursorId: '2023110615510600000006',
        memberInfo: {
          memberId: 1,
          nickName: 'byoeng_gorani',
          profileImage: null,
          level: 0,
        },
        reviewId: 6,
        rate: 2,
        content: '6번 리뷰',
        createdAt: '2023-11-06T15:51:06.58369',
        updatedAt: '2023-11-02T15:51:06.58369',
      },
      {
        cursorId: '2023110515510600000005',
        memberInfo: {
          memberId: 1,
          nickName: 'byoeng_gorani',
          profileImage: null,
          level: 0,
        },
        reviewId: 5,
        rate: 3,
        content: '5번 리뷰',
        createdAt: '2023-11-05T15:51:06.58369',
        updatedAt: '2023-11-03T15:51:06.58369',
      },
      {
        cursorId: '2023110415510600000004',
        memberInfo: {
          memberId: 1,
          nickName: 'byoeng_gorani',
          profileImage: null,
          level: 0,
        },
        reviewId: 4,
        rate: 4,
        content: '4번 리뷰',
        createdAt: '2023-11-04T15:51:06.58369',
        updatedAt: '2023-11-04T15:51:06.58369',
      },
      {
        cursorId: '2023110315510600000003',
        memberInfo: {
          memberId: 1,
          nickName: 'byoeng_gorani',
          profileImage: null,
          level: 0,
        },
        reviewId: 3,
        rate: 5,
        content: '3번 리뷰',
        createdAt: '2023-11-03T15:51:06.58369',
        updatedAt: '2023-11-05T15:51:06.58369',
      },
    ],
  });
};

export const DeleteMyItem: ResponseResolver<HttpRequestResolverExtras<PathParams>> = ({
  params,
}) => {
  const { itemId } = params;
  if (!itemId) {
    return HttpResponse.error();
  }

  return new HttpResponse(null, { status: 200 });
};

export const SearchItemList: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  CursorInfo,
  SearchItemListRes
> = async ({ request }) => {
  const url = new URL(request.url);
  const keyword = url.searchParams.get('keyword');
  const cursorId = url.searchParams.get('cursorId');
  const size = url.searchParams.get('size');
  if (!keyword || !cursorId || !size) {
    return HttpResponse.error();
  }

  return HttpResponse.json({
    nextCursorId: '2023110115510658369000000003',
    items: [
      {
        cursorId: '2023110115510658369000000001',
        itemSummary: {
          id: 1,
          name: '몰텐 농구공 BG3800 7호',
          price: 49790,
          image:
            'https://team-02-bucket.s3.ap-northeast-2.amazonaws.com/bucket-back-images/%EB%AA%B0%ED%85%90+%EB%86%8D%EA%B5%AC%EA%B3%B5.PNG',
          createdAt: '2023-11-01T15:51:06.58369',
        },
      },
      {
        cursorId: '2023110115510658369000000002',
        itemSummary: {
          id: 2,
          name: '스타스포츠 STAR 스타 농구공 점보 매직 5호 BB605',
          price: 10920,
          image:
            'https://team-02-bucket.s3.ap-northeast-2.amazonaws.com/bucket-back-images/%EB%B8%8C%EB%9E%9C%EB%93%9C%EC%8A%A4%ED%83%80%ED%8F%AC%EC%B8%A0+%EB%86%8D%EA%B5%AC%EA%B3%B5.PNG',
          createdAt: '2023-11-01T15:51:06.58369',
        },
      },
      {
        cursorId: '2023110115510658369000000002',
        itemSummary: {
          id: 3,
          name: '스타스포츠 STAR 스타 농구공 점보 매직 5호 BB605',
          price: 10920,
          image:
            'https://team-02-bucket.s3.ap-northeast-2.amazonaws.com/bucket-back-images/%EB%B8%8C%EB%9E%9C%EB%93%9C%EC%8A%A4%ED%83%80%ED%8F%AC%EC%B8%A0+%EB%86%8D%EA%B5%AC%EA%B3%B5.PNG',
          createdAt: '2023-11-01T15:51:06.58369',
        },
      },
      {
        cursorId: '2023110115510658369000000002',
        itemSummary: {
          id: 4,
          name: '스타스포츠 STAR 스타 농구공 점보 매직 5호 BB605',
          price: 10920,
          image:
            'https://team-02-bucket.s3.ap-northeast-2.amazonaws.com/bucket-back-images/%EB%B8%8C%EB%9E%9C%EB%93%9C%EC%8A%A4%ED%83%80%ED%8F%AC%EC%B8%A0+%EB%86%8D%EA%B5%AC%EA%B3%B5.PNG',
          createdAt: '2023-11-01T15:51:06.58369',
        },
      },
      {
        cursorId: '2023110115510658369000000002',
        itemSummary: {
          id: 5,
          name: '스타스포츠 STAR 스타 농구공 점보 매직 5호 BB605',
          price: 10920,
          image:
            'https://team-02-bucket.s3.ap-northeast-2.amazonaws.com/bucket-back-images/%EB%B8%8C%EB%9E%9C%EB%93%9C%EC%8A%A4%ED%83%80%ED%8F%AC%EC%B8%A0+%EB%86%8D%EA%B5%AC%EA%B3%B5.PNG',
          createdAt: '2023-11-01T15:51:06.58369',
        },
      },
    ],
  });
};
export const SearchKeywordItemList: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  DefaultBodyType,
  SearchKeywordItemListRes
> = ({ request }) => {
  const url = new URL(request.url);
  const keyword = url.searchParams.get('keyword');
  if (!keyword) {
    return HttpResponse.error();
  }

  return HttpResponse.json({
    itemNameGetResults: [
      {
        itemId: 1,
        itemName: '몰텐 농구공 BG3800 7호',
      },
      {
        itemId: 2,
        itemName: '스타스포츠 STAR 스타 농구공 점보 매직 5호 BB605',
      },
      {
        itemId: 3,
        itemName: '나이키 에브리데이 올코트 농구공 7호(DO8258-855)',
      },
    ],
  });
};

export const PostItemReview: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  ReviewInfo,
  undefined
> = async ({ params, request }) => {
  const { itemId } = params;
  if (!itemId) {
    return HttpResponse.error();
  }
  const itemReviewInfo = await request.json();
  if (!itemReviewInfo.content) {
    return HttpResponse.error();
  }

  return new HttpResponse(null, { status: 200 });
};

export const EditItemReview: ResponseResolver<
  HttpRequestResolverExtras<PathParams>,
  ReviewInfo,
  undefined
> = async ({ params, request }) => {
  const { itemId, reviewId } = params;
  if (!itemId || !reviewId) {
    return HttpResponse.error();
  }
  const itemReviewInfo = await request.json();
  if (!itemReviewInfo.content) {
    return HttpResponse.error();
  }

  return new HttpResponse(null, { status: 200 });
};

export const DeleteItemReview: ResponseResolver<HttpRequestResolverExtras<PathParams>> = ({
  params,
}) => {
  const { itemId, reviewId } = params;
  if (!itemId || !reviewId) {
    return HttpResponse.error();
  }

  return new HttpResponse(null, { status: 200 });
};
