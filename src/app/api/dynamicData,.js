// lib/api.js (ফাইলের একটি ভালো নাম)

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

/**
 * A helper function to fetch data from the API and handle errors.
 * It automatically disables caching for all requests.
 * @param {string} endpoint - The API endpoint to call (e.g., 'api/about?lang=en').
 * @returns {Promise<any>} - The JSON data from the API, or an empty array on error.
 */
const fetchData = async (endpoint) => {
  // 1. Construct the full URL for the API call
  const fullUrl = `${API_BASE_URL}${endpoint}`;

  // 2. Log the URL to the server console for debugging the 404 error
  console.log(`[API CALL] Attempting to fetch data from: ${fullUrl}`);

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      // 3. This option tells Next.js NOT to cache the response.
      // Every request will fetch fresh data from the server.
      cache: 'no-store',
    });

    // 4. Check if the request was successful
    if (!response.ok) {
      // If the status is 404, 500, etc., this will throw an error
      throw new Error(`API call failed for ${fullUrl} with status: ${response.status}`);
    }

    // 5. Parse the JSON data and return it
    return await response.json();

  } catch (error) {
    // 6. Log any errors that occur during the fetch process
    console.error(`[API ERROR] ${error.message}`);
    // Return a default value so the page doesn't crash
    return [];
  }
};

// --- API Functions ---

// Fetch Header Data
export const fetchHeaderData = async (language = 'en') => {
  return fetchData(`/api/header?lang=${language}`);
};

// Fetch Footer Data
export const fetchFooterData = async (language = 'en') => {
  return fetchData(`/api/footer?lang=${language}`);
};

// Fetch all dynamic home page data
export const fetchDynamicData = async (language = 'en') => {
  return fetchData(`/api/home?lang=${language}`);
};

// Fetch about page data
export const fetchAboutData = async (language = 'en') => {
  return fetchData(`api/about?lang=${language}`);
};