import { headers } from "next/headers";
import DoctorsList from "@/app/Component/Doctors/DoctorsList";
import HeroInnerPage from "@/app/Component/UI/HeroInnerPage";
import { fetchDoctors } from "@/app/api/doctor";
import { fetchPageBySlug } from "@/app/api/cmsPage";

// Fallback meta (used until the "appointment" page is set from the dashboard)
const DEFAULT_META = {
  en: {
    metaTitle: "Book an Appointment | Mukti Hospital, Cumilla",
    metaDescription:
      "Book an appointment with expert doctors at Mukti Hospital, Cumilla. Browse specialists by department, view schedules & fees, and confirm your slot online.",
  },
  bn: {
    metaTitle: "অ্যাপয়েন্টমেন্ট নিন | মুক্তি হসপিটাল, কুমিল্লা",
    metaDescription:
      "মুক্তি হসপিটাল, কুমিল্লার বিশেষজ্ঞ ডাক্তারদের অ্যাপয়েন্টমেন্ট নিন। বিভাগ অনুযায়ী ডাক্তার, সময়সূচি ও ফি দেখে অনলাইনেই সিরিয়াল নিশ্চিত করুন।",
  },
};

// Dashboard-controlled meta with hardcoded fallback
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale = "en" } = resolvedParams;
  const fallback = DEFAULT_META[locale] || DEFAULT_META.en;

  const page = await fetchPageBySlug("appointment", locale);
  const t = page?.translations?.[locale] || page?.translations?.en || {};

  const title = (t.metaTitle && t.metaTitle.trim()) || fallback.metaTitle;
  const description = (t.metaDescription && t.metaDescription.trim()) || fallback.metaDescription;

  return {
    title,
    description,
    keywords: "appointment, doctors, Mukti Hospital, Cumilla, healthcare, specialists",
    robots: "index, follow",
    openGraph: { title, description, siteName: "Mukti Hospital" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const revalidate = 3600; // Revalidate every hour (optional, for static generation)

export default async function DoctorPage() {
  const doctors = await fetchDoctors(); // Fetch on the server before rendering

  // Get headers to construct the current URL dynamically
  const headerList = await headers();
  const host = headerList.get("host"); // e.g., "www.muktihospital.com" or "localhost:3000"
  const protocol = headerList.get("x-forwarded-proto") || "http"; // "http" or "https"
  const siteUrl = `${protocol}://${host}/doctors`; // Construct full URL, e.g., "https://www.muktihospital.com/doctors"

  // Define Open Graph and Twitter Card metadata dynamically based on content
  const ogImage = `${protocol}://${host}/og-image-doctors.jpg`; // Dynamic image URL based on host

  if (!doctors || doctors.length === 0) {
    return (
      <>
        <head>
          <meta charSet="UTF-8" />
          <meta name="title" content="Our Doctors - Mukti Hospital" />
          <meta name="description" content="No doctors found at Mukti Hospital. Check back later for updates." />
          <meta name="keywords" content="doctors, Mukti Hospital, healthcare" />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          {/* Open Graph Meta Tags */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={siteUrl} />
          <meta property="og:title" content="Our Doctors - Mukti Hospital" />
          <meta property="og:description" content="No doctors found at Mukti Hospital. Check back later for updates." />
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:alt" content="Mukti Hospital Doctors" />
          <meta property="og:site_name" content="Mukti Hospital" />
          <meta property="og:locale" content="en_US" />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content={siteUrl} />
          <meta name="twitter:title" content="Our Doctors - Mukti Hospital" />
          <meta name="twitter:description" content="No doctors found at Mukti Hospital. Check back later for updates." />
          <meta name="twitter:image" content={ogImage} />
          <meta name="twitter:image:alt" content="Mukti Hospital Doctors" />
          {/* Replace with your Twitter handle if applicable */}
          <meta name="twitter:site" content="@MuktiHospital" />
        </head>
        <div>
          <HeroInnerPage />
          <div className="container py-24">
            <h1 className="text-3xl font-bold">Doctors List</h1>
            <p className="text-red-500">No doctors found.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="title" content="Our Doctors - Mukti Hospital" />
        <meta name="description" content="Meet the expert doctors at Mukti Hospital. Browse our list of specialists providing top-quality healthcare services." />
        <meta name="keywords" content="doctors, Mukti Hospital, healthcare, specialists, medical professionals" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="Our Doctors - Mukti Hospital" />
        <meta property="og:description" content="Meet the expert doctors at Mukti Hospital. Browse our list of specialists providing top-quality healthcare services." />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Mukti Hospital Doctors" />
        <meta property="og:site_name" content="Mukti Hospital" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content="Our Doctors - Mukti Hospital" />
        <meta name="twitter:description" content="Meet the expert doctors at Mukti Hospital. Browse our list of specialists providing top-quality healthcare services." />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="Mukti Hospital Doctors" />
        {/* Replace with your Twitter handle if applicable */}
        <meta name="twitter:site" content="@MuktiHospital" />
      </head>
      <div>
        <HeroInnerPage />
        {/* Pass doctors data to client component */}
        <DoctorsList doctors={doctors} />
      </div>
    </>
  );
}