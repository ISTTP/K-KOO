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
  letterId: number;
};

export type PageTypeResponse = {
  currentPage: number;
  totalPage: number;
};

export type CakeUserTypeResponse = {
  nickname: string;
  year: string;
  sheetColor: CakeColorType | null;
  creamColor: CakeColorType | null;
  isBirthday: boolean;
};
