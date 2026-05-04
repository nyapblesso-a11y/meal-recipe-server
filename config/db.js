import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const connectDB = async () => {
  try {
    console.log("DB URL:", process.env.DATABASE_URL); // safe logging

    const client = await pool.connect();
    client.release();

    console.log("✅ DB connected successfully");
  } catch (error) {
    console.error("DB ERROR:", error);
    process.exit(1);
  }
};