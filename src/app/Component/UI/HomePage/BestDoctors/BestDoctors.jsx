// **Server Component (fetches data on the server)**

import BestDoctorsClient from "./BestDoctorsClient";


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// **Server-side function to fetch doctors (Allowed in Server Components)**
const fetchDoctorsData = async () => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const response = await fetch(`${BACKEND_URL}/api/doctor`, {
      headers: { "x-api-key": apiKey },
      cache: "no-store", // Ensures fresh data
    });

    if (!response.ok) {
      throw new Error("Failed to fetch doctors data");
    }

    const data = await response.json();

    // Extract unique departments dynamically
    const uniqueDepartments = [...new Set(data.map((doctor) => doctor?.translations?.en?.department || "Unknown"))];

    return { doctors: data, departments: uniqueDepartments };
  } catch (error) {
    console.error("Error fetching doctors data:", error);
    return { doctors: [], departments: [] };
  }
};

// **Server Component - Fetches data before passing it to Client Component**
const BestDoctors = async () => {
  const { doctors, departments } = await fetchDoctorsData();
  
  return <BestDoctorsClient doctors={doctors} departments={departments} />;
};

export default BestDoctors;