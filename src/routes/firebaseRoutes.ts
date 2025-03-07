import express from "express";
import { saveCourses, getCourses } from "../services/firebaseService";
import { fetchCourses } from "../services/madgradesService";

const router = express.Router();

// 📌 MadGrades 데이터를 Firebase에 저장
router.get("/update-courses", async (req, res) => {
    try {
        const { query } = req.query;
        const courses = await fetchCourses(query as string);
        await saveCourses(courses);
        res.json({ success: true, message: "Courses updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update courses" });
    }
});

// 📌 Firebase에서 저장된 강의 데이터 가져오기
router.get("/courses", async (req, res) => {
    try {
        const courses = await getCourses();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch courses" });
    }
});

export default router;
