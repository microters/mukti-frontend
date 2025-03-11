// // app/api/Reviews/Reviews.js

// import { fetchClient } from "../fetchClient";

// export const getReviews = async () => {
//   const data = await fetchClient("/api/reviews");
//   if (!data) return []; // Handle errors or null data from fetchClient
//   // Map data to add full URL for icons
//   return data.map((review) => ({
//     ...review,
//   }));
// };
// app/api/Reviews/Reviews.js

import { fetchClient } from "../fetchClient";  // Assuming fetchClient is defined elsewhere

export const getReviews = async () => {
  try {
    const data = await fetchClient("/api/reviews");
    if (!data) {
      console.error("No data received from the API");
      return []; // Return an empty array if data isn't fetched
    }
    return data.map((review) => ({
      ...review,  // You can modify the data if necessary
    }));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];  // Return an empty array in case of error
  }
};
