// import React from "react";

// import CommonHero from "@/app/Component/UI/CommonHero";
// // import About from "@/app/Component/UI/HomePage/About/About";
// import Appointment from "@/app/Component/Shared/AppointmentAreas/Appointment";
// import WhyChooseUs from "@/app/Component/UI/HomePage/WhyChooseUs/WhyChooseUs";
// import AppointmentProcess from "@/app/Component/UI/HomePage/AppointmentProcess/AppointmentProcess";
// import Testimonials from "@/app/Component/UI/HomePage/Testimonials/Testimonials";
// import { getReviews } from "@/app/api/Reviews/Reviews";
// import WhoWeAre from "@/app/Component/UI/WhoWeAre";

// const AboutUs = async () => {
//   const [reviews] = await Promise.all([getReviews()]);
//   return (
//     <div>
//       <CommonHero pageName="About Us" />
//       {/* <About /> */}
//       <Appointment />
//       <WhoWeAre />
//       <WhyChooseUs />
//       <AppointmentProcess />
//       <Testimonials reviews={reviews} />
//     </div>
//   );
// };

// export default AboutUs;
import React from "react";

import CommonHero from "@/app/Component/UI/CommonHero";
import Appointment from "@/app/Component/Shared/AppointmentAreas/Appointment";
import WhyChooseUs from "@/app/Component/UI/HomePage/WhyChooseUs/WhyChooseUs";
import AppointmentProcess from "@/app/Component/UI/HomePage/AppointmentProcess/AppointmentProcess";
import Testimonials from "@/app/Component/UI/HomePage/Testimonials/Testimonials";
import { getReviews } from "@/app/api/Reviews/Reviews";
import WhoWeAre from "@/app/Component/UI/WhoWeAre";

// This function fetches the data at build time and allows it to be updated periodically (every 60 seconds)
export async function getStaticProps() {
  const reviews = await getReviews();  // Fetch reviews data here

  return {
    props: {
      reviews,  // Pass the reviews to the About page component
    },
    revalidate: 60, // This will regenerate the page every 60 seconds
  };
}

const AboutUs = ({ reviews }) => {
  return (
    <div>
      <CommonHero pageName="About Us" />
      <Appointment />
      <WhoWeAre />
      <WhyChooseUs />
      <AppointmentProcess />
      <Testimonials reviews={reviews} /> {/* Pass reviews to Testimonials */}
    </div>
  );
};

export default AboutUs;
