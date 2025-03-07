import dotenv from "dotenv";

dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 3000,
    MADGRADES_API_BASE_URL: process.env.MADGRADES_API_BASE_URL || "",
    API_TOKEN: process.env.MADGRADES_API_TOKEN || "",
    FIREBASE_CREDENTIALS: JSON.parse(process.env.FIREBASE_CREDENTIALS as string),
    FIREBASE_URL : process.env.FIREBASE_URL,
    DATABASE_URL : process.env.DATABASE_URL
};
