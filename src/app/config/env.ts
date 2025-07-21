/* eslint-disable no-console */
// src/config.ts
import dotenv from "dotenv";
import { resolve } from "path";
import { existsSync } from "fs";

const modeFilePath =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.dev";

const envPath = resolve(process.cwd(), modeFilePath);

if (!existsSync(envPath)) {
  throw new Error(`❌ Environment file "${modeFilePath}" not found`);
}

dotenv.config({ path: envPath });

interface EnvConfig {
  MONGO_URI: string;
  PORT: string;
  NODE_ENV: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = ["NODE_ENV", "PORT", "MONGO_URI"];

  // checking variables
  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Environment variable missing ${key}`);
    }
  });

  return {
    NODE_ENV: process.env.NODE_ENV as string,
    PORT: process.env.PORT as string,
    MONGO_URI: process.env.MONGO_URI as string,
  };
};

export const env = loadEnvVariables();
