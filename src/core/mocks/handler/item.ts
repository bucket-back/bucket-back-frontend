import { http, PathParams, DefaultBodyType } from 'msw';
import {
  CreateItem,
  TakeItem,
  ReadDetailItem,
  ReadReviewList,
  DeleteMyItem,
  SearchItemList,
  SearchKeywordItemList,
  PostItemReview,
  EditItemReview,
  DeleteItemReview,
} from '../response/item';

export interface CreateItemReq {
  hobby: string;
  itemUrl: string;
}

export interface TakeItemReq {
  itemIds: number[];
}

export interface ReadDetailItemRes {
  itemInfo: ItemInfo;
  itemUrl: string;
  itemAvgRate: number;
  isMemberItem: boolean;
}

export interface CursorInfo {
  cursorId: null;
  size: 5;
}

export interface ReadReviewListRes {
  reviewCount: number;
  nextCursorId: string;
  reviews: Review[];
}

export interface SearchItemListRes {
  nextCursorId: string;
  items: Item[];
}

export interface SearchKeywordItemListRes {
  itemNameGetResults: ItemNameGetResult[];
}

interface ItemNameGetResult {
  itemId: number;
  itemName: string;
}

interface ItemInfo {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface Review {
  cursorId: string;
  memberInfo: MemberInfo;
  reviewId: number;
  rate: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface MemberInfo {
  memberId: number;
  nickName: string;
  profileImage: string;
  level: number;
}

export interface Item {
  cursorId: string;
  itemSummary: ItemSummary;
}

export interface ItemSummary {
  id: number;
  name: string;
  price: number;
  image: string;
  createdAt: string;
}
export interface ReviewInfo {
  content: string;
  rating?: number;
}

const BASEURL = '/api/items';

export const handler = [
  http.post<PathParams, CreateItemReq>(`${BASEURL}`, CreateItem),
  http.post<PathParams, TakeItemReq>(`${BASEURL}/myitems`, TakeItem),
  http.get<PathParams, DefaultBodyType, ReadReviewListRes>(
    `${BASEURL}/:itemId/reviews`,
    ReadReviewList
  ),
  http.delete<PathParams>(`${BASEURL}/myitems/:itemId`, DeleteMyItem),
  http.get<PathParams, CursorInfo, SearchItemListRes>(`${BASEURL}/search`, SearchItemList),
  http.get<PathParams, DefaultBodyType, SearchKeywordItemListRes>(
    `${BASEURL}/item-names`,
    SearchKeywordItemList
  ),
  http.post<PathParams, ReviewInfo, undefined>(`${BASEURL}/:itemId/reviews`, PostItemReview),
  http.put<PathParams, ReviewInfo, undefined>(
    `${BASEURL}/:itemId/reviews/:reviewId`,
    EditItemReview
  ),
  http.delete<PathParams>(`${BASEURL}/:itemId/reviews/:reviewId`, DeleteItemReview),
  http.get<PathParams, DefaultBodyType, ReadDetailItemRes>(`${BASEURL}/:itemId`, ReadDetailItem),
];
