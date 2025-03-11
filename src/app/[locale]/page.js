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
  // Extract locale from the URL parameters, default to 'en' if undefined
  const locale = params.lang || 'en';

  // Fetch translations for the current locale
  const { resources } = await initTranslations(locale, i18nNamespaces);

  // Fetch doctors and departments based on the selected locale
  const doctors = await fetchDoctors();
  const doctorDepartments = await fetchDepartments();  // Pass locale to fetchDepartments
  const doctorReviews= await fetchReviews();  // Pass locale to fetchReviews

  // Filter departments from doctors based on translations
  const departmentNames = [
    ...new Set(
      doctors
        .map((d) => d.translations?.[locale]?.department) // Get department name in selected language
        .filter(Boolean)
    ),
  ];

  const selectedDepartment = departmentNames[0] || "";

  // Filter doctors based on language
  const languageFilteredDoctors = doctors.map((doctor) => ({
    id: doctor.id,
    icon: doctor.icon,
    slug: doctor.slug,
    reviews: doctor.reviews || 0,
    translations: doctor.translations?.[locale] || {}, // Use only `bn` or `en` translation
  }));

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      <div>
        <Hero />
        <Features />
        <About />
        <Category departments={doctorDepartments} /> 
        <BestDoctors
          doctors={languageFilteredDoctors} // Pass language-filtered doctors
          departments={departmentNames} // Pass translated department list
          selectedDepartment={selectedDepartment} // Set initial selected department
          language={locale} // Pass language directly
        />
        <Appointment/>
        <WhyChooseUs />
        <MobileApp />
        <Testimonials reviews={doctorReviews} />
        <AppointmentProcess />
        <Blog />
      </div>
    </TranslationsProvider>
  );
}
