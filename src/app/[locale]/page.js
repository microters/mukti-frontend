import { fetchDepartments } from "../api/department";
import { fetchDoctors } from "../api/doctor";
import Hero from "../Component/UI/HomePage/Hero/Hero";
import Features from "../Component/UI/HomePage/Features/Features";
import About from "../Component/UI/HomePage/About/About";
import Category from "../Component/UI/HomePage/Category/Category";
import BestDoctors from "../Component/UI/HomePage/BestDoctors/BestDoctors";  // Already imported
import WhyChooseUs from "../Component/UI/HomePage/WhyChooseUs/WhyChooseUs";
import MobileApp from "../Component/UI/HomePage/MobileApp/MobileApp";
import AppointmentProcess from "../Component/UI/HomePage/AppointmentProcess/AppointmentProcess";
import Appointment from "../Component/UI/HomePage/Appointment/Appointment";
import Blog from "../Component/UI/HomePage/Blog/Blog";
import { fetchReviews } from "../api/review";
import Testimonials from "../Component/UI/HomePage/Testimonials/Testimonials";

export default async function HomePage() {
  // Fetching doctors and departments data
  const doctors = await fetchDoctors();  // Fetch all doctors
  const doctorDepartments = await fetchDepartments();  // Fetch the departments list
  const doctorReviews = await fetchReviews();  // Fetch reviews for doctors

  return (
    <div>
      <Hero />
      <Features />
      <About />
      <Category departments={doctorDepartments} />

      {/* Pass doctors and departments to BestDoctors component */}
      <BestDoctors
        doctors={doctors}
      />

      <Appointment />
      <WhyChooseUs />
      <MobileApp />
      <Testimonials reviews={doctorReviews} />
      <AppointmentProcess />
      <Blog />
    </div>
  );
}

