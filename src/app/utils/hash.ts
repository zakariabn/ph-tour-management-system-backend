import bcrypt from 'bcryptjs';
import { env } from '../config/env';

export const generateHash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, Number(env.BCRYPT_SALT_ROUND));
};

export const validateHash = async (password: string, hashPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};
