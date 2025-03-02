import { drizzle } from 'drizzle-orm/neon-http';
// import { neon } from '@neondatabase/serverless';
import { config } from "dotenv";
import fs from "fs";

const envFiles = [".env", ".env.local", ".env.development", ".env.production"];

// Find the first existing .env file
const envFile = envFiles.find(file => fs.existsSync(file));

if (envFile) {
  console.log(`Loading environment variables from ${envFile}`);
  config({ path: envFile });
} else {
  console.warn("No .env file found.");
}

// const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(process.env.DATABASE_URL!);
