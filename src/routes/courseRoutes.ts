import express from "express";
import { saveCourses, saveGrades, getCourses } from "../services/postgreService";
import { fetchCourses, fetchGrade } from "../services/madgradesService";
import { pool } from "../config/db";


const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const courses = await getCourses();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch courses" });
    }
});

router.post("/update", async (req, res): Promise<void> => {
    try {
        const courses = await fetchCourses();

        if (!courses || courses.length === 0) {
            res.status(404).json({ error: "No courses found from MadGrades API" });
        }

        await saveCourses(courses);

        const gradePromises = courses.map(async (course) => {
            try {
                const gradeData = await fetchGrade(course.id);
                if (gradeData) {
                    await saveGrades(gradeData);
                }
            } catch (error) {
                console.error(`Failed to fetch/save grades for course ${course.id}:`, error);
            }
        });

        await Promise.all(gradePromises);
        console.log("Grades updated successfully");

        res.json({ success: true, message: "Courses and grades updated successfully" });
    } catch (error) {
        console.error("Failed to update courses and grades:", error);
        res.status(500).json({ error: "Failed to update courses and grades" });
    }
});

router.get("/:uuid", async (req, res): Promise<void> => {
    try {
        const id = req.params.uuid;
        const grade = await fetchGrade(id);

        res.status(200).json(grade);
    } catch (error) {
        console.error("Failed to update courses and grades:", error);
        res.status(500).json({ error: "Failed to update courses and grades" });
    }
});




router.get("/subject/:subject", async (req, res): Promise<void> => {
    try {
        const { subject } = req.params;

        const query = `
            SELECT * FROM courses
            WHERE $1 = ANY(subjects);
        `;

        const result = await pool.query(query, [subject]);

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Failed to fetch courses by subject:", error);
        res.status(500).json({ error: "Failed to fetch courses by subject" });
    }
});

router.get("/title/:title", async (req, res): Promise<void> => {
    try {
        const { title } = req.params;

        const query = `
            SELECT * FROM courses
            WHERE name LIKE '%' || $1 || '%';
        `;


        const result = await pool.query(query, [title]);

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Failed to search courses by name:", error);
        res.status(500).json({ error: "Failed to search courses" });
    }
});



export default router;
