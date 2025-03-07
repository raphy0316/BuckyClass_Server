import { Pool } from "pg";
import { ENV } from "./env";

export const pool = new Pool({
    connectionString: ENV.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on("connect", () => {
    console.log("Connected to PostgreSQL database");
});