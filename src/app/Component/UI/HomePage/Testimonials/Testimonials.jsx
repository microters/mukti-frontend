// Review.js (Server Component to fetch reviews)

import TestimonialsClient from "./TestimonialsClient";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// ✅ Function to fetch reviews from the API (Runs on Server)
async function getReviews() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/reviews`, {
      headers: { "x-api-key": apiKey },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch review data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching review data:", error);
    return [];
  }
}

// **Server Component: Fetch data and pass it to the Client Component**
export default async function Reviews() {
  const reviews = await getReviews();

  return <TestimonialsClient initialReviews={reviews} />;
}
