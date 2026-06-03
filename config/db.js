import pkg from "pg";
import { ENV } from "./env.js";

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const connectDB = async () => {
  try {
    if (!ENV.DATABASE_URL) {
      throw new Error("DATABASE_URL missing");
    }

    const client = await pool.connect();
    client.release();

  } catch (error) {
  
    process.exit(1);
  }
};