import express from "express";
import {getReview, saveReview} from "../services/postgreService";
import { Review } from "../types/types";
import {fetchGrade} from "../services/madgradesService";

const router = express.Router();

router.post("/", async (req, res): Promise<void> => {
    try{
        const {course_id, user_id, rating, comment} = req.body

        const review: Review = {
            course_id: course_id,
            user_id: user_id,
            rating: rating,
            comment: comment
        }

        await saveReview(review);
        res.status(201).json({ message: "Review saved successfully", review });
    } catch (error) {
        console.error("Error saving review:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:course_id", async (req, res): Promise<void> => {
    try {
        const id = req.params.course_id;
        const review = await getReview(id);

        res.status(200).json(review);
    } catch (error) {
        console.error("Failed to update courses and grades:", error);
        res.status(500).json({ error: "Failed to update courses and grades" });
    }
});




export default router;
