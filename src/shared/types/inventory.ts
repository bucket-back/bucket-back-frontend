import { ItemInfo } from '.';

export interface inventoryInfo {
  hobby: string;
  inventoryId: number;
  inventoryTotalPrice: number;
  itemImages: InventoryItemImage[];
}

export interface InventoryItemImage {
  id: number;
  imgUrl: string;
}

export interface inventoryItemInfo {
  id: number;
  name: string;
  price: number;
  image: string;
  itemUrl: string;
}

export interface reviewedItem {
  cursorId: string;
  isSelected: boolean;
  createdAt: string;
  itemInfo: ItemInfo;
}
