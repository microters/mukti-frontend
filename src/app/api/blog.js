import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    "Content-Type": "application/json",
  },
  cache: "no-store"
});

// ✅ Fetch all doctors with language
export const fetchBlogs = async (language = 'en') => {
  try {
    const response = await apiClient.get(`/api/blogs?lang=${language}`);
    const blogs = Array.isArray(response.data) ? response.data : response.data?.blogs || [];
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

// ✅ Fetch a specific blogs by slug with language support
export const fetchBlogsBySlug = async (slug, language = 'en') => {
  try {
    if (!slug) {
      console.warn("⚠️ Missing slug parameter.");
      return null;
    }

    // Make the API call with the slug and language parameter
    const response = await apiClient.get(`/api/blogs/slug/${slug}?lang=${language}`);
    return response.data || null; // Return the blogs data if available
  } catch (error) {
    // Log the error message in case of failure
    console.error(`❌ Error fetching Blogs (${slug}):`, error.response?.data || error.message);
    return null; // Return null if an error occurs
  }
};
