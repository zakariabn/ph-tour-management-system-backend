import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod"; // ✅ Import this

export const validateRequest =
  (zodSchema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await zodSchema.parseAsync(req.body);
      req.body = result;
      next();
    } catch (err) {
      next(err);
    }
  };
