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

// Fetch Header Data
export const fetchHeaderData = async (language = 'en') => {
  try {
    const response = await apiClient.get(`api/header?lang=${language}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Fetch Footer Data
export const fetchFooterData = async (language = 'en') => {
  try {
    const response = await apiClient.get(`api/footer?lang=${language}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// ✅ Fetch all dynamic home page data
export const fetchDynamicData = async (language = 'en') => {
  try {
    const response = await apiClient.get(`api/home?lang=${language}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Fetch about page data
export const fetchAboutData = async (language = 'en') => {
  try {
    const response = await apiClient.get(`api/about?lang=${language}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};