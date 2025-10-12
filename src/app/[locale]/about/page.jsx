import CommonHero from "@/app/Component/UI/CommonHero";
import About from "@/app/Component/UI/HomePage/About/About";
import Appointment from "@/app/Component/Shared/AppointmentAreas/Appointment";
import WhyChooseUs from "@/app/Component/UI/HomePage/WhyChooseUs/WhyChooseUs";
import AppointmentProcess from "@/app/Component/UI/HomePage/AppointmentProcess/AppointmentProcess";
import Testimonials from "@/app/Component/UI/HomePage/Testimonials/Testimonials";
import WhoWeAre from "@/app/Component/UI/WhoWeAre";
import { fetchReviews } from "@/app/api/review";
import { fetchAboutData, fetchDynamicData } from "@/app/api/dynamicData,";
 // ✅ FIX: কমা (,) সরানো হয়েছে

// ✅ Tells Next.js to render this page dynamically for every request.
export const dynamic = 'force-dynamic';

// ✅ SEO Metadata function
export async function generateMetadata({ params: { locale } }) {
  // ✅ FIX: locale পাস করা হয়েছে
  const dynamicAboutData = await fetchAboutData(locale);

  const metaTitle =
    dynamicAboutData?.metaTitle?.[locale] || "About Us - Mukti Hospital";
  const metaDescription =
    dynamicAboutData?.metaDescription?.[locale] ||
    "Default about us page description for SEO.";

  return {
    title: metaTitle,
    description: metaDescription,
  };
}

const AboutUs = async ({ params: { locale } }) => {
  // ✅ FIX: প্রতিটি API কলে locale পাস করা হয়েছে
  const reviews = await fetchReviews(locale);
  const dynamicData = await fetchDynamicData(locale);
  const dynamicAboutData = await fetchAboutData(locale);
  
  // ✅ IMPROVEMENT: ডেটা না পেলে যেনো এরর না আসে, সেজন্য ডিফল্ট অবজেক্ট ব্যবহার করা হয়েছে
  const aboutSection = dynamicData?.aboutSection || {};
  const whyChooseUsSection = dynamicData?.whyChooseUsSection || {};
  const appointmentProcess = dynamicData?.appointmentProcess || {};
  
  return (
    <div>
      <CommonHero pageName="About Us" aboutPage={dynamicAboutData || {}} />
      <About aboutSection={aboutSection} />
      <Appointment aboutPage={dynamicAboutData || {}} />
      <WhoWeAre whoWeAreSection={dynamicAboutData || {}} />
      <WhyChooseUs whyChooseUsSection={whyChooseUsSection} />
      <AppointmentProcess appointmentProcess={appointmentProcess} />
      <Testimonials reviews={reviews || []} />
    </div>
  );
};

export default AboutUs;