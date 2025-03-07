import express from "express";
import { fetchCoursesDetail } from "../services/madgradesService";

const router = express.Router();

// 📌 강의 상세 정보 조회
router.get("/:uuid", async (req, res) => {
    try {
        const { uuid } = req.params;
        const courseDetail = await fetchCoursesDetail(uuid);
        res.json(courseDetail);
    } catch (error) {
        res.status(500).json({ error: "Failed to return course detail" });
    }
});

export default router;
