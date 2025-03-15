import { pool } from "../config/db";
import { Course, Grade, Review } from "../types/types";


export const saveCourses = async (courses: Course[]): Promise<void> => {
    const client = await pool.connect();

    try {
        const query = `
            INSERT INTO courses (id, name)
            VALUES ($1, $2)
            ON CONFLICT (id) 
            DO UPDATE SET name = EXCLUDED.name;
        `;

        for (const course of courses) {
            await client.query(query, [
                course.id,
                course.name
            ]);
        }

        console.log(`${courses.length} courses saved/updated in PostgreSQL`);
    } finally {
        client.release();
    }
};

export const saveGrades = async (grades: Grade): Promise<void> => {
    const client = await pool.connect();

    try {
        const query = `
            INSERT INTO grades (course_id, total, a_per, ab_per, b_per, bc_per, c_per, d_per, f_per, other_per)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (course_id) 
            DO UPDATE SET total = EXCLUDED.total, a_per = EXCLUDED.a_per, ab_per = EXCLUDED.ab_per, 
            b_per = EXCLUDED.b_per, bc_per = EXCLUDED.bc_per, c_per = EXCLUDED.c_per, 
            d_per = EXCLUDED.d_per, f_per = EXCLUDED.f_per, other_per = EXCLUDED.other_per;
        `;

        await client.query(query, [
            grades.course_id,
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

        console.log(`Grades saved for course ${grades.course_id}`);
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
            name: row.name
        }));
    } finally {
        client.release();
    }
};

export const getGrade = async (id : String): Promise<Grade | null> => {
    const client = await pool.connect();

    try {
        const query = "SELECT * FROM grades WHERE course_id = $1";
        const result = await client.query(query, [id]);
        return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
        client.release();
    }
};

export const saveReview = async (review: Review): Promise<void> => {
    const client = await pool.connect();
    try {
        const query = `
                INSERT INTO reviews ( course_id, user_id, rating, comment)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (course_id,user_id) 
                DO UPDATE SET rating = EXCLUDED.rating, comment = EXCLUDED.comment;
            `;

        //임시로 user_id에 course_id 저장

        await client.query(query, [
            review.course_id,
            review.user_id,
            review.rating,
            review.comment
        ]);

        console.log(`Review saved`);
    } finally {
        client.release();
    }
};

export const getReview = async (id : String): Promise<Review[] | null> => {
    const client = await pool.connect();
    try {
        const query = "SELECT * FROM reviews WHERE course_id = $1";
        const result = await client.query(query, [id]);
        return result.rows;
    } finally {
        client.release();
    }
};