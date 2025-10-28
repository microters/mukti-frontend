import { headers } from "next/headers";
import DoctorsList from "@/app/Component/Doctors/DoctorsList";
import HeroInnerPage from "@/app/Component/UI/HeroInnerPage";
import { fetchDoctors } from "@/app/api/doctor";

// 🌐 Dictionary based on locale
const dict = {
  en: {
    title: "Our Doctors - Meet the Experts | Mukti Hospital",
    description: "Browse our list of qualified medical professionals. Meet our expert doctors ready to provide you with top-notch healthcare services.",
    ogTitle: "Our Doctors - Mukti Hospital",
    ogDescription: "Meet our expert doctors and specialists providing top-notch healthcare.",
    twitterDescription: "Meet the expert medical team at Mukti Hospital.",
    noDoctorsTitle: "Doctors List",
    noDoctorsMsg: "No doctors found.",
  },
  bn: {
    title: "আমাদের ডাক্তারগণ - বিশেষজ্ঞদের সাথে পরিচিত হোন | মুক্তি হাসপাতাল",
    description: "আমাদের প্রয়োজনীয় ও অভিজ্ঞ ডাক্তারদের তালিকা দেখুন। তারা প্রস্তুত আপনাকে সর্বোত্তম চিকিৎসা সেবা দিতে।",
    ogTitle: "আমাদের ডাক্তারগণ - মুক্তি হাসপাতাল",
    ogDescription: "আমাদের বিশেষজ্ঞ ডাক্তার এবং চিকিৎসা দলকে চিনুন যারা দিচ্ছে সর্বোচ্চ মানের সেবা।",
    twitterDescription: "মুক্তি হাসপাতালের অভিজ্ঞ চিকিৎসা দলের সাথে পরিচিত হোন।",
    noDoctorsTitle: "ডাক্তারদের তালিকা",
    noDoctorsMsg: "কোনো ডাক্তার পাওয়া যায়নি।",
  },
};

// ✅ i18n-friendly Metadata with dynamic URL
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || "en";
  const content = dict[locale] || dict.en;

  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") || headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const pageUrl = `${baseUrl}/${locale}/doctor`;

  return {
    title: content.title,
    description: content.description,
    keywords: ["doctors", "medical experts", "healthcare", "clinic", "specialists", "healthcare providers"],
    authors: [{ name: "Mukti Hospital", url: baseUrl }],
    creator: "Mukti Hospital",
    publisher: "Mukti Hospital",
    robots: "index, follow",
    openGraph: {
      title: content.ogTitle,
      description: content.ogDescription,
      url: pageUrl,
      siteName: "Mukti Hospital",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Mukti Hospital Doctors",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.ogTitle,
      description: content.twitterDescription,
      site: "@MuktiHospital",
      creator: "@MuktiHospital",
      images: [`${baseUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

// ✅ Main page component
export default async function DoctorPage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || "en";
  const content = dict[locale] || dict.en;

  const doctors = await fetchDoctors();

  if (!doctors || doctors.length === 0) {
    return (
      <div>
        <HeroInnerPage />
        <div className="container py-24">
          <h1 className="text-3xl font-bold">{content.noDoctorsTitle}</h1>
          <p className="text-red-500">{content.noDoctorsMsg}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroInnerPage />
      <DoctorsList doctors={doctors} />
    </div>
  );
}
