import { JwtPayload } from 'jsonwebtoken';

interface MyJwtPayload extends JwtPayload {
  userId: number;
}

export type { MyJwtPayload };
