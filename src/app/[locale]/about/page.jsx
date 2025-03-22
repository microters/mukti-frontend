
import CommonHero from "@/app/Component/UI/CommonHero";
import About from "@/app/Component/UI/HomePage/About/About";
import Appointment from "@/app/Component/Shared/AppointmentAreas/Appointment";
import WhyChooseUs from "@/app/Component/UI/HomePage/WhyChooseUs/WhyChooseUs";
import AppointmentProcess from "@/app/Component/UI/HomePage/AppointmentProcess/AppointmentProcess";
import Testimonials from "@/app/Component/UI/HomePage/Testimonials/Testimonials";
import WhoWeAre from "@/app/Component/UI/WhoWeAre";
import { fetchReviews } from "@/app/api/review";
import { fetchDynamicData } from "@/app/api/dynamicHome,";

const AboutUs = async () => {
    const reviews = await fetchReviews();
    const dynamicData = await fetchDynamicData();
    const aboutSection = dynamicData.aboutSection
    const whyChooseUsSection = dynamicData.whyChooseUsSection
    const appointmentProcess = dynamicData.appointmentProcess
  return (
    <div>
      <CommonHero pageName="About Us" />
      <About aboutSection={aboutSection}/>
      <Appointment />
      <WhoWeAre />
      <WhyChooseUs whyChooseUsSection={whyChooseUsSection}/>
      <AppointmentProcess appointmentProcess={appointmentProcess}/>
      <Testimonials reviews={reviews} />
    </div>
  );
};

export default AboutUs;
