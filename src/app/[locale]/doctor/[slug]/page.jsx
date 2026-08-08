import { fetchDoctorBySlug } from "@/app/api/doctor";
import SingleDoctorInfo from "@/app/Component/SingleDoctor/SingleDoctorInfo";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

// ✅ Dynamic Metadata based on doctor + locale
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;

  const doctor = await fetchDoctorBySlug(slug, locale);
  if (!doctor) return {};

  const translations = doctor.translations?.[locale] || doctor.translations?.["en"] || {};
  

  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") || headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const pageUrl = `${baseUrl}/${locale}/doctor/${slug}`;
  const ogImage = doctor.icon
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${doctor.icon}`
    : `${baseUrl}/default-og-image.jpg`;

  const t = doctor.translations || {};
  const name = (t.name || "").trim();
  const specialist = (t.designation || t.department || "").trim();
  const years = t.yearsOfExperience ? String(t.yearsOfExperience).trim() : "";

  const pageTitle =
    t.metaTitle && t.metaTitle.trim()
      ? t.metaTitle.trim()
      : [name, specialist, "Mukti Hospital"].filter(Boolean).join(" | ");

  // Description: use admin-set metaDescription; otherwise auto-generate per doctor
  let pageDescription = (t.metaDescription && t.metaDescription.trim()) || "";
  if (!pageDescription) {
    if (locale === "bn") {
      pageDescription = `মুক্তি হসপিটাল, কুমিল্লায় ${name}${specialist ? ` (${specialist})` : ""}-এর অ্যাপয়েন্টমেন্ট নিন।${years ? ` অভিজ্ঞতা ${years}+ বছর।` : ""} সময়সূচি, ফি ও বিস্তারিত দেখুন।`;
    } else {
      pageDescription = `Book an appointment with ${name}${specialist ? `, ${specialist}` : ""} at Mukti Hospital, Cumilla.${years ? ` ${years}+ years of experience.` : ""} View schedule, fees & details.`;
    }
  }
  // Keep description within a safe SEO length (~160 chars)
  if (pageDescription.length > 160) {
    pageDescription = pageDescription.slice(0, 157).trimEnd() + "…";
  }

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [name, specialist, "doctor", "Mukti Hospital", "Cumilla", "healthcare"].filter(Boolean),
    authors: [{ name: "Mukti Hospital", url: baseUrl }],
    creator: "Mukti Hospital",
    publisher: "Mukti Hospital",
    robots: "index, follow",
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: "Mukti Hospital",
      type: "profile",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${name || "Doctor"} - Mukti Hospital`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      site: "@MuktiHospital",
      creator: "@MuktiHospital",
      images: [ogImage],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

// ✅ Main Page Component
export default async function SingleDoctorPage({ params }) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;

  if (!slug) return notFound();

  const doctor = await fetchDoctorBySlug(slug, locale);
  if (!doctor) return notFound();

  return (
    <div>
      <SingleDoctorInfo key={doctor.id} doctor={doctor} currentLang={locale} />
    </div>
  );
}
