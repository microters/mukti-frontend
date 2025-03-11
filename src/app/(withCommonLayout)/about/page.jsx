// // app/about/page.js

// import CommonHero from "@/app/Component/UI/CommonHero";
// import About from "@/app/Component/UI/HomePage/About/About";
// import Appointment from "@/app/Component/Shared/AppointmentAreas/Appointment";
// import WhyChooseUs from "@/app/Component/UI/HomePage/WhyChooseUs/WhyChooseUs";
// import AppointmentProcess from "@/app/Component/UI/HomePage/AppointmentProcess/AppointmentProcess";
// import Testimonials from "@/app/Component/UI/HomePage/Testimonials/Testimonials";
// import WhoWeAre from "@/app/Component/UI/WhoWeAre";
// import { getReviews } from "@/app/api/Reviews/Reviews";

// // This is a Server Component. It can fetch data on the server before rendering the page.
// export default async function AboutUs() {
//   // Fetch reviews dynamically from API on the server side
//   const reviews = await getReviews();
//   console.log("Reviews", reviews)

//   // Return the page structure with the fetched reviews
//   return (
//     <div>
//       <CommonHero pageName="About Us" />
//       <About />
//       <Appointment />
//       <WhoWeAre />
//       <WhyChooseUs />
//       <AppointmentProcess />
//       <Testimonials reviews={reviews} />
//     </div>
//   );
// }

import React from 'react';

const About = () => {
  return (
    <div>
      <p>Hello Riaz</p>
    </div>
  );
};

export default About;
