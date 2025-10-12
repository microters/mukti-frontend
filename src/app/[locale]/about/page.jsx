import CommonHero from "@/app/Component/UI/CommonHero";
import About from "@/app/Component/UI/HomePage/About/About";
import Appointment from "@/app/Component/Shared/AppointmentAreas/Appointment";
import WhyChooseUs from "@/app/Component/UI/HomePage/WhyChooseUs/WhyChooseUs";
import AppointmentProcess from "@/app/Component/UI/HomePage/AppointmentProcess/AppointmentProcess";
import Testimonials from "@/app/Component/UI/HomePage/Testimonials/Testimonials";
import WhoWeAre from "@/app/Component/UI/WhoWeAre";
import { fetchReviews } from "@/app/api/review";
import { fetchAboutData, fetchDynamicData } from "@/app/api/dynamicData,";


export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }) {
  const dynamicAboutData = await fetchAboutData(locale);
  const metaTitle = dynamicAboutData?.metaTitle?.[locale] || "About Us - Mukti Hospital";
  const metaDescription = dynamicAboutData?.metaDescription?.[locale] || "Default about us page description for SEO.";

  return {
    title: metaTitle,
    description: metaDescription,
  };
}

const AboutUs = async ({ params: { locale } }) => {
  const reviews = await fetchReviews(locale);
  const dynamicData = await fetchDynamicData(locale);
  const dynamicAboutData = await fetchAboutData(locale);
  
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