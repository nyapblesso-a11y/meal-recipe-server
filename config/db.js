import pkg from 'pg'
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  family: 4, // 🔥 FORCE IPv4 (this fixes your issue)
});


export const connectDB = async () => {
     try {
    const client = await pool.connect();
    console.log("DB URL:", process.env.DATABASE_URL);
    client.release();
  } catch (error) {
    console.error(' PostgreSQL connection failed:', error);
    process.exit(1);
  }
}


 export default pool