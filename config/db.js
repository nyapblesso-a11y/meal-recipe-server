import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  host: undefined, // IMPORTANT: prevent override issues
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("DB connected");
    client.release();
  } catch (error) {
    console.error("DB ERROR:", error);
    // ❌ DO NOT crash app for now
  }
};
export default pool;