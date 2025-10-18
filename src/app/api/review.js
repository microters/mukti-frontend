import { apiFetch } from "@/app/lib/apiFetch";

export const fetchReviews = (language = "en") =>
  apiFetch("api/reviews", {
    tags: ["reviews"],
    revalidate: 600,
    searchParams: { lang: language },
  });
