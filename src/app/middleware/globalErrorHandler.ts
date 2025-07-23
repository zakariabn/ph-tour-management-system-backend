/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "../config/env";
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/AppError";
import { ZodError } from "zod";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = `Something went wrong!`;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Zod validation failed";
    err = err.format();
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: env.NODE_ENV !== "production" ? err.stack : null,
  });
  next();
};
