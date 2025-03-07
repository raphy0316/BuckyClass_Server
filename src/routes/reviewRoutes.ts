// import express from "express";
// import { saveCourses, saveGrades, getCourses } from "../services/postgreService";
// import { fetchCourses, fetchGrade } from "../services/madgradesService";
//
// const router = express.Router();
//
// router.post("/", async (req: Request, res: Response): Promise<void> => {
//     const { id, userId, rating, comment } = req.body;
//
//
//     if (!courseUuid || !userId || rating === undefined || !comment) {
//         res.status(400).json({ error: "Missing required fields" });
//         return;
//     }
//
//     if (rating < 0 || rating > 5) {
//         res.status(400).json({ error: "Rating must be between 0 and 5" });
//         return;
//     }
//
//
//     const query = `
//         INSERT INTO reviews (course_uuid, user_id, rating, comment)
//         VALUES ($1, $2, $3, $4)
//         RETURNING id;
//     `;
//
//     try {
//         const result = await pool.query(query, [courseUuid, userId, rating, comment]);
//
//
//         res.status(201).json({
//             message: "Review created successfully",
//             reviewId: result.rows[0].id,
//         });
//     } catch (error) {
//         console.error("Failed to save review:", error);
//         res.status(500).json({ error: "Failed to create review" });
//     }
// });
//
//
//
//
// export default router;
