import axios from "axios";
import { ENV } from "../config/env";
import { Course } from "../types/types";

const ENDPOINTS = {
    COURSES: "/courses",
    COURSE_DETAILS: (uuid: string) => `/courses/${uuid}`,
    COURSE_GRADES : (uuid: string) => `/courses/${uuid}/grades`,
    SUBJECTS: "/subjects",
    INSTRUCTORS: "/instructors"
};

export const fetchCourses = async (query: string): Promise<Course[]> => {
    try {
        const response = await axios.get(`${ENV.MADGRADES_API_BASE_URL}${ENDPOINTS.COURSES}`, {
            headers: { Authorization: `Token token=${ENV.API_TOKEN}` },
            params: { query }
        });

        const courses = response.data.results || [];

        return courses.map((course: any) => ({
            id: course.uuid,
            name: course.name,
            number: course.number,
            subjects: course.subjects
        }));
    } catch (error) {
        console.error("MadGrades API 호출 오류:", error);
        return [];
    }
};

export const fetchCoursesDetail = async (uuid: string) => {
    try {
        const courseResponse = await axios.get(`${ENV.MADGRADES_API_BASE_URL}${ENDPOINTS.COURSE_DETAILS(uuid)}`, {
            headers: { Authorization: `Token token=${ENV.API_TOKEN}` }
        });

        const gradesResponse = await axios.get(`${ENV.MADGRADES_API_BASE_URL}${ENDPOINTS.COURSE_GRADES(uuid)}`, {
            headers: { Authorization: `Token token=${ENV.API_TOKEN}` }
        });

        const course = courseResponse.data;

        const grades = gradesResponse.data;

        const cumulative = grades.cumulative || {};

        const sumGPA =
            ((cumulative.aCount * 4.0) +
            (cumulative.abCount * 3.5) +
            (cumulative.bCount * 3.0) +
            (cumulative.bcCount * 2.5) +
            (cumulative.cCount * 2.0) +
            (cumulative.dCount * 1.0) +
            (cumulative.fCount * 0.0));

        const total = cumulative.total || {};

        const avgGPA = total > 0 ? sumGPA / total : 0;

        const response = {
            name : course.name,
            names : course.names,
            subjects : course.subjects,
            courseOfferings : course.courseOfferings,
            avgGPA : avgGPA
        }

        return response;
    } catch (error) {
        console.error(`강의 상세 정보 조회 오류 (UUID: ${uuid}):`, error);
        return null;
    }
};

export const fetchSubjects = async () => {
    try {
        const response = await axios.get(`${ENV.MADGRADES_API_BASE_URL}${ENDPOINTS.SUBJECTS}`, {
            headers: { Authorization: `Token token=${ENV.API_TOKEN}` }
        });

        return response.data.results || [];
    } catch (error) {
        console.error("학과 목록 조회 오류:", error);
        return [];
    }
};

export const fetchInstructors = async () => {
    try {
        const response = await axios.get(`${ENV.MADGRADES_API_BASE_URL}${ENDPOINTS.INSTRUCTORS}`, {
            headers: { Authorization: `Token token=${ENV.API_TOKEN}` }
        });

        return response.data.results || [];
    } catch (error) {
        console.error("교수 목록 조회 오류:", error);
        return [];
    }
};