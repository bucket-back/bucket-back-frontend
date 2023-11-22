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

export interface MyItemSummary {
  createdAt: string;
  cursorId: string;
  itemInfo: ItemInfo;
}
