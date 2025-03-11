// app/api/Reviews/Reviews.js

import { fetchClient } from "../fetchClient";  // Assuming fetchClient is defined elsewhere

export const getReviews = async () => {
  try {
    const response = await fetchClient("/api/reviews");
    if (!response) {
      console.error("No response from API");
      return [];  // Return an empty array if no data is received
    }

    const data = await response.json();  // Parse the JSON data
    return data;  // Return the fetched data
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];  // Return an empty array in case of an error
  }
};
