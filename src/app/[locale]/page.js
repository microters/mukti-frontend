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
import { fetchDynamicData } from "../api/dynamicData,";
import { fetchBlogs, fetchBlogsBySlug } from "../api/blog";

export default async function HomePage() {
  // Fetching doctors and departments data
  const doctors = await fetchDoctors();  // Fetch all doctors
  const doctorDepartments = await fetchDepartments();  // Fetch the departments list
  const doctorReviews = await fetchReviews();  // Fetch reviews for doctors
  const blogs = await fetchBlogs()
  const singleBlogs = await fetchBlogsBySlug()
  const dynamicData = await fetchDynamicData();

   // Extract home data
  const heroSection = dynamicData.heroSection;
  const featuresSection = dynamicData.featuresSection
  const aboutSection = dynamicData.aboutSection
  const appointmentSection=dynamicData.appointmentSection
  const whyChooseUsSection = dynamicData.whyChooseUsSection
  const downloadAppSection = dynamicData.downloadAppSection
  const appointmentProcess = dynamicData.appointmentProcess

  const lastUpdated = dynamicData?.updatedAt;


  return (
    <div>
      <Hero heroSection={heroSection} lastUpdated={lastUpdated}/>
      <Features featuresSection={featuresSection}/>
      <About aboutSection={aboutSection}/>
      <Category departments={doctorDepartments} />
      {/* Pass doctors and departments to BestDoctors component */}
      <BestDoctors
        doctors={doctors}
      />

      <Appointment appointmentSection={appointmentSection} />
      <WhyChooseUs whyChooseUsSection={whyChooseUsSection}/>
      <MobileApp downloadAppSection={downloadAppSection}/>
      <Testimonials reviews={doctorReviews} />
      <AppointmentProcess appointmentProcess={appointmentProcess}/>
      <Blog blogs={blogs} singleBlogs={singleBlogs}/>
    </div>
  );
}

