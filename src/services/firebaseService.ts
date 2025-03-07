import { db } from "../config/firebase";
import { Course } from "../types/types";

/**
 * Firestore에 강의 데이터 저장
 */
export const saveCourses = async (courses: Course[]): Promise<void> => {
    const batch = db.batch();

    courses.forEach((course) => {
        const docRef = db.collection("courses").doc(course.id);
        batch.set(docRef, course);
    });

    await batch.commit();
    console.log("✅ Courses saved to Firebase.");
};

/**
 * Firestore에서 강의 데이터 가져오기
 */
export const getCourses = async (): Promise<Course[]> => {
    const snapshot = await db.collection("courses").get();
    return snapshot.docs.map((doc) => doc.data() as Course);
};
