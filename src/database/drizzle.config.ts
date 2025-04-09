// src/database/drizzle.config.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

import { schema } from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // ou diretamente "postgres://postgres:postgres@localhost:5432/educabrasil"
});

export const db = drizzle(pool, { schema });
console.log('db instance created:', db); // Adicione este log para confirmar
