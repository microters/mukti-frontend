// app/page.js (HomePage - App Router, SSR with Client-side hooks)
import { getDepartments } from "../api/Category/Category";
import { getDoctorsData } from "../api/BestDoctors/BestDoctors";
import { getReviews } from "../api/Reviews/Reviews";
import Testimonials from "../Component/UI/HomePage/Testimonials/Testimonials";
import Hero from "../Component/UI/HomePage/Hero/Hero";
import Features from "../Component/UI/HomePage/Features/Features";
import About from "../Component/UI/HomePage/About/About";
import Appointment from "../Component/UI/HomePage/Appointment/Appointment";
import WhyChooseUs from "../Component/UI/HomePage/WhyChooseUs/WhyChooseUs";
import MobileApp from "../Component/UI/HomePage/MobileApp/MobileApp";
import AppointmentProcess from "../Component/UI/HomePage/AppointmentProcess/AppointmentProcess";
import Blog from "../Component/UI/HomePage/Blog/Blog";
import Category from "../Component/UI/HomePage/Category/Category";
import BestDoctors from "../Component/UI/HomePage/BestDoctors/BestDoctors";

// Server-side component
export default async function HomePage() {
  // SSR Data fetching
  const departments = await getDepartments();  // Static Data (SSG)
  const reviews = await getReviews();  // Static Data (SSG)
  const { doctors, departments: doctorDepartments } = await getDoctorsData(); 


  return (
    <div>
      {/* Hero Section */}
      <Hero/>
      {/* Feature Section */}
      <Features/>
      {/* About Section */}
      <About/>
      {/* Category Section */}
      <Category departments={departments} />
      {/* Specialists Section */}
      <BestDoctors doctors={doctors} doctorDepartments={doctorDepartments}/>
      {/* Appointment Section */}
      <Appointment/>
      {/* Why Choose Us Section */}
      <WhyChooseUs/>
      {/* Mobile app Section */}
      <MobileApp/>
       {/* Testimonials Section */}
      <Testimonials reviews={reviews} />
      {/* Appointment Process */}
      <AppointmentProcess/>
      {/* Blog Section */}
      <Blog/>
    </div>
  );
}