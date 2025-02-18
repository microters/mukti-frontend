import CategoryClient from "./CategoryClient"; // Client Component for dynamic rendering

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// ✅ Function to fetch departments from the API (Runs on Server)
async function getDepartments() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const response = await fetch(`${BACKEND_URL}/api/department`, {
      headers: { "x-api-key": apiKey },
      cache: "no-store", // Ensures fresh data on every request
    });

    if (!response.ok) {
      throw new Error("Failed to fetch department data");
    }

    const data = await response.json();

    // Map data to add full URL for icons
    return data.map((department) => ({
      ...department,
      icon: department.icon
        ? `${BACKEND_URL}${department.icon}`
        : "/default-icon.png", // Fallback icon
    }));
  } catch (error) {
    console.error("Error fetching department data:", error);
    return [];
  }
}

// **Server Component: Fetch data and pass it to the Client Component**
export default async function Category() {
  const departments = await getDepartments();
  
  return <CategoryClient initialDepartments={departments} />;
}
