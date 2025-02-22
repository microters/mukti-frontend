
import { fetchClient } from "../fetchClient";

export const getDoctorsData = async () => {
  const data = await fetchClient("/api/doctor");
  if (!data || data.length === 0) return { doctors: [], departments: [] };
  
  // Extract unique departments dynamically
  const uniqueDepartments = [
    ...new Set(data.map((doctor) => doctor?.translations?.en?.department || "Unknown")),
  ];

  // Map over the doctors' data to handle profile photos (or icons)
  const updatedDoctors = data.map((doctor) => ({
    ...doctor,
    icon: doctor.icon
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${doctor.icon}`  // Add full URL if profile photo exists
      : "/default-profile-photo.png", 
  }));

  // Return structured data (doctors and unique departments)
  return { doctors: updatedDoctors, departments: uniqueDepartments };
};
