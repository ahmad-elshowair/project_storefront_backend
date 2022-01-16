/* eslint-disable prettier/prettier */
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const client = new Pool({
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
});

export default client;
