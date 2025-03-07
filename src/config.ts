import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
    PORT: process.env.PORT || 3000,
    MADGRADES_API_BASE_URL: process.env.MADGRADES_API_BASE_URL || "",
    API_TOKEN: process.env.MADGRADES_API_TOKEN || "",
    FIREBASE_CREDENTIALS: JSON.parse(process.env.FIREBASE_CREDENTIALS as string)
};

export const ENDPOINTS = {
    COURSES: "/courses",
    COURSE_DETAILS: (uuid: string) => `/courses/${uuid}`,
    COURSE_GRADES : (uuid: string) => `/courses/${uuid}/grades`,
    SUBJECTS: "/subjects",
    INSTRUCTORS: "/instructors"
};