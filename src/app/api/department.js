import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    "Content-Type": "application/json",
  },
});

// Fetching departments based on the locale (using query parameter like in your example)
export const fetchDepartments = async (language = 'en') => {
  try {
    const response = await apiClient.get(`/api/department?lang=${language}`, {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY, // Pass the API key in headers
      },
    });

    // Assuming the response data is an array of departments
    const departments = Array.isArray(response.data) ? response.data : response.data?.departments || [];
    return departments;
  } catch (error) {
    console.error("❌ Error fetching departments:", error);
    return []; // Return empty array in case of error
  }
};

// ✅ Fetch a specific department by slug with language support
export const fetchDepartmentBySlug = async (slug, language = 'en') => {
  try {
    if (!slug) {
      console.warn("⚠️ Missing slug parameter.");
      return null;
    }

    // Make the API call with the slug and language parameter
    const response = await apiClient.get(`/api/department/slug/${slug}?lang=${language}`, {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    return response.data || null; // Return the department data if available
  } catch (error) {
    // Log the error message in case of failure
    console.error(`❌ Error fetching department (${slug}):`, error.response?.data || error.message);
    return null; // Return null if an error occurs
  }
};




