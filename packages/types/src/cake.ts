export type CakeColorType =
  | 'white'
  | 'chocolate'
  | 'strawberry'
  | 'banana'
  | 'mint'
  | 'blueberry';

export type CakeTypeResponse = {
  nickname: string;
  candleImageUrl: string;
  keyword?: string;
};

export type PageTypeResponse = {
  currentPage: number;
  totalPage: number;
};
