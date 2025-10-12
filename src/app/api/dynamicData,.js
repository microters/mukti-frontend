// ✅ Correct and robust data fetching logic for a Next.js App Router project.

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

/**
 * A centralized helper function to fetch data from the API.
 * It handles URL construction, headers, caching, and errors.
 * @param {string} endpoint - The API endpoint to call (e.g., 'api/about?lang=en').
 * @param {object} options - Optional parameters.
 * @param {any} options.defaultReturnValue - The value to return on error.
 * @returns {Promise<any>} The JSON data or the default return value on error.
 */
const fetchData = async (endpoint, { defaultReturnValue = null } = {}) => {
  // 1. FIX: Ensures the URL is always correctly formed with a single slash.
  const fullUrl = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  console.log(`[API CALL] Attempting to fetch data from: ${fullUrl}`);

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      // 2. FIX: Correctly disables caching for real-time updates.
      // This also makes the pages that use it dynamic.
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API call failed for ${fullUrl} with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;

  } catch (error) {
    console.error(`[API ERROR] Fetching ${fullUrl} failed:`, error.message);
    // 3. FIX: Returns a safe default value to prevent app crashes.
    return defaultReturnValue;
  }
};

// --- General API Functions ---

export const fetchHeaderData = async (language = 'en') => {
  return fetchData(`api/header?lang=${language}`, { defaultReturnValue: {} });
};

export const fetchFooterData = async (language = 'en') => {
  return fetchData(`api/footer?lang=${language}`, { defaultReturnValue: {} });
};

// --- Page Specific Functions ---

export const fetchDynamicData = async (language = 'en') => {
  return fetchData(`api/home?lang=${language}`, { defaultReturnValue: {} });
};

export const fetchAboutData = async (language = 'en') => {
  return fetchData(`api/about?lang=${language}`, { defaultReturnValue: {} });
};

export const fetchReviews = async (language = 'en') => {
    return fetchData(`api/review?lang=${language}`, { defaultReturnValue: [] });
};

// --- Department Functions ---

/**
 * Fetches all departments.
 * @param {string} language - The locale code (e.g., 'en', 'bn').
 * @returns {Promise<Array>} An array of departments.
 */
export const fetchDepartments = async (language = 'en') => {
  const data = await fetchData(`api/department?lang=${language}`, { defaultReturnValue: [] });
  // Ensure the final return value is always an array to prevent .map() errors.
  return Array.isArray(data) ? data : data?.departments || [];
};

/**
 * Fetches a single department by its slug.
 * @param {string} slug - The department's slug.
 * @param {string} language - The locale code.
 * @returns {Promise<Object|null>} The department object or null if not found.
 */
export const fetchDepartmentBySlug = async (slug, language = 'en') => {
  if (!slug) {
    console.warn("⚠️ fetchDepartmentBySlug: Missing slug parameter.");
    return null;
  }
  return fetchData(`api/department/slug/${slug}?lang=${language}`, { defaultReturnValue: null });
};