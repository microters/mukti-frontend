import { fetchDepartments } from "../api/department";
import { fetchDoctors } from "../api/doctor";
import About from "../Component/UI/HomePage/About/About";
import Appointment from "../Component/UI/HomePage/Appointment/Appointment";
import AppointmentProcess from "../Component/UI/HomePage/AppointmentProcess/AppointmentProcess";
import BestDoctors from "../Component/UI/HomePage/BestDoctors/BestDoctors";
import Blog from "../Component/UI/HomePage/Blog/Blog";
import Category from "../Component/UI/HomePage/Category/Category";
import Features from "../Component/UI/HomePage/Features/Features";
import Hero from "../Component/UI/HomePage/Hero/Hero";
import MobileApp from "../Component/UI/HomePage/MobileApp/MobileApp";
import Testimonials from "../Component/UI/HomePage/Testimonials/Testimonials";
import WhyChooseUs from "../Component/UI/HomePage/WhyChooseUs/WhyChooseUs";

export default async function HomePage({ params }) {
  // Get locale from URL parameters. Default to 'en' if undefined.
  const locale = params.lang || 'en';  // Use `params.lang` as fallback

  console.log("Current Locale:", locale); // Log to check the locale value

  // Fetch doctors and departments based on the selected locale
  const doctors = await fetchDoctors();
  const doctorDepartments = await fetchDepartments(locale);  // Pass locale to fetchDepartments

  console.log("Fetched Doctor Departments:", doctorDepartments); // Log to check department data

  // Filter departments from doctors
  const departments = [
    ...new Set(
      doctors
        .map((d) => d.translations?.[locale]?.department) // Get department name in selected language
        .filter(Boolean)
    ),
  ];

  const selectedDepartment = departments[0] || "";

  // Filter doctors based on language
  const languageFilteredDoctors = doctors.map((doctor) => ({
    id: doctor.id,
    icon: doctor.icon,
    slug: doctor.slug,
    reviews: doctor.reviews || 0,
    translations: doctor.translations?.[locale] || {}, // Use only `bn` or `en` translation
  }));

  return (
    <div>
      <Hero />
      <Features />
      <About />
      <Category departments={doctorDepartments} />  {/* Pass filtered departments */}
      <BestDoctors
        doctors={languageFilteredDoctors} // Pass only language-filtered doctors
        departments={departments} // Pass translated department list
        selectedDepartment={selectedDepartment} // Set initial selected department
        language={locale} // Pass language directly
      />
      <Appointment/>
      <WhyChooseUs />
      <MobileApp />
      <AppointmentProcess />
      <Blog />
    </div>
  );
}