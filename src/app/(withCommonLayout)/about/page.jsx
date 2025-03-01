import React from "react";
// import Image from "next/image";
// import FormButton from "@/app/Component/Shared/Buttons/FormButton";

// import tabletIcon from "@/assets/images/tablet.png";
// import injectionIcon from "@/assets/images/injection.png";
// import penToolIcon from "@/assets/images/pen-tool.png";
// import crossShapeIcon from "@/assets/images/cross-shape.png";
// import Link from "next/link";
import CommonHero from "@/app/Component/UI/CommonHero";
import About from "@/app/Component/UI/HomePage/About/About";
import Appointment from "@/app/Component/Shared/AppointmentAreas/Appointment";
import WhyChooseUs from "@/app/Component/UI/HomePage/WhyChooseUs/WhyChooseUs";
import AppointmentProcess from "@/app/Component/UI/HomePage/AppointmentProcess/AppointmentProcess";
import Testimonials from "@/app/Component/UI/HomePage/Testimonials/Testimonials";
import { getReviews } from "@/app/api/Reviews/Reviews";

const AboutUs = async() => {
    const [reviews] = await Promise.all([  
        getReviews()       
      ]);
  return (
    <div>
      <CommonHero pageName="About Us" />
      <About />
      <Appointment />
      <WhyChooseUs />
      <AppointmentProcess />
      <Testimonials reviews={reviews} />
    </div>
  );
};

export default AboutUs;
