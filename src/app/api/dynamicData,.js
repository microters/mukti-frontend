import { apiFetch } from "@/app/lib/apiFetch";

// Layout-level
export const fetchHeaderData = async (language = "en") => {
  if (typeof language === "object") language = language?.locale || "en"; // ✅ fix object issue
  return apiFetch("api/header", {
    tags: ["layout-header"],
    revalidate: 600,
    searchParams: { lang: language },
  });
};

export const fetchFooterData = async (language = "en") => {
  if (typeof language === "object") language = language?.locale || "en"; // ✅ fix object issue
  return apiFetch("api/footer", {
    tags: ["layout-footer"],
    revalidate: 600,
    searchParams: { lang: language },
  });
};

// About page sections
export const fetchAboutData = (language = "en") =>
  apiFetch("api/about", {
    tags: ["about"],
    revalidate: 600,
    searchParams: { lang: language },
  });

// Home page sections
export const fetchDynamicData = (language = "en") =>
  apiFetch("api/home", {
    tags: ["home"],
    revalidate: 300,
    searchParams: { lang: language },
  });
