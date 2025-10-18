import { apiFetch } from "@/app/lib/apiFetch";

export const fetchDepartments = (language = "en") =>
  apiFetch("api/department", {
    tags: ["department"],
    revalidate: 300,
    searchParams: { lang: language },
  });

export const fetchDepartmentBySlug = (slug, language = "en") => {
  if (!slug) return null;
  return apiFetch(`api/department/slug/${slug}`, {
    tags: [`department-${slug}`],
    revalidate: 300,
    searchParams: { lang: language },
  });
};
