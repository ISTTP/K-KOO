import { JwtPayload } from 'jsonwebtoken';

interface MyJwtPayload extends JwtPayload {
  userId: string;
}

export type { MyJwtPayload };
