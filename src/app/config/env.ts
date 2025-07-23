import dotenv from 'dotenv';
// import { resolve } from "path";
// import { existsSync } from "fs";

// const modeFilePath =
//   process.env.NODE_ENV === "production" ? ".env.production" : ".env.dev";

// const envPath = resolve(process.cwd(), modeFilePath);

// if (!existsSync(envPath)) {
//   throw new Error(`❌ Environment file "${modeFilePath}" not found`);
// }
// dotenv.config({ path: envPath });

dotenv.config();

interface EnvConfig {
  MONGO_URI: string;
  PORT: string;
  NODE_ENV: string;
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES: string;
  BCRYPT_SALT_ROUND: string;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = ['NODE_ENV', 'PORT', 'MONGO_URI', 'JWT_ACCESS_SECRET', 'JWT_ACCESS_EXPIRES', 'BCRYPT_SALT_ROUND', 'SUPER_ADMIN_EMAIL', 'SUPER_ADMIN_PASSWORD'];

  // checking variables
  requiredEnvVariables.forEach(key => {
    if (!process.env[key]) {
      throw new Error(`Environment variable missing ${key}`);
    }
  });

  return {
    NODE_ENV: process.env.NODE_ENV as string,
    PORT: process.env.PORT as string,
    MONGO_URI: process.env.MONGO_URI as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
  };
};

export const env = loadEnvVariables();
