import cors from "cors";
import express from "express";
import { router } from "./app/routes";
import { Request, Response } from "express";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";

import notFound from "./app/middleware/notFound";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1", router);

// Promise.reject(new Error("error happend"));
// throw new Error("Uncaught handle error");
// throw new Error("Uncaught handle error");

// default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to tour management system backend",
  });
});

// global error handler
app.use(globalErrorHandler);

// 404/Not-found route
app.use(notFound);

export default app;
