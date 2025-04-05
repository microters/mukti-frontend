import { fetchDoctorBySlug } from "@/app/api/doctor";
import SingleDoctorInfo from "@/app/Component/SingleDoctor/SingleDoctorInfo";
import { notFound } from "next/navigation";
import { headers } from "next/headers"; // ✅ CORRECT import

// ✅ Dynamic Metadata based on doctor + locale
export async function generateMetadata({ params }) {
  const { slug, locale } = params;

  const doctor = await fetchDoctorBySlug(slug, locale);
  if (!doctor) return {};

  const translations = doctor.translations?.[locale] || doctor.translations?.["en"] || {};
  console.log("locale:", locale);
  console.log("doctor.translations:", doctor.translations);
  console.log("fallback to:", doctor.translations?.[locale] || doctor.translations?.["en"]);
  

  const headersList = headers(); // ✅ This works now
  const host =
    headersList.get("x-forwarded-host") || headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const pageUrl = `${baseUrl}/${locale}/doctor/${slug}`;
  const ogImage = doctor.icon
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${doctor.icon}`
    : `${baseUrl}/default-og-image.jpg`;

  const metaTitle =  doctor.translations.metaTitle || "Doctor";
  const metaDescription = doctor.translations.metaDescription || "";


  return {
    title: `${metaTitle} | Mukti Hospital`,
    description: metaDescription,
    keywords: [metaTitle, "doctor", "Mukti Hospital", "healthcare"],
    authors: [{ name: "Mukti Hospital", url: baseUrl }],
    creator: "Mukti Hospital",
    publisher: "Mukti Hospital",
    robots: "index, follow",
    openGraph: {
      title: `${metaTitle} | Mukti Hospital`,
      description: metaDescription,
      url: pageUrl,
      siteName: "Mukti Hospital",
      type: "profile",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${metaTitle} - Doctor at Mukti Hospital`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${metaTitle} | Mukti Hospital`,
      description: metaDescription,
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
  const { slug, locale } = params;

  if (!slug) return notFound();

  const doctor = await fetchDoctorBySlug(slug, locale);
  if (!doctor) return notFound();

  return (
    <div>
      <SingleDoctorInfo key={doctor.id} doctor={doctor} currentLang={locale} />
    </div>
  );
}
