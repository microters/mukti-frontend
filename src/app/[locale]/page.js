import { fetchDepartments } from "../api/department";
import { fetchDoctors } from "../api/doctor";
import TranslationsProvider from '../Component/TranslationProvider';
import initTranslations from '@/i18n';
import Hero from "../Component/UI/HomePage/Hero/Hero";
import Features from "../Component/UI/HomePage/Features/Features";
import About from "../Component/UI/HomePage/About/About";
import Category from "../Component/UI/HomePage/Category/Category";
import BestDoctors from "../Component/UI/HomePage/BestDoctors/BestDoctors";
import WhyChooseUs from "../Component/UI/HomePage/WhyChooseUs/WhyChooseUs";
import MobileApp from "../Component/UI/HomePage/MobileApp/MobileApp";
import AppointmentProcess from "../Component/UI/HomePage/AppointmentProcess/AppointmentProcess";
import Appointment from "../Component/UI/HomePage/Appointment/Appointment";
import Blog from "../Component/UI/HomePage/Blog/Blog";
import { fetchReviews } from "../api/review";
import Testimonials from "../Component/UI/HomePage/Testimonials/Testimonials";

const i18nNamespaces = ['home'];

export default async function HomePage({ params }) {
  const locale = params.lang || 'en';

  console.log("Current Locale:", locale); // ✅ Debug Locale

  const { resources } = await initTranslations(locale, i18nNamespaces);
  console.log("Fetched Translations:", resources); // ✅ Debug translations

  const doctors = await fetchDoctors(locale);
  const doctorDepartments = await fetchDepartments(locale);
  const doctorReviews = await fetchReviews(locale);

  console.log("Doctors Data from API:", doctors); // ✅ Debug Doctors
  console.log("Departments Data from API:", doctorDepartments); // ✅ Debug Departments
  console.log("Reviews Data from API:", doctorReviews); // ✅ Debug Reviews

  const departmentNames = [
    ...new Set(
      doctors
        .map((d) => d.translations?.[locale]?.department || d.translations?.['en']?.department)
        .filter(Boolean)
    ),
  ];

  const selectedDepartment = departmentNames[0] || "";

  const languageFilteredDoctors = doctors.map((doctor) => {
    // Ensure the selected language has actual translations available
    const doctorData = doctor.translations?.[locale] && Object.keys(doctor.translations[locale]).length > 0
      ? doctor.translations[locale]  // ✅ Use selected language if translations exist
      : doctor.translations?.['en'] || {};  // ✅ Fallback to English if missing
  
    return {
      id: doctor.id,
      icon: doctor.icon,
      slug: doctor.slug,
      reviews: doctor.reviews || 0,
      translations: doctorData,
    };
  });
  
  console.log("Final Doctors Data:", languageFilteredDoctors); // ✅ Debugging
  

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      <div>
        <Hero />
        <Features />
        <About />
        <Category departments={doctorDepartments} />
        <BestDoctors
          doctors={languageFilteredDoctors}
          departments={departmentNames}
          selectedDepartment={selectedDepartment}
          language={locale} 
        />
        <Appointment />
        <WhyChooseUs />
        <MobileApp />
        <Testimonials reviews={doctorReviews} />
        <AppointmentProcess />
        <Blog />
      </div>
    </TranslationsProvider>
  );
}

