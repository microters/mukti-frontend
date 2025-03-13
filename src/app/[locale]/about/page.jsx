
import CommonHero from "@/app/Component/UI/CommonHero";
import About from "@/app/Component/UI/HomePage/About/About";
import Appointment from "@/app/Component/Shared/AppointmentAreas/Appointment";
import WhyChooseUs from "@/app/Component/UI/HomePage/WhyChooseUs/WhyChooseUs";
import AppointmentProcess from "@/app/Component/UI/HomePage/AppointmentProcess/AppointmentProcess";
import Testimonials from "@/app/Component/UI/HomePage/Testimonials/Testimonials";
import WhoWeAre from "@/app/Component/UI/WhoWeAre";
import { fetchReviews } from "@/app/api/review";

const AboutUs = async () => {
    const reviews = await fetchReviews();
  return (
    <div>
      <CommonHero pageName="About Us" />
      <About />
      <Appointment />
      <WhoWeAre />
      <WhyChooseUs />
      <AppointmentProcess />
      <Testimonials reviews={reviews} />
    </div>
  );
};

export default AboutUs;
