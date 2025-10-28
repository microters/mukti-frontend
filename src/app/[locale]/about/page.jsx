import CommonHero from "@/app/Component/UI/CommonHero";
import About from "@/app/Component/UI/HomePage/About/About";
import Appointment from "@/app/Component/Shared/AppointmentAreas/Appointment";
import WhyChooseUs from "@/app/Component/UI/HomePage/WhyChooseUs/WhyChooseUs";
import AppointmentProcess from "@/app/Component/UI/HomePage/AppointmentProcess/AppointmentProcess";
import Testimonials from "@/app/Component/UI/HomePage/Testimonials/Testimonials";
import WhoWeAre from "@/app/Component/UI/WhoWeAre";
import { fetchReviews } from "@/app/api/review";
import { fetchAboutData, fetchDynamicData } from "@/app/api/dynamicData,";


// ✅ Instead of force-dynamic, use cache-based revalidation
export const revalidate = 300; // 5 min cache

// Shared data loader (avoid double API calls)
async function getAboutPageData(locale) {
  const [reviews, dynamicData, aboutData] = await Promise.all([
    fetchReviews(locale),
    fetchDynamicData(locale),
    fetchAboutData(locale),
  ]);

  return { reviews, dynamicData, aboutData };
}

// ✅ SEO metadata
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale = "en" } = resolvedParams;
  const aboutData = await fetchAboutData(locale);
  return {
    title: aboutData?.metaTitle?.[locale] || "About Us - Mukti Hospital",
    description:
      aboutData?.metaDescription?.[locale] ||
      "Default about us page description for SEO.",
  };
}

// ✅ Server Component
export default async function AboutUs({ params }) {
  const resolvedParams = await params;
  const { locale = "en" } = resolvedParams;
  const { reviews, dynamicData, aboutData } = await getAboutPageData(locale);

  const aboutSection = dynamicData?.aboutSection || {};
  const whyChooseUsSection = dynamicData?.whyChooseUsSection || {};
  const appointmentProcess = dynamicData?.appointmentProcess || {};

  return (
    <div>
      <CommonHero pageName="About Us" aboutPage={aboutData} />
      <About aboutSection={aboutSection} />
      <Appointment aboutPage={aboutData} />
      <WhoWeAre whoWeAreSection={aboutData} />
      <WhyChooseUs whyChooseUsSection={whyChooseUsSection} />
      <AppointmentProcess appointmentProcess={appointmentProcess} />
      <Testimonials reviews={reviews || []} />
    </div>
  );
}
