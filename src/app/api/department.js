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
export const fetchDepartments = async () => {
  try {
    const response = await apiClient.get("/api/department");

    console.log("Raw API Response (Departments):", response.data);

    const departments = Array.isArray(response.data) ? response.data : response.data?.departments || [];

    return departments.map((dept) => ({
      id: dept.id,
      en: dept.translations?.en?.name || "Unknown Department",
      bn: dept.translations?.bn?.name || "অজানা বিভাগ",
      icon: dept.icon ? `${API_BASE_URL}${dept.icon}` : "/default-department.png",
    }));
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};


