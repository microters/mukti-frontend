import { fetchDepartmentBySlug } from '@/app/api/department';
import { fetchDoctors } from '@/app/api/doctor';
import SingleTreatment from '@/app/Component/SingleDepartment/SingleDepartment';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

// ✅ SEO Metadata Setup
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;

  const department = await fetchDepartmentBySlug(slug);
  if (!department) return {};

  const t = department.translations?.[locale] || department.translations?.["en"] || {};
  const deptName = (t.name || t.title || "").trim();

  // Title: admin-set metaTitle as-is; otherwise "Department name | Mukti Hospital"
  const TITLE_MAX = 60;
  const buildFallbackTitle = () => {
    const full = [deptName, "Mukti Hospital"].filter(Boolean).join(" | ");
    if (full.length <= TITLE_MAX) return full;
    return full.slice(0, TITLE_MAX - 1).trimEnd() + "…";
  };
  const pageTitle =
    t.metaTitle && t.metaTitle.trim() ? t.metaTitle.trim() : buildFallbackTitle();

  // Description: admin-set metaDescription; otherwise auto-generate per department
  let pageDescription = (t.metaDescription && t.metaDescription.trim()) || "";
  if (!pageDescription) {
    if (locale === "bn") {
      pageDescription = `মুক্তি হসপিটাল, কুমিল্লার ${deptName} বিভাগ। অভিজ্ঞ বিশেষজ্ঞ ডাক্তার, আধুনিক চিকিৎসা ও পরীক্ষার সুবিধা। অনলাইনে অ্যাপয়েন্টমেন্ট নিন অথবা কল করুন।`;
    } else {
      pageDescription = `${deptName} department at Mukti Hospital, Cumilla. Consult experienced specialist doctors with modern diagnosis & treatment. Book an appointment online or call now.`;
    }
  }
  if (pageDescription.length > 160) {
    pageDescription = pageDescription.slice(0, 157).trimEnd() + "…";
  }

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [deptName, "department", "Mukti Hospital", "Cumilla", "healthcare"].filter(Boolean),
    robots: "index, follow",
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      siteName: "Mukti Hospital",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

// ✅ Actual Page Render
export default async function DepartmentPage({ params }) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;

  const department = await fetchDepartmentBySlug(slug);
  const doctors = await fetchDoctors();

  if (!department) return notFound();

  return (
    <div>
      <SingleTreatment
        key={department.id}
        department={department}
        doctors={doctors}
      />
    </div>
  );
}
