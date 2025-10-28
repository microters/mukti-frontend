import { headers } from "next/headers"; // Import headers from next/headers
import DoctorsList from "@/app/Component/Doctors/DoctorsList";
import HeroInnerPage from "@/app/Component/UI/HeroInnerPage";
import { fetchDoctors } from "@/app/api/doctor";

export const metadata = {
  title: "Our Doctors - Mukti Hospital",
  description: "Meet the expert doctors at Mukti Hospital. Browse our list of specialists providing top-quality healthcare services.",
  keywords: "doctors, Mukti Hospital, healthcare, specialists, medical professionals",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
};

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