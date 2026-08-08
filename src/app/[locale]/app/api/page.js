import { apiFetch } from "@/app/lib/apiFetch";

export const fetchPageBySlug = (slug, language = "en") => {
  if (!slug) return null;
  return apiFetch(`api/page/slug/${slug}`, {
    tags: [`page-${slug}`],
    revalidate: 300,
    searchParams: { lang: language },
  }).catch(() => null);
};