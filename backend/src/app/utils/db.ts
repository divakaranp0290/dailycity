import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Local setup
// export const db = new Pool({
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });


// Production setup for Render
export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});