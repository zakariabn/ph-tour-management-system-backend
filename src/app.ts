import express from "express";
import { Request, Response } from "express";

const app = express();

// middleware

// routes

// Promise.reject(new Error("error happend"));
// throw new Error("Uncaught handle error");
// throw new Error("Uncaught handle error");

// default route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to tour management system backend",
  });
});

export default app;
