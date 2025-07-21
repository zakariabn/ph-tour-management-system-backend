/* eslint-disable no-console */
import app from "./app";
import { Server } from "http";
import mongoose from "mongoose";
import { env } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("✅ Connected to database.");

    server = app.listen(env.PORT, () => {
      console.log("✅ Server is listening to port", env.PORT);
    });
  } catch (error) {
    console.log("❌ Something went wrong, failed to start server\n", error);
  }
};
// ...
startServer();

// server error handling

// terminate signal handling
process.on("SIGTERM", () => {
  console.log("⚠️  SIGTERM signal received... server shutting down.");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// local terminate signal handling
process.on("SIGINT", () => {
  console.log("⚠️  SIGINT signal received... server shutting down.");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// unhandled rejection error handling
process.on("unhandledRejection", (err) => {
  console.log("⚠️  Unhandled Rejection detected... server shutting down.", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// uncaught error handling
process.on("uncaughtException", (err) => {
  console.log(
    "⚠️  Uncaught Exception Rejection detected... server shutting down.",
    err
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
