type TokenResponse = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
};

export type { TokenResponse }

export type KakaoResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  refresh_token_expires_in: number;
};
