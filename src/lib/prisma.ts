/// <reference types="node" />
import dotenv from 'dotenv';
import path from 'path';

// 1. Force dotenv to load the .env file from the root directory FIRST
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../lib'; 


// 2. Safely grab the connection string
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ CRITICAL ERROR: DATABASE_URL is missing. Check your .env file.");
  process.exit(1); // Stop the server immediately if missing
}

// 3. Initialize the pool
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// 4. Export the Prisma client
export const prisma = globalThis.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}