import { apiFetch } from "@/app/lib/apiFetch";

export const fetchPathologyTests = () =>
  apiFetch("api/pathology", {
    tags: ["pathology-tests"],
    revalidate: 300,
  }).catch(() => []);

export const fetchPathologyCategories = () =>
  apiFetch("api/pathology-category", {
    tags: ["pathology-categories"],
    revalidate: 300,
  }).catch(() => ({ categories: [] }));


export const fetchDiagnosticHero = () =>
  apiFetch("api/diagnostic-page", {
    tags: ["diagnostic-hero"],
    revalidate: 300,
  }).catch(() => ({ translations: {} }));