/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import statusCode from 'http-status-codes';
import { userService } from './user.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

/*
const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // throw new AppError(400, "fake error");
    // throw new Error("test");

    const user = await userService.createUser(req.body);

    res.status(statusCode.CREATED).json({
      data: user,
      message: "A new user created",
    });
  } catch (err: any) {
    // console.log(err);
    next(err);
  }
};
*/

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.createUser(req.body);
  /*
    res.status(statusCode.CREATED).json({
      success: true,
      data: user,
      message: "A new user created",
    });
    */
  sendResponse(res, {
    success: true,
    statusCode: statusCode.CREATED,
    message: 'A new user created successfully',
    data: user,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  const verifiedToken = req.user;
  const payload = req.body;

  const updatedUser = await userService.updateUser(userId, payload, verifiedToken);
  /*
    res.status(statusCode.CREATED).json({
      success: true,
      data: user,
      message: "A new user created",
    });
    */
  sendResponse(res, {
    success: true,
    statusCode: statusCode.CREATED,
    message: 'User updated successfully',
    data: updatedUser,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await userService.getAllUser();

  /*
      res.status(statusCode.CREATED).json({
      success: true,
      message: "All user data retrieve successfully",
      data: users,
     });
    */
  sendResponse(res, {
    success: true,
    statusCode: statusCode.OK,
    message: 'All user data retrieve successfully',
    data: result.data,
    meta: result.meta,
  });
});

export const UserControllers = {
  createUser,
  updateUser,
  getAllUser,
};
