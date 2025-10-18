// Blogs API (server-side helpers)
import { apiFetch } from "@/app/lib/apiFetch";

export const fetchBlogs = (language = "en") =>
  apiFetch("api/blogs", {
    tags: ["blogs"],
    revalidate: 300,
    searchParams: { lang: language },
  });

export const fetchBlogsBySlug = (slug, language = "en") => {
  if (!slug) return null;
  return apiFetch(`api/blogs/slug/${slug}`, {
    tags: [`blog-${slug}`],
    revalidate: 300,
    searchParams: { lang: language },
  });
};
