// app/[locale]/page.js (FIXED)

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
import Testimonials from "../Component/UI/HomePage/Testimonials/Testimonials";

// ✅ Client Component-গুলোর জন্য ডেটা ইম্পোর্ট
import { fetchDoctors } from "../api/doctor";
import { fetchReviews } from "../api/review";
import { fetchDynamicData } from "../api/dynamicData,";
import { Suspense } from "react";

export const revalidate = 900;

// একটি সাধারণ Loading কম্পোনেন্ট
function DataLoading() {
  return <div className="py-10 text-center">Loading...</div>;
}

// ✅ params error সমাধানের জন্য সিগনেচার ঠিক করা হয়েছে
export default async function HomePage({ params }) {
  const resolvedParams = await params;
  const { locale = "en" } = resolvedParams;

  // ✅ Client Component-গুলোর ডেটা এখানে লোড করুন
  const [dynamicData, doctors, reviews] = await Promise.all([
    fetchDynamicData(locale), //
    fetchDoctors(locale),     //
    fetchReviews(locale),     //
  ]);

  // dynamicData থেকে সেকশনগুলো Destructure করুন
  const {
    heroSection,
    featuresSection,
    aboutSection,
    appointmentSection,
    whyChooseUsSection,
    downloadAppSection,
    appointmentProcess,
  } = dynamicData || {};

  return (
    <div>
      <Hero heroSection={heroSection} />
      
      {/* ✅ props পাস করা হচ্ছে (পোলিং ছাড়া) */}
      <Features featuresSection={featuresSection} />
      <About aboutSection={aboutSection} />
      
      {/* ✅ Category (Server Component) নিজে ডেটা লোড করবে */}
      <Suspense fallback={<DataLoading />}>
        <Category locale={locale} />
      </Suspense>

      {/* ✅ BestDoctors (Client) ডেটা props হিসেবে নিবে */}
      <BestDoctors doctors={doctors} />
      
      <Appointment appointmentSection={appointmentSection} />
      <WhyChooseUs whyChooseUsSection={whyChooseUsSection} />
      <MobileApp downloadAppSection={downloadAppSection} />
      
      {/* ✅ Testimonials (Client) ডেটা props হিসেবে নিবে */}
      <Testimonials reviews={reviews} />

      <AppointmentProcess appointmentProcess={appointmentProcess} />
      
      {/* ✅ Blog (Server Component) নিজে ডেটা লোড করবে */}
      <Suspense fallback={<DataLoading />}>
        <Blog locale={locale} />
      </Suspense>
    </div>
  );
}