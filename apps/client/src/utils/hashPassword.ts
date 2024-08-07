import { SHA256 } from 'crypto-js';

export function hashPassword(password: string) {
  const salt = process.env.PASSWORD_SALT;
  const combined = password + salt;
  const hashedPassword = SHA256(combined).toString();
  return hashedPassword;
}



