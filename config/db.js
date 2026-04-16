import pkg from 'pg'
import { env } from './env.js'

const {Pool} = pkg 

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});
export const connectDB = async () => {
     try {
    const client = await pool.connect();
    console.log('PostgreSQL connected:', env.DB_NAME);
    client.release();
  } catch (error) {
    console.error(' PostgreSQL connection failed:', error);
    process.exit(1);
  }
}


 export default pool