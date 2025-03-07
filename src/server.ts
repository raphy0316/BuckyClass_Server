import express from "express";
import cors from "cors";
import { fetchCourses, fetchCoursesDetail, fetchInstructors, fetchSubjects } from "./madgrades";
import { saveCourses, getCourses } from "./firebase";
import { CONFIG } from "./config";

const app = express();
const PORT = CONFIG.PORT;

app.use(cors());
app.use(express.json());

app.get("/courses/:uuid", async (req, res) => {
    try {
        const { uuid } = req.params;
        const courseDetail = await fetchCoursesDetail(uuid);
        res.json(courseDetail);
    } catch (error) {
        res.status(500).json({ error: "Failed to return course detail" });
    }
});

// MadGrades 데이터를 Firebase에 저장
app.get("/firebase/update-courses", async (req, res) => {
    try {
        const { query } = req.query;
        const courses = await fetchCourses(query as string);
        await saveCourses(courses);
        res.json({ success: true, message: "Courses updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update courses" });
    }
});

// Firebase에서 저장된 강의 데이터 가져오기
app.get("/firebase/courses", async (req, res) => {
    try {
        const courses = await getCourses();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch courses" });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});