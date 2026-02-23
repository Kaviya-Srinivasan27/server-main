import { Pool } from "pg";
import dotenv from "dotenv";

// Load the variables from the .env file
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("🔥 PostgreSQL Connected successfully to Neon!");
    client.release(); 
  } catch (error) {
    console.error("❌ Error connecting to PostgreSQL:", error);
    process.exit(1);
  }
};

export default pool;