import { NextFunction, Request, Response } from 'express';
import AppError from '../errorHelper/AppError';
import statusCode from 'http-status-codes';
import { verifyToken } from '../utils/jwt';
import { env } from '../config/env';
import { JwtPayload } from 'jsonwebtoken';

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(statusCode.UNAUTHORIZED, 'Access token not found');
      }

      // verifying token
      const verifiedToken = verifyToken(accessToken, env.JWT_ACCESS_SECRET) as JwtPayload;

      // authenticating user role
      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(statusCode.FORBIDDEN, 'Your are not authorized to access this route');
      }
      req.user = verifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
