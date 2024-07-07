/* eslint-disable @typescript-eslint/naming-convention */
export type GoogleTokenType = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
};

export type KakaoTokenType = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  refresh_token_expires_in: number;
};
