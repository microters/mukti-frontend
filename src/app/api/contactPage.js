import { apiFetch } from "@/app/lib/apiFetch";

export const fetchContactPage = () =>
  apiFetch("api/contact-page", {
    tags: ["contact-page"],
    revalidate: 300,
  }).catch(() => ({ translations: {} }));