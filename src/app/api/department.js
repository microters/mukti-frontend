import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    "Content-Type": "application/json",
  },
});

// Fetching departments based on the locale
export const fetchDepartments = async (locale) => {
  try {
    const response = await apiClient.get("/api/department", {
      headers: {
        'X-Locale': locale, // Send locale as header to fetch correct language data
      },
    });

    const departments = Array.isArray(response.data) ? response.data : response.data?.departments || [];

    const translations = departments.map((dept) => {
      // Log translations to inspect structure
      const name = dept.translations?.[locale]?.name || dept.translations?.['en']?.name || "Unknown Department";
      const description = dept.translations?.[locale]?.description || dept.translations?.['en']?.description || "";

      return {
        id: dept.id,
        name: name,
        description: description,
        icon: dept.icon ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${dept.icon}` : "/default-department.png",
      };
    });

    return translations;  // Return the translated departments
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];  // Return empty array in case of error
  }
};







