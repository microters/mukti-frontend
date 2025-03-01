"use client";
import React, { useState } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

import drImage from "@/assets/images/doctor-profile.jpg";
import verified from "@/assets/images/badge.png";
import hLogo from "@/assets/images/HLogo.png";
import badge from "@/assets/images/badgeAward.png";
import awardImg1 from "@/assets/images/detail-4-min1.png";
import awardImg2 from "@/assets/images/detail-4-min2.png";
import awardImg3 from "@/assets/images/detail-4-min3.png";
import awardImg4 from "@/assets/images/detail-4-min4.png";
import callIcon from "@/assets/images/phone2.png";

const SingleDoctor = () => {
  const [openSections, setOpenSections] = useState({
    shortBio: true,
    practiceExperience: true,
    treatments: true,
    awardsAchievements: true,
    conditions: true,
    followUpFee: true,
    avgConsultationTime: true,
    faq: true,
    location: true,
  });

  const [accordionOpenIndex, setAccordionOpenIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const fullText = `
    Dr. Alex Johnson is a highly experienced and dedicated physician specializing in internal medicine with over 15 years of clinical expertise. He is widely recognized for his patient-centered approach and unwavering commitment to providing quality healthcare. Dr. Johnson is passionate about diagnosing and managing a wide range of acute and chronic illnesses, ensuring that every patient receives personalized and effective treatment plans tailored to their unique needs. His approachable demeanor, meticulous diagnostic skills, and comprehensive care have earned him the trust and respect of patients and colleagues alike.
    Dr. Johnson’s philosophy of care is rooted in preventive medicine and holistic wellness, empowering patients to lead healthier lives through education and proactive measures. In addition to his clinical practice, he actively contributes to medical research and education, staying at the forefront of advancements in internal medicine to offer the best care possible.
  `;

  const maxWords = 100; // Show only first 50 words by default
  const wordsArray = fullText.split(" ");
  const truncatedText = wordsArray.slice(0, maxWords).join(" ") + "...";

  const tabs = [
    { name: "Short Bio", id: "shortBio" },
    { name: "Practice Experience", id: "practiceExperience" },
    { name: "Treatments", id: "treatments" },
    { name: "Awards & Achievements", id: "awardsAchievements" },
    { name: "Conditions", id: "conditions" },
    { name: "Follow-Up Fee", id: "followUpFee" },
    { name: "Avg Consultation Time", id: "avgConsultationTime" },
    { name: "FAQ", id: "faq" },
    { name: "Location", id: "location" },
  ];

  const treatmentList = [
    { name: "Chronic Disease Management", id: "chronicDiseaseManagement" },
    { name: "Cardiovascular", id: "cardiovascular" },
    { name: "Pulmonary", id: "pulmonary" },
    { name: "Chronic Disease Management", id: "chronicDiseaseManagement2" },
    { name: "Cardiovascular", id: "cardiovascular2" },
    { name: "Pulmonary", id: "pulmonary2" },
    { name: "Chronic Disease Management", id: "chronicDiseaseManagement3" },
    { name: "Cardiovascular", id: "cardiovascular3" },
    { name: "Pulmonary", id: "pulmonary3" },
    { name: "Chronic Disease Management", id: "chronicDiseaseManagement4" },
  ];

  const faqData = [
    {
      question: "What services does Dr. Alex Johnson provide?",
      answer:
        "Dr. Alex Johnson specializes in internal medicine and offers a wide range of services, including chronic disease management, preventive care, treatment of infections, respiratory health, cardiovascular care, and more. He provides personalized treatment plans tailored to each patient’s needs.",
    },
    {
      question: "How can I book an appointment?",
      answer:
        "You can book an appointment online through our website, call our office, or visit in person to schedule a consultation.",
    },
    {
      question: "Does Dr. Alex Johnson accept insurance?",
      answer:
        "Yes, Dr. Alex Johnson accepts most major insurance providers. Please contact our office to verify your coverage.",
    },
    {
      question: "Does Dr. Alex Johnson accept insurance?",
      answer:
        "Yes, Dr. Alex Johnson accepts most major insurance providers. Please contact our office to verify your coverage.",
    },
    {
      question: "Does Dr. Alex Johnson accept insurance?",
      answer:
        "Yes, Dr. Alex Johnson accepts most major insurance providers. Please contact our office to verify your coverage.",
    },
    {
      question: "Does Dr. Alex Johnson accept insurance?",
      answer:
        "Yes, Dr. Alex Johnson accepts most major insurance providers. Please contact our office to verify your coverage.",
    },
  ];

  const contactInfo = [
    {
      label: "Phone Number",
      value: "01735456462",
      icon: "solar:call-medicine-rounded-broken",
      type: "phone",
    },
    {
      label: "Email",
      value: "hello@gmail.com",
      icon: "clarity:envelope-line",
      type: "email",
    },
    {
      label: "Gender",
      value: "Male",
      icon: "solar:user-outline",
      type: "text",
    },
    {
      label: "Appointment Fee",
      value: "1000 TK",
      icon: "hugeicons:sale-tag-01",
      type: "text",
    },
  ];

  // Toggle visibility based on section id
  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the specific section's visibility
    }));
  };

  // Accordion Toggle Function
  const toggleAccordion = (index) => {
    console.log(index);

    setAccordionOpenIndex(accordionOpenIndex === index ? null : index);
  };

  return (
    <div>
      {/* Hero Area */}
      <div className="bg-[url(@/assets/images/inner-hero-bg.jpg)] bg-cover bg-top">
        <div className="h-96 px-3 bg-gradient-to-t from-[#009650be] to-[#323290be] relative"></div>
      </div>

      <div className="container pb-24 relative -mt-24 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="flex flex-col md:flex-row gap-6 bg-white shadow-md px-4 md:px-7 py-6 rounded-md">
              <Image
                src={drImage}
                alt="dr image"
                className="size-32 rounded-full border-2 border-M-primary-color"
              />
              <div className="w-full">
                <div className="flex flex-wrap gap-3 items-start justify-between w-full border-b border-M-primary-color/20 pb-4">
                  <div>
                    <h3 className="flex gap-3 items-center text-M-heading-color text-lg md:text-2xl mb-1">
                      Dr. Alex Johnson{" "}
                      <Image src={verified} alt="verified" className="w-5" />
                    </h3>
                    <p className="font-jost text-M-text-color text-base">
                      Internal Medicine at Mukti Hospital
                    </p>
                  </div>
                  <p className="bg-[#323290] inline-flex items-center gap-2 rounded-md py-2 px-4 font-jost font-normal text-base text-white">
                    <Icon icon="solar:medical-kit-linear" width="18" />4 years
                  </p>
                </div>
                <div className="pt-4 flex flex-col md:flex-row items-start gap-6">
                  <p className="text-M-text-color text-base font-normal font-jost flex items-start gap-2 md:basis-80">
                    <Icon
                      icon="oui:index-open"
                      width="24"
                      className="text-M-heading-color shrink-0 relative top-1"
                    />
                    <span>
                      MBBS, BCS (Health), MD (Cardiology), Clinical and
                      Interventional Cardiologist (Specialist in Angiogram,
                      Angioplasty, and Pacemaker)
                      <br />{" "}
                      <strong>
                        Assistant Professor, Cardiology <br />
                        Cumilla Medical College Hospital
                      </strong>
                    </span>
                  </p>
                  <p className="text-M-text-color text-base font-normal font-jost flex items-center gap-2">
                    <Icon
                      icon="mdi:location-on-outline"
                      width="24"
                      className="text-M-heading-color shrink-0 relative "
                    />
                    Dhaka, Bangladesh
                  </p>
                  <p className="text-M-text-color text-base font-normal font-jost flex items-center gap-2">
                    <Icon
                      icon="icon-park-outline:hospital-three"
                      width="24"
                      className="text-M-heading-color shrink-0 relative "
                    />
                    10+ Years Experience
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* filter List */}
              <div className="flex gap-6 bg-white px-7 py-6 rounded-md mt-6 border border-M-heading-color/10 lg:sticky top-1">
                <ul className="flex flex-wrap gap-4">
                  {tabs.map((tab) => (
                    <li key={tab.id} className="inline-block">
                      <Link
                        href={"#" + tab.id}
                        className="inline-block px-2 py-1 md:px-4 md:py-2 border border-M-heading-color/20 rounded-md text-M-text-color text-sm md:text-base font-jost font-normal uppercase hover:bg-M-heading-color hover:text-white transition-all duration-300"
                      >
                        {tab.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Short Bio */}
              <div
                className="bg-white px-7 rounded-md mt-6 border border-M-heading-color/10 lg:scroll-mt-44"
                id="shortBio"
              >
                <div
                  onClick={() => toggleSection("shortBio")}
                  className={`flex items-center justify-between  py-4 cursor-pointer ${
                    openSections.shortBio
                      ? "border-b border-M-heading-color/20"
                      : ""
                  }`}
                >
                  <h3 className="font-bold text-lg md:text-xl text-M-heading-color">
                    Short Bio
                  </h3>
                  <Icon
                    icon="solar:alt-arrow-up-line-duotone"
                    width="24"
                    height="24"
                    className={`transition-all duration-300 ${
                      openSections.shortBio ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
                <div
                  className={`space-y-3 transition-all duration-300 overflow-hidden ${
                    openSections.shortBio ? "max-h-auto py-5" : "max-h-0 py-0"
                  }`}
                >
                  <div
                    className={`space-y-3 ${isExpanded ? "" : "line-clamp-[10]"}`}
                  >
                    <p className="font-jost font-normal text-base text-M-text-color">
                      Dr. Alex Johnson is a highly experienced and dedicated
                      physician specializing in internal medicine with over 15
                      years of clinical expertise. He is widely recognized for
                      his patient-centered approach and unwavering commitment to
                      providing quality healthcare. Dr. Johnson is passionate
                      about diagnosing and managing a wide range of acute and
                      chronic illnesses, ensuring that every patient receives
                      personalized and effective treatment plans tailored to
                      their unique needs. His approachable demeanor, meticulous
                      diagnostic skills, and comprehensive care have earned him
                      the trust and respect of patients and colleagues alike.
                    </p>
                    <p className="font-jost font-normal text-base text-M-text-color">
                      Dr. Johnson’s philosophy of care is rooted in preventive
                      medicine and holistic wellness, empowering patients to
                      lead healthier lives through education and proactive
                      measures. In addition to his clinical practice, he
                      actively contributes to medical research and education,
                      staying at the forefront of advancements in internal
                      medicine to offer the best care possible.
                    </p>
                    <p className="font-jost font-normal text-base text-M-text-color">
                      Dr. Johnson’s philosophy of care is rooted in preventive
                      medicine and holistic wellness, empowering patients to
                      lead healthier lives through education and proactive
                      measures. In addition to his clinical practice, he
                      actively contributes to medical research and education,
                      staying at the forefront of advancements in internal
                      medicine to offer the best care possible.
                    </p>
                    <p className="font-jost font-normal text-base text-M-text-color">
                      Dr. Johnson’s philosophy of care is rooted in preventive
                      medicine and holistic wellness, empowering patients to
                      lead healthier lives through education and proactive
                      measures. In addition to his clinical practice, he
                      actively contributes to medical research and education,
                      staying at the forefront of advancements in internal
                      medicine to offer the best care possible.
                    </p>
                  </div>

                  {wordsArray.length > maxWords && (
                    <button
                      className="flex items-center gap-2 text-M-primary-color"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      <Icon
                        icon={isExpanded ? "icons8:minus" : "icons8:plus"}
                        width="20"
                        height="20"
                      />
                      {isExpanded ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>
              </div>

              {/* Practice Experience */}
              <div
                className="bg-white px-7 rounded-md mt-6 border border-M-heading-color/10 lg:scroll-mt-44"
                id="practiceExperience"
              >
                <div
                  onClick={() => toggleSection("practiceExperience")}
                  className={`flex items-center justify-between py-4 cursor-pointer ${
                    openSections.practiceExperience
                      ? "border-b border-M-heading-color/20"
                      : ""
                  }`}
                >
                  <h3 className="font-bold text-lg md:text-xl text-M-heading-color">
                    Practice Experience
                  </h3>
                  <Icon
                    icon="solar:alt-arrow-up-line-duotone"
                    width="24"
                    height="24"
                    className={`transition-all duration-300 ${
                      openSections.practiceExperience
                        ? "rotate-180"
                        : "rotate-0"
                    }`}
                  />
                </div>
                <div
                  className={`space-y-5 transition-all duration-300 overflow-hidden ${
                    openSections.practiceExperience
                      ? "max-h-auto py-5"
                      : "max-h-0 py-0"
                  }`}
                >
                  <div className="flex gap-3 md:gap-6 flex-col md:flex-row">
                    <div className="size-36 flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-M-heading-color/20">
                      <Image src={hLogo} alt="h-logo" />
                    </div>
                    <div>
                      <h4 className="text-base md:text-xl text-M-heading-color font-bold font-jost mb-2">
                        Hill Medical Hospital, Newcastle
                      </h4>
                      <p className="font-jost font-normal text-base text-M-text-color mb-3">
                        Dec 2020 - Jan 2022 - 2 Years 2 months
                      </p>
                      <p className="font-jost font-normal text-base text-M-text-color">
                        Experienced in a wide variety of medical settings, with
                        particular expertise in diagnostics, primary care and
                        emergency medicine. Experienced in a wide variety of
                        medical settings, with particular expertise in
                        diagnostics, primary care and emergency medicine.
                        Experienced in a wide variety of medical settings, with
                        particular expertise in diagnostics, primary care and
                        emergency medicine.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 md:gap-6 flex-col md:flex-row">
                    <div className="size-36 flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-M-heading-color/20">
                      <Image src={hLogo} alt="h-logo" />
                    </div>
                    <div>
                      <h4 className="text-base md:text-xl text-M-heading-color font-bold font-jost mb-2">
                        Hill Medical Hospital, Newcastle
                      </h4>
                      <p className="font-jost font-normal text-base text-M-text-color mb-3">
                        Dec 2020 - Jan 2022 - 2 Years 2 months
                      </p>
                      <p className="font-jost font-normal text-base text-M-text-color">
                        Experienced in a wide variety of medical settings, with
                        particular expertise in diagnostics, primary care and
                        emergency medicine. Experienced in a wide variety of
                        medical settings, with particular expertise in
                        diagnostics, primary care and emergency medicine.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Treatments Offered */}
              <div
                className="bg-white px-7 rounded-md mt-6 border border-M-heading-color/10 lg:scroll-mt-44"
                id="treatments"
              >
                <div
                  onClick={() => toggleSection("treatments")}
                  className={`flex items-center justify-between py-4 cursor-pointer ${
                    openSections.treatments
                      ? "border-b border-M-heading-color/20"
                      : ""
                  }`}
                >
                  <h3 className="font-bold text-lg md:text-xl text-M-heading-color">
                    Treatments Offered
                  </h3>
                  <Icon
                    icon="solar:alt-arrow-up-line-duotone"
                    width="24"
                    height="24"
                    className={`transition-all duration-300 ${
                      openSections.treatments ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
                <div
                  className={`space-y-5 transition-all duration-300 overflow-hidden ${
                    openSections.treatments ? "max-h-auto py-5" : "max-h-0 py-0"
                  }`}
                >
                  <p className="text-M-text-color text-base font-normal font-jost ">
                    Dr. Johnson offers a comprehensive range of medical services
                    tailored to address diverse health concerns:
                  </p>
                  <ul className="flex flex-wrap gap-3">
                    {treatmentList.map((item) => (
                      <li key={item.id} className="inline-block">
                        <Link
                          href="#"
                          className="text-M-primary-color text-base font-jost font-normal bg-M-primary-color/5 rounded-md px-4 py-2 inline-flex gap-2 items-center hover:bg-M-primary-color hover:text-white transition-all duration-300"
                        >
                          {item.name}
                          <Icon icon="icons8:plus" width="20" height="20" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Awards & Achievements */}
              <div
                className="bg-white px-7 rounded-md mt-6 border border-M-heading-color/10 lg:scroll-mt-44"
                id="awardsAchievements"
              >
                <div
                  onClick={() => toggleSection("awardsAchievements")}
                  className={`flex items-center justify-between py-4 cursor-pointer ${
                    openSections.awardsAchievements
                      ? "border-b border-M-heading-color/20"
                      : ""
                  }`}
                >
                  <h3 className="font-bold text-lg md:text-xl text-M-heading-color">
                    Awards & Achievements
                  </h3>
                  <Icon
                    icon="solar:alt-arrow-up-line-duotone"
                    width="24"
                    height="24"
                    className={`transition-all duration-300 ${
                      openSections.awardsAchievements
                        ? "rotate-180"
                        : "rotate-0"
                    }`}
                  />
                </div>
                <div
                  className={`space-y-5 transition-all duration-300 overflow-hidden ${
                    openSections.awardsAchievements
                      ? "max-h-auto py-5"
                      : "max-h-0 py-0"
                  }`}
                >
                  <p className="text-M-text-color text-base font-normal font-jost">
                    Dr. Johnson’s exceptional contributions to medicine and
                    patient care have been widely recognized through numerous
                    awards and honors. Dr. Johnson’s exceptional contributions
                    to medicine and patient care have been widely recognized
                    through numerous awards and honors.
                  </p>
                  <div className="flex  gap-5">
                    <Image
                      src={badge}
                      alt="badge"
                      className="w-14 h-14 shrink-0"
                    />
                    <div className="space-y-1">
                      <h4>Excellence in Patient Care Award – 2023</h4>
                      <p className="text-M-text-color font-jost text-base">
                        Honored for his outstanding commitment to patient
                        satisfaction and clinical excellence.
                      </p>
                    </div>
                  </div>
                  <div className="flex  gap-5">
                    <Image
                      src={badge}
                      alt="badge"
                      className="w-14 h-14 shrink-0"
                    />
                    <div className="space-y-1">
                      <h4>Excellence in Patient Care Award – 2023</h4>
                      <p className="text-M-text-color font-jost text-base">
                        Honored for his outstanding commitment to patient
                        satisfaction and clinical excellence.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 md:gap-8 mt-8">
                    <Image
                      src={awardImg1}
                      alt="award"
                      className="shadow shadow-md"
                    />
                    <Image
                      src={awardImg2}
                      alt="award"
                      className="shadow shadow-md"
                    />
                    <Image
                      src={awardImg3}
                      alt="award"
                      className="shadow shadow-md"
                    />
                    <Image
                      src={awardImg4}
                      alt="award"
                      className="shadow shadow-md"
                    />
                  </div>
                </div>
              </div>

              {/* Conditions */}
              <div
                className="bg-white px-7 rounded-md mt-6 border border-M-heading-color/10 lg:scroll-mt-44"
                id="conditions"
              >
                <div
                  onClick={() => toggleSection("conditions")}
                  className={`flex items-center justify-between py-4 cursor-pointer ${
                    openSections.conditions
                      ? "border-b border-M-heading-color/20"
                      : ""
                  }`}
                >
                  <h3 className="font-bold text-lg md:text-xl text-M-heading-color">
                    Conditions List
                  </h3>
                  <Icon
                    icon="solar:alt-arrow-up-line-duotone"
                    width="24"
                    height="24"
                    className={`transition-all duration-300 ${
                      openSections.conditions ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
                <div
                  className={`space-y-5 transition-all duration-300 overflow-hidden ${
                    openSections.conditions ? "max-h-auto py-5" : "max-h-0 py-0"
                  }`}
                >
                  <p className="text-M-text-color text-base font-normal font-jost">
                    Dr. Johnson offers a comprehensive range of medical services
                    tailored to address diverse health concerns:
                  </p>
                  <ul className="flex flex-wrap gap-3">
                    {treatmentList.map((item) => (
                      <li key={item.id} className="inline-block">
                        <Link
                          href="#"
                          className="text-M-heading-color text-base font-jost font-normal bg-M-text-color/5 rounded-md px-4 py-2 inline-flex gap-2 items-center hover:bg-M-heading-color hover:text-white transition-all duration-300"
                        >
                          {item.name}
                          <Icon icon="icons8:plus" width="20" height="20" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Follow Up */}
              <div
                className="bg-white px-7 rounded-md mt-6 border border-M-heading-color/10 lg:scroll-mt-44"
                id="followUpFee"
              >
                <div
                  onClick={() => toggleSection("followUpFee")}
                  className={`flex items-center justify-between py-4 cursor-pointer ${
                    openSections.followUpFee
                      ? "border-b border-M-heading-color/20"
                      : ""
                  }`}
                >
                  <h3 className="font-bold text-lg md:text-xl text-M-heading-color">
                    Follow-Up Fee
                  </h3>
                  <Icon
                    icon="solar:alt-arrow-up-line-duotone"
                    width="24"
                    height="24"
                    className={`transition-all duration-300 ${
                      openSections.followUpFee ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
                <div
                  className={`space-y-5 transition-all duration-300 overflow-hidden ${
                    openSections.followUpFee
                      ? "max-h-auto py-5"
                      : "max-h-0 py-0"
                  }`}
                >
                  <p className="text-M-text-color text-base font-normal font-jost">
                    Dr. Johnson’s exceptional contributions to medicine and
                    patient care have been widely recognized through numerous
                    awards and honors. Dr. Johnson’s exceptional contributions
                    to medicine and patient care have been widely recognized
                    through numerous awards and honors.
                  </p>
                  <div>
                    <h5 className="text-base text-M-heading-color font-jost font-semibold">
                      Within 7-14 Days:
                    </h5>
                    <p className="text-base text-M-text-color font-jost">
                      Fee : 500 TK
                    </p>
                  </div>
                  <div>
                    <h5 className="text-base text-M-heading-color font-jost font-semibold">
                      Same Condition Follow-Up:
                    </h5>
                    <p className="text-base text-M-text-color font-jost">
                      Fee : 500 TK
                    </p>
                  </div>
                  <div>
                    <h5 className="text-base text-M-heading-color font-jost font-semibold">
                      Specialist Consultation:
                    </h5>
                    <p className="text-base text-M-text-color font-jost">
                      Fee : 500 TK
                    </p>
                  </div>
                </div>
              </div>

              {/* Avg Consultation Time */}
              <div
                className="bg-white px-7 rounded-md mt-6 border border-M-heading-color/10 lg:scroll-mt-44"
                id="avgConsultationTime"
              >
                <div
                  onClick={() => toggleSection("avgConsultationTime")}
                  className={`flex items-center justify-between py-4 cursor-pointer ${
                    openSections.avgConsultationTime
                      ? "border-b border-M-heading-color/20"
                      : ""
                  }`}
                >
                  <h3 className="font-bold text-lg md:text-xl text-M-heading-color">
                    Avg Consultation Time
                  </h3>
                  <Icon
                    icon="solar:alt-arrow-up-line-duotone"
                    width="24"
                    height="24"
                    className={`transition-all duration-300 ${
                      openSections.avgConsultationTime
                        ? "rotate-180"
                        : "rotate-0"
                    }`}
                  />
                </div>
                <div
                  className={`space-y-5 transition-all duration-300 overflow-hidden ${
                    openSections.avgConsultationTime
                      ? "max-h-auto py-5"
                      : "max-h-0 py-0"
                  }`}
                >
                  <p className="text-M-text-color text-base font-normal font-jost">
                    Dr. Johnson’s exceptional contributions to medicine and
                    patient care have been widely recognized through numerous
                    awards and honors.
                  </p>
                  <div className="flex gap-4">
                    <div className="size-14 bg-M-primary-color text-white rounded-full flex items-center justify-center shrink-0">
                      <Icon icon="fa-regular:hospital" width="24" />
                    </div>
                    <div>
                      <h5 className="text-M-heading-color text-base md:text-lg font-semibold font-jost">
                        The standard duration of a consultation, usually ranging
                        between
                      </h5>
                      <p className="text-M-text-color text-base font-normal font-jost">
                        Time : 15 to 30 minutes.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="size-14 bg-M-primary-color text-white rounded-full flex items-center justify-center shrink-0">
                      <Icon icon="fa-regular:hospital" width="24" />
                    </div>
                    <div>
                      <h5 className="text-M-heading-color text-base md:text-lg font-semibold font-jost">
                        Some clinics allow extended consultation time at an
                        additional cost.
                      </h5>
                      <p className="text-M-text-color text-base font-normal font-jost">
                        Dr. Johnson’s exceptional contributions to medicine
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="size-14 bg-M-primary-color text-white rounded-full flex items-center justify-center shrink-0">
                      <Icon icon="fa-regular:hospital" width="24" />
                    </div>
                    <div>
                      <h5 className="text-M-heading-color text-base md:text-lg font-semibold font-jost">
                        Specialized consultations or complex cases may take
                        longer.
                      </h5>
                      <p className="text-M-text-color text-base font-normal font-jost">
                        Dr. Johnson’s exceptional contributions to medicine
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Frequently Asked Questions */}
              <div
                className="bg-white px-7 rounded-md mt-6 border border-M-heading-color/10 lg:scroll-mt-44"
                id="faq"
              >
                <div
                  onClick={() => toggleSection("faq")}
                  className={`flex items-center justify-between py-4 cursor-pointer ${
                    openSections.faq ? "border-b border-M-heading-color/20" : ""
                  }`}
                >
                  <h3 className="font-bold text-lg md:text-xl text-M-heading-color">
                    Frequently Asked Questions
                  </h3>
                  <Icon
                    icon="solar:alt-arrow-up-line-duotone"
                    width="24"
                    height="24"
                    className={`transition-all duration-300 ${
                      openSections.faq ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
                <div
                  className={`space-y-5 transition-all duration-300 overflow-hidden ${
                    openSections.faq ? "max-h-auto py-5" : "max-h-0 py-0"
                  }`}
                >
                  {/* Accordions */}
                  <div className="space-y-5">
                    {faqData.map((item, index) => (
                      <div
                        key={index}
                        className="border border-M-text-color/15 rounded-md overflow-hidden"
                      >
                        {/* Accordion Header */}
                        <h4
                          className="w-full flex items-start justify-between gap-5 cursor-pointer font-bold text-sm md:text-lg bg-M-heading-color text-white p-4"
                          onClick={() => toggleAccordion(index)}
                        >
                          {item.question}
                          <Icon
                            icon={
                              accordionOpenIndex === index
                                ? "simple-line-icons:minus"
                                : "simple-line-icons:plus"
                            }
                            width="24"
                            className="shrink-0"
                          />
                        </h4>

                        {/* Accordion Content */}
                        <div
                          className={`text-M-text-color text-base font-jost font-normal transition-all duration-300 px-4 ${accordionOpenIndex === index ? "py-4 h-auto" : " h-0"}`}
                        >
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div
                className="bg-white px-7 rounded-md mt-6 border border-M-heading-color/10 lg:scroll-mt-44"
                id="location"
              >
                <div
                  onClick={() => toggleSection("location")}
                  className={`flex items-center justify-between py-4 cursor-pointer ${
                    openSections.location
                      ? "border-b border-M-heading-color/20"
                      : ""
                  }`}
                >
                  <h3 className="font-bold text-lg md:text-xl text-M-heading-color">
                    Location
                  </h3>
                  <Icon
                    icon="solar:alt-arrow-up-line-duotone"
                    width="24"
                    height="24"
                    className={`transition-all duration-300 ${
                      openSections.location ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
                <div
                  className={`space-y-5 transition-all duration-300 overflow-hidden ${
                    openSections.location ? "max-h-auto py-5" : "max-h-0 py-0"
                  }`}
                >
                  <iframe
                    className="w-full h-80"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4341.297247711607!2d91.16630457589085!3d2346615419962819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f131!3m3!1m2!1s0x37547ed6b4ea44f7%3A0x6295ef461f485724!2z4Kau4KeB4KaV4KeN4Kak4Ka_IOCmueCmvuCmuOCmquCmvuCmpOCmvuCmsiDgpofgpq7gpr7gprDgp43gppzgp4fgpqjgp43gprjgpr8!5e1!3m2!1sen!2sbd!4v1740654912184!5m2!1sen!2sbd"
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-M-heading-color p-6 px-6 rounded-md">
              <h3 className="text-white text-xl font-semibold pb-2 border-b border-M-primary-color/20">
                Basic Information
              </h3>
              <div>
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-5 mt-6">
                    {/* Icon */}
                    <Icon
                      className="text-M-primary-color shrink-0"
                      icon={item.icon}
                      width="36"
                    />

                    {/* Label and Value */}
                    <div>
                      <h5 className="text-base text-white font-jost font-medium">
                        {item.label}
                      </h5>

                      {/* Conditional Rendering for Links */}
                      {item.type === "phone" ? (
                        <Link
                          href={`tel:${item.value}`}
                          className="text-white/50 hover:text-white transition-all duration-300"
                        >
                          {item.value}
                        </Link>
                      ) : item.type === "email" ? (
                        <Link
                          href={`mailto:${item.value}`}
                          className="text-white/50 hover:text-white transition-all duration-300"
                        >
                          {item.value}
                        </Link>
                      ) : (
                        <p className="text-white/50 hover:text-white transition-all duration-300">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-5 mt-5 border-t border-M-primary-color/20">
                <h3 className="text-white text-xl font-semibold mb-3">
                  Contact For Serial
                </h3>
                <Link
                  href={"tel:+8801601666893"}
                  className="flex items-center gap-3 justify-center py-3 px-2 xl:px-3 rounded-md bg-M-primary-color border border-M-primary-color text-white text-sm xl:text-base font-jost font-medium w-full transition-all duration-300 hover:bg-M-heading-color"
                >
                  {" "}
                  <Image src={callIcon} alt="phone Icon" /> +880 1601 666-893
                </Link>
              </div>
            </div>
            <div className="border border-M-heading-color/20 p-6 px-6 rounded-md">
              <h3 className="text-M-heading-color text-xl font-semibold pb-2 border-b border-M-primary-color/20">
                Available For Appointment
              </h3>
              <div>
                <ul className="flex flex-wrap py-4 gap-3">
                  <li className="text-sm md:text-base p-3 border border-M-heading-color/20 inline-block rounded font-jost bg-M-text-color/10 transition-all duration-300 hover:bg-M-heading-color hover:text-white w-full text-center">
                    8.30 AM - 4:30 PM
                  </li>
                  <li className="text-sm md:text-base p-3 border border-M-heading-color/20 inline-block rounded font-jost bg-M-text-color/10 transition-all duration-300 hover:bg-M-heading-color hover:text-white w-full text-center">
                    8.30 AM - 4:30 PM
                  </li>
                  <li className="text-sm md:text-base p-3 border border-M-heading-color/20 inline-block rounded font-jost bg-M-text-color/10 transition-all duration-300 hover:bg-M-heading-color hover:text-white w-full text-center">
                    8.30 AM - 4:30 PM
                  </li>
                </ul>
                <Link
                  href={"tel:+8801601666893"}
                  className="flex items-center gap-3 justify-center py-3 px-3 rounded-md bg-M-primary-color border border-M-primary-color text-white  text-sm xl:text-base font-jost font-medium w-full transition-all duration-300 hover:bg-M-heading-color uppercase"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDoctor;
