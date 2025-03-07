import { pool } from "../config/db";
import { Course, Grade } from "../types/types";

export const saveCourses = async (courses: Course[]): Promise<void> => {
    const client = await pool.connect();

    try {
        const query = `
            INSERT INTO courses (id, name, avgGrade, subjects)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (id) 
            DO UPDATE SET name = EXCLUDED.name, avgGrade = EXCLUDED.avgGrade, subjects = EXCLUDED.subjects;
        `;

        for (const course of courses) {
            await client.query(query, [
                course.id,
                course.name,
                course.avgGrade,
                course.subjects
            ]);
        }

        console.log(`${courses.length} courses saved/updated in PostgreSQL`);
    } catch (error) {
        console.error("Failed to save courses to PostgreSQL:", error);
    } finally {
        client.release();
    }
};

export const saveGrades = async (grades: Grade): Promise<void> => {
    const client = await pool.connect();

    try {
        const query = `
            INSERT INTO grades (course_uuid, total, a_per, ab_per, b_per, bc_per, c_per, d_per, f_per, other_per)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (course_uuid) 
            DO UPDATE SET total = EXCLUDED.total, a_per = EXCLUDED.a_per, ab_per = EXCLUDED.ab_per, 
            b_per = EXCLUDED.b_per, bc_per = EXCLUDED.bc_per, c_per = EXCLUDED.c_per, 
            d_per = EXCLUDED.d_per, f_per = EXCLUDED.f_per, other_per = EXCLUDED.other_per;
        `;

        await client.query(query, [
            grades.id,
            grades.total,
            grades.a_per,
            grades.ab_per,
            grades.b_per,
            grades.bc_per,
            grades.c_per,
            grades.d_per,
            grades.f_per,
            grades.other_per
        ]);

        console.log(`Grades saved for course ${grades.id}`);
    } catch (error) {
        console.error(`Failed to save grades for course ${grades.id}:`, error);
    } finally {
        client.release();
    }
};

export const getCourses = async (): Promise<Course[]> => {
    const client = await pool.connect();

    try {
        const result = await client.query("SELECT * FROM courses");
        return result.rows.map(row => ({
            id: row.id,
            name: row.name,
            avgGrade: row.avgGrade,
            subjects: row.subjects
        }));
    } catch (error) {
        console.error("Failed to fetch courses from PostgreSQL:", error);
        return [];
    } finally {
        client.release();
    }
};

export const getGrade = async (id : String): Promise<Grade | null> => {
    const client = await pool.connect();

    try {
        const query = "SELECT * FROM grades WHERE course_uuid = $1";
        const result = await client.query(query, [id]);
        return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
        console.error(`Failed to fetch grades for course ${id}:`, error);
        return null;
    } finally {
        client.release();
    }
};