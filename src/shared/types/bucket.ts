import { ItemInfo } from '.';

export interface ItemImage {
  id: number;
  imgUrl: string;
}

export interface Bucket {
  cursorId: string;
  bucketId: number;
  name: string;
  budget: number | null;
  createdAt: string;
  itemImages: ItemImage[];
}

export interface BucketMemberItem {
  cursorId: string;
  isSelected: boolean;
  createdAt: string;
  itemInfo: ItemInfo;
}
