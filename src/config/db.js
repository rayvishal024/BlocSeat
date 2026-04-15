import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

// connection pool
const pool = new pg.Pool({
     connectionString: process.env.DATABASE_URL,
     ssl: {
          rejectUnauthorized: false,
     },
});

export default pool;