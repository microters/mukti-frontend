const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// ✅ ট্যাগ গ্রহণ করার জন্য ফাংশনটি আপডেট করা হয়েছে
const fetchData = async (endpoint, tags = []) => {
  const fullUrl = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      // ✅ FIX: 'cache: no-store' এর পরিবর্তে ট্যাগ ব্যবহার করা হচ্ছে
      next: {
        tags: tags, // gelen tag'leri burada kullan
      },
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`[API ERROR] Fetching ${fullUrl} failed:`, error.message);
    return null;
  }
};

// --- API Functions with Tags ---

// Header এবং Footer এর ডেটা 'layout' ট্যাগের অধীনে থাকবে
export const fetchHeaderData = async (language = 'en') => {
  return fetchData(`api/header?lang=${language}`, ['layout']); // ✅ ট্যাগ যোগ করা হয়েছে
};

export const fetchFooterData = async (language = 'en') => {
  return fetchData(`api/footer?lang=${language}`, ['layout']); // ✅ ট্যাগ যোগ করা হয়েছে
};

// About পেজের ডেটা 'about' ট্যাগের অধীনে থাকবে
export const fetchAboutData = async (language = 'en') => {
  return fetchData(`api/about?lang=${language}`, ['about']); // ✅ ট্যাগ যোগ করা হয়েছে
};

// Home পেজের ডেটা 'home' ট্যাগের অধীনে থাকবে
export const fetchDynamicData = async (language = 'en') => {
  return fetchData(`api/home?lang=${language}`, ['home']); // ✅ ট্যাগ যোগ করা হয়েছে
};