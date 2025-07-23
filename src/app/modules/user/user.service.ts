import AppError from '../../errorHelper/AppError';
import { User } from './user.model';
import { IAuthProvider, IUser, Role } from './user.types';
import httpStatus from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import { generateHash } from '../../utils/hash';

// creating a user
const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User already exist');
  }

  // encrypting password
  const encryptedPassword = await bcrypt.hash(password as string, 10);

  const authProvider: IAuthProvider = {
    provider: 'credentials',
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: encryptedPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

//updating user
const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {
  const isUserExist = await User.findById({ _id: userId });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User doesn't exist");
  }

  // permission checking for specific role
  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
    }

    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
    }
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
    }
  }

  // if password contain hashing password
  if (payload.password) {
    payload.password = await generateHash(payload.password);
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true });
  return newUpdatedUser;
};

const getAllUser = async () => {
  const users = await User.find();
  const totalUsers = await User.countDocuments();

  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

export const userService = {
  createUser,
  updateUser,
  getAllUser,
};
