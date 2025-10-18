import { apiFetch } from "@/app/lib/apiFetch";

export const fetchDoctors = (language = "en") =>
  apiFetch("api/doctor", {
    tags: ["doctor"],
    revalidate: 300,
    searchParams: { lang: language },
  });

export const fetchDoctorBySlug = (slug, language = "en") => {
  if (!slug) return null;
  return apiFetch(`api/doctor/slug/${slug}`, {
    tags: [`doctor-${slug}`],
    revalidate: 300,
    searchParams: { lang: language },
  });
};
