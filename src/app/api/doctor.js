// import axios from "axios";

// const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
//     "Content-Type": "application/json",
//   },
//   cache: "no-store"
// });

// // ✅ Fetch all doctors with language
// export const fetchDoctors = async (language = 'en') => {
//   try {
//     const response = await apiClient.get(`/api/doctor?lang=${language}`);
//     const doctors = Array.isArray(response.data) ? response.data : response.data?.doctors || [];
//     return doctors;
//   } catch (error) {
//     console.error("Error fetching doctors:", error);
//     return [];
//   }
// };



// // ✅ Fetch a specific doctor by slug with language support
// export const fetchDoctorBySlug = async (slug, language = 'en') => {
//   try {
//     if (!slug) {
//       console.warn("⚠️ Missing slug parameter.");
//       return null;
//     }

//     // Make the API call with the slug and language parameter
//     const response = await apiClient.get(`/api/doctor/slug/${slug}?lang=${language}`);
//     console.log(response.data);
    
//     return response.data || null; // Return the doctor data if available
//   } catch (error) {
//     // Log the error message in case of failure
//     console.error(`❌ Error fetching doctor (${slug}):`, error.response?.data || error.message);
//     return null; // Return null if an error occurs
//   }
// };



// // ✅ Create a new doctor
// // export const createDoctor = async (doctorData) => {
// //   try {
// //     const response = await apiClient.post("/api/doctor", doctorData);
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error creating doctor:", error);
// //     return null;
// //   }
// // };

// // // ✅ Update a doctor by ID
// // export const updateDoctor = async (id, doctorData) => {
// //   try {
// //     const response = await apiClient.put(`/api/doctor/${id}`, doctorData);
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error updating doctor:", error);
// //     return null;
// //   }
// // };

// // // ✅ Delete a doctor by ID
// // export const deleteDoctor = async (id) => {
// //   try {
// //     await apiClient.delete(`/api/doctor/${id}`);
// //     return true;
// //   } catch (error) {
// //     console.error("Error deleting doctor:", error);
// //     return false;
// //   }
// // };
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    "Content-Type": "application/json",
  }
});

// ✅ Fetch all doctors with language
export const fetchDoctors = async (language = 'en') => {
  try {
    const response = await apiClient.get(`/api/doctor?lang=${language}`, {
      cache: "no-store"
    });
    const doctors = Array.isArray(response.data) ? response.data : response.data?.doctors || [];
    return doctors;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};

// ✅ Fetch a specific doctor by slug with language support
// fetchDoctorBySlug ফাংশনে অতিরিক্ত হ্যান্ডলিং যোগ করুন
export const fetchDoctorBySlug = async (slug, language = 'bn') => {
  try {
    if (!slug) {
      console.warn("⚠️ Missing slug parameter.");
      return null;
    }
    
    console.log(`🔍 Fetching doctor with slug: ${slug}, language: ${language}`);
    
    const response = await apiClient.get(`/api/doctor/slug/${slug}?lang=${language}`, {
      cache: "no-store"
    });
    
    if (!response.data) {
      console.warn(`⚠️ No data returned for doctor ${slug}`);
      return null;
    }

    // Handle the case where translations might be a JSON string
    if (response.data.translations && typeof response.data.translations === 'string') {
      try {
        response.data.translations = JSON.parse(response.data.translations);
      } catch (error) {
        console.error("Error parsing translations:", error);
      }
    }
    
    console.log(`✅ API Response for ${slug} with lang=${language}:`, response.data);
    
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching doctor (${slug}):`, error.response?.data || error.message);
    return null;
  }
};