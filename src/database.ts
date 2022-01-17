/* eslint-disable prettier/prettier */
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const dbPort = process.env.DB_PORT as unknown as number;
const client = new Pool({
  port: dbPort,
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
});

export default client;
