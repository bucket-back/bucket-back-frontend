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

export interface ItemNameGetResult {
  itemId: number;
  itemName: string;
}

export interface ItemInfo {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface Review {
  cursorId: string;
  memberInfo: MemberInfo;
  reviewId: number;
  rate: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface MemberInfo {
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
