import { fetchDepartments } from "../api/department";
import TranslationsProvider from '../Component/TranslationProvider';
import initTranslations from '@/i18n';
import Hero from "../Component/UI/HomePage/Hero/Hero";
import Features from "../Component/UI/HomePage/Features/Features";
import About from "../Component/UI/HomePage/About/About";
import Category from "../Component/UI/HomePage/Category/Category";
import WhyChooseUs from "../Component/UI/HomePage/WhyChooseUs/WhyChooseUs";
import MobileApp from "../Component/UI/HomePage/MobileApp/MobileApp";
import AppointmentProcess from "../Component/UI/HomePage/AppointmentProcess/AppointmentProcess";
import Appointment from "../Component/UI/HomePage/Appointment/Appointment";
import Blog from "../Component/UI/HomePage/Blog/Blog";

const i18nNamespaces = ['home'];

export default async function HomePage({ params }) {
  const locale = params.lang || 'en';

  console.log("Current Locale:", locale); // ✅ Debug Locale

  const { resources } = await initTranslations(locale, i18nNamespaces);
  console.log("Fetched Translations:", resources); // ✅ Debug translations

  const doctorDepartments = await fetchDepartments(locale);

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      <div>
        <Hero />
        <Features />
        <About />
        <Category departments={doctorDepartments} locale={locale} />
        <Appointment />
        <WhyChooseUs />
        <MobileApp />
        <AppointmentProcess />
        <Blog />
      </div>
    </TranslationsProvider>
  );
}
