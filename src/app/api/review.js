import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    "Content-Type": "application/json",
  },
});

// ✅ Fetch all departments
export const fetchReviews = async () => {
  try {
    const response = await apiClient.get("/api/reviews");
    const reviews = Array.isArray(response.data) ? response.data : response.data?.reviews || [];

    return reviews;
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};