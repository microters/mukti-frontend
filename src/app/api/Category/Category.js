import { fetchClient } from "../fetchClient";

export const getDepartments = async () => {
    const data = await fetchClient("/api/department"); // Fetch department data using fetchClient utility
    // console.log(data);
    
    if (!data) return []; // Handle errors or null data from fetchClient
    // Map data to add full URL for icons
    return data.map((department) => ({
      ...department,
      icon: department.icon
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${department.icon}`
        : "/default-icon.png", // Fallback icon
    }));
  };
  