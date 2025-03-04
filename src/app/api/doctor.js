import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    "Content-Type": "application/json",
  },
});

// ✅ Fetch all doctors
export const fetchDoctors = async () => {
  try {
    const response = await apiClient.get("/api/doctor");
    
    console.log("Raw API Response:", response.data);

    const doctors = Array.isArray(response.data) ? response.data : response.data?.doctors || [];

    return doctors;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};


// ✅ Fetch a specific doctor by slug
export const fetchDoctorBySlug = async (slug) => {
  try {
    const response = await apiClient.get(`/api/doctor/${slug}`);
    return response.data || null;
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return null;
  }
};

// ✅ Create a new doctor
// export const createDoctor = async (doctorData) => {
//   try {
//     const response = await apiClient.post("/api/doctor", doctorData);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating doctor:", error);
//     return null;
//   }
// };

// // ✅ Update a doctor by ID
// export const updateDoctor = async (id, doctorData) => {
//   try {
//     const response = await apiClient.put(`/api/doctor/${id}`, doctorData);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating doctor:", error);
//     return null;
//   }
// };

// // ✅ Delete a doctor by ID
// export const deleteDoctor = async (id) => {
//   try {
//     await apiClient.delete(`/api/doctor/${id}`);
//     return true;
//   } catch (error) {
//     console.error("Error deleting doctor:", error);
//     return false;
//   }
// };
