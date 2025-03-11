// // app/(withCommonLayout)/about/page.jsx

// import React from "react";

// import CommonHero from "@/app/Component/UI/CommonHero";
// import Appointment from "@/app/Component/Shared/AppointmentAreas/Appointment";
// import WhyChooseUs from "@/app/Component/UI/HomePage/WhyChooseUs/WhyChooseUs";
// import AppointmentProcess from "@/app/Component/UI/HomePage/AppointmentProcess/AppointmentProcess";
// import Testimonials from "@/app/Component/UI/HomePage/Testimonials/Testimonials";
// import { getReviews } from "@/app/api/Reviews/Reviews"; // Assuming this fetches data
// import WhoWeAre from "@/app/Component/UI/WhoWeAre";

// // Use async function directly in the component
// const AboutUs = async () => {
//   // Fetch data directly in the async component
//   const reviews = await getReviews();  // Fetch reviews data

//   return (
//     <div>
//       <CommonHero pageName="About Us" />
//       <Appointment />
//       <WhoWeAre />
//       <WhyChooseUs />
//       <AppointmentProcess />
//       <Testimonials reviews={reviews} /> {/* Pass reviews to Testimonials */}
//     </div>
//   );
// };

// export default AboutUs;
// app/(withCommonLayout)/about/page.jsx

import React from "react";

import CommonHero from "@/app/Component/UI/CommonHero";
import Appointment from "@/app/Component/Shared/AppointmentAreas/Appointment";
import WhyChooseUs from "@/app/Component/UI/HomePage/WhyChooseUs/WhyChooseUs";
import AppointmentProcess from "@/app/Component/UI/HomePage/AppointmentProcess/AppointmentProcess";
import Testimonials from "@/app/Component/UI/HomePage/Testimonials/Testimonials";
import { getReviews } from "@/app/api/Reviews/Reviews"; // Assuming this fetches data
import WhoWeAre from "@/app/Component/UI/WhoWeAre";

// Use async function directly in the component (App Router supports async components)
const AboutUs = async () => {
  // Fetch data directly in the async component
  let reviews = [];

  try {
    reviews = await getReviews();  // Fetch reviews data
  } catch (error) {
    console.error("Error fetching reviews:", error);
    reviews = [];  // Fallback to an empty array in case of an error
  }

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
