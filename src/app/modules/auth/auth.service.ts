import AppError from '../../errorHelper/AppError';
import { User } from '../user/user.model';
import { IUser } from '../user/user.types';
import httpStatus from 'http-status-codes';
import { generateToken } from '../../utils/jwt';
import { env } from '../../config/env';
import { validateHash } from '../../utils/hash';

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password: payloadPassword } = payload;

  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User doesn't exist");
  }

  // matching/verifying password
  const isPasswordMatch = await validateHash(payloadPassword as string, isUserExist.password as string);

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect password');
  }

  // jwt payload
  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  // jwt token
  const accessToken = generateToken(jwtPayload, env.JWT_ACCESS_SECRET, '1d');

  return {
    accessToken,
  };
};

export const AuthServices = {
  credentialsLogin,
};
