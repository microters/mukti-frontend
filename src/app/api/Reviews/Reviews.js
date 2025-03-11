// app/api/Reviews/Reviews.js

import { fetchClient } from "../fetchClient";

export const getReviews = async () => {
  const data = await fetchClient("/api/reviews");
  if (!data) return []; // Handle errors or null data from fetchClient
  // Map data to add full URL for icons
  return data.map((review) => ({
    ...review,
  }));
};
