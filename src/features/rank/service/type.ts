export interface ItemResponse {
  itemRanking: ItemRanking[];
}

export interface ItemRanking {
  rank: number;
  itemName: string;
  score: number;
}
