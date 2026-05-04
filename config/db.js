import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("DB connected");
    client.release();
  } catch (error) {
    console.error("DB ERROR:", error);
   
  }
};
export default pool;