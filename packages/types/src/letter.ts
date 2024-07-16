export type LetterType = {
  senderId: string;
  recipientId: string;
  candleId: number;
  nickname: string;
  contents: string;
  keyword: string;
  year: number;
};

export type LetterResponseType = {
  id: string;
  senderId: string;
  recipientId: string;
  candleId: number;
  nickname: string;
  contents: string;
  keyword: string;
  year: number;
};

export type LetterTypeResponse = {
  nickname: string;
  candleImageUrl: string;
  keyword?: string;
  contents: string;
};
