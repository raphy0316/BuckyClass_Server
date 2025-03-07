import { pool } from "../config/db";
import { Course } from "../types";

export const saveCoursesToDB = async (courses: Course[]): Promise<void> => {
    const client = await pool.connect();

    try {
        const query = `
            INSERT INTO courses (id, name, number, subjects)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (id) 
            DO UPDATE SET name = EXCLUDED.name, number = EXCLUDED.number, subjects = EXCLUDED.subjects;
        `;

        for (const course of courses) {
            await client.query(query, [
                course.id,
                course.name,
                course.number,
                JSON.stringify(course.subjects)
            ]);
        }

        console.log(`${courses.length} courses saved/updated in PostgreSQL`);
    } catch (error) {
        console.error("🚨 Failed to save courses to PostgreSQL:", error);
    } finally {
        client.release();
    }
};

export const getCoursesFromDB = async (): Promise<Course[]> => {
    const client = await pool.connect();

    try {
        const result = await client.query("SELECT * FROM courses");
        return result.rows.map(row => ({
            id: row.id,
            name: row.name,
            number: row.number,
            subjects: JSON.parse(row.subjects)
        }));
    } catch (error) {
        console.error("🚨 Failed to fetch courses from PostgreSQL:", error);
        return [];
    } finally {
        client.release();
    }
};