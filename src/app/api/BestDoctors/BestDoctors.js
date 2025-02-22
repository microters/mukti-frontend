// app/api/BestDoctors/BestDoctors.js
import { fetchClient } from "../fetchClient";

export const getDoctorsData = async () => {
  const data = await fetchClient("/api/doctor");
  if (!data) return { doctors: [], departments: [] }; // Handle errors or null data

  // Extract unique departments dynamically
  const uniqueDepartments = [
    ...new Set(data.map((doctor) => doctor?.translations?.en?.department || "Unknown")),
  ];

  // Return structured data (doctors and unique departments)
  return { doctors: data, departments: uniqueDepartments };
};