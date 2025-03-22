"use client";
import React, { useState } from "react";
import { Icon, InlineIcon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import verified from "@/assets/images/badge.png";
import badge from "@/assets/images/badgeAward.png";
import callIcon from "@/assets/images/phone2.png";

const SingleDoctorInfo = ({ doctor }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [accordionOpenIndex, setAccordionOpenIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSections, setOpenSections] = useState({
    shortBio: true,
    treatments: true,
    awardsAchievements: true,
    conditions: true,
    followUpFee: true,
    avgConsultationTime: true,
    faq: true,
    location: true,
  });
  if (!doctor) return <p>No doctor data available</p>;
  if (!doctor || !doctor.translations) return null;

  // Extract translations (default to English)
  const translations = doctor.translations["en"] || doctor.translations || {};

  // Create a structured doctor object
  const doctorData = {
    id: doctor.id || "N/A",
    email: doctor.email || "N/A",
    slug: doctor.slug || "N/A",
    name: translations.name || "Unknown Doctor",
    designation: translations.designation || "N/A",
    gender: translations.gender || "N/A",
    department: translations.department || "N/A",
    shortBio: translations.shortBio || "No bio available",
    academicQualification: translations.academicQualification || "N/A",
    yearsOfExperience: translations.yearsOfExperience || "N/A",
    appointmentFee: translations.appointmentFee || "N/A",
    followUpFee: translations.followUpFee || "N/A",
    patientAttended: translations.patientAttended || "N/A",
    avgConsultationTime: translations.avgConsultationTime || "N/A",
    icon: doctor.icon
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${doctor.icon}`
      : "/default-profile-photo.png",
    memberships: Array.isArray(doctor.memberships) ? doctor.memberships : [],
    awards: Array.isArray(doctor.awards) ? doctor.awards : [],
    treatments: Array.isArray(doctor.treatments) ? doctor.treatments : [],
    conditions: Array.isArray(doctor.conditions) ? doctor.conditions : [],
    schedule: Array.isArray(doctor.schedule)
      ? doctor.schedule.map((slot) => ({
          day: slot.day || "N/A",
          startTime: slot.startTime || "N/A",
          endTime: slot.endTime || "N/A",
        }))
      : [],
    faqs: Array.isArray(doctor.faqs)
      ? doctor.faqs.map((faq) => ({
          question: faq.question || "No question available",
          answer: faq.answer || "No answer available",
        }))
      : [],
  };

  // console.log(doctorData.treatments)

  const maxWords = 100;
  // Ensure doctorData.shortBio exists before splitting
  const wordsArray = doctorData.shortBio ? doctorData.shortBio.split(" ") : [];

  // Log the words array for debugging
  // console.log("Short Bio Words Array:", wordsArray);

  // console.log("Formatted Doctor Data:", doctorData);

  const tabs = [
    { name: "Short Bio", id: "shortBio" },
    { name: "Treatments", id: "treatments" },
    { name: "Awards & Achievements", id: "awardsAchievements" },
    { name: "Conditions", id: "conditions" },
    { name: "Follow-Up Fee", id: "followUpFee" },
    { name: "Avg Consultation Time", id: "avgConsultationTime" },
    { name: "FAQ", id: "faq" },
    { name: "Location", id: "location" },
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
      <div className="bg-[url(../../public/assets/inner-hero-bg.jpg)] bg-cover bg-top hidden md:block ">
        <div className="h-96 px-3 bg-gradient-to-t from-[#009650be] to-[#323290be] relative"></div>
      </div>

      <div className="container pb-10 md:pb-24 relative pt-10 md:-mt-24 z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="flex flex-col md:flex-row gap-6 bg-white shadow border border-M-text-color/10 px-4 md:px-7 py-6 rounded-md">
              <div className="w-full h-32 max-w-32 rounded-full border-2 border-M-primary-color overflow-hidden">
                <Image
                  src={doctorData?.icon}
                  width={100}
                  height={100}
                  alt="dr image"
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <div className="flex flex-wrap gap-3 items-start justify-between w-full border-b border-M-primary-color/20 pb-4">
                  <div>
                    <h3 className="flex gap-3 items-center text-M-heading-color text-lg md:text-2xl mb-1">
                      {doctorData.name}
                      <Image src={verified} alt="verified" className="w-5" />
                    </h3>
                    <p className="font-jost text-M-text-color text-base">
                      {doctorData.department} at Mukti Hospital
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
                      {doctorData.academicQualification}
                      <br />{" "}
                      <strong>
                        {doctorData.designation}, {doctorData.department} <br />
                        Cumilla Medical College Hospital
                      </strong>
                      <Link
                        href="#"
                        className="inline-flex items-center text-M-primary-color mt-2 hover:text-M-heading-color transition-all duration-300 font-jost font-medium"
                      >
                        Book An Appointment <Icon icon="iconoir:nav-arrow-right" width="20" height="20" />
                      </Link>
                    </span>
                  </p>
                  <p className="text-M-text-color text-base font-normal font-jost flex items-center gap-2">
                    <Icon
                      icon="mdi:location-on-outline"
                      width="24"
                      className="text-M-heading-color shrink-0 relative "
                    />
                    Cumilla, Bangladesh
                  </p>
                  <p className="text-M-text-color text-base font-normal font-jost flex items-center gap-2">
                    <Icon
                      icon="icon-park-outline:hospital-three"
                      width="24"
                      className="text-M-heading-color shrink-0 relative "
                    />
                    {doctorData.yearsOfExperience} Years Experience
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* filter List */}
              <div className="flex gap-6 bg-white px-7 py-6 rounded-md mt-6 border border-M-heading-color/10 lg:sticky top-1 z-20">
                <ul className="flex flex-wrap gap-4">
                  {tabs.map((tab) => (
                    <li key={tab.id} className="inline-block">
                      <Link
                        href={"#" + tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`inline-block px-2 py-1 md:px-4 md:py-2 border border-M-heading-color/20 rounded-md text-M-text-color text-sm md:text-base font-jost font-normal uppercase transition-all duration-300 
                            ${
                              activeTab === tab.id
                                ? "bg-M-heading-color text-white"
                                : "hover:bg-M-heading-color hover:text-white"
                            }`}
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
                      {doctorData.shortBio}
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
                  <ul className="flex flex-wrap gap-3">
                    {doctorData.treatments.map((item, index) => (
                      <li key={index} className="inline-block">
                        <Link
                          href="#"
                          className="text-M-primary-color text-base font-jost font-normal bg-M-primary-color/5 rounded-md px-4 py-2 inline-flex gap-2 items-center hover:bg-M-primary-color hover:text-white transition-all duration-300"
                        >
                          {item}
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
                  {doctorData.awards?.map((award, index) => (
                    <div key={index} className="flex gap-5">
                      <Image
                        src={badge}
                        alt="badge"
                        className="w-14 h-14 shrink-0"
                      />
                      <div className="space-y-1">
                        <h4>{award}</h4>
                        <p className="text-M-text-color font-jost text-base">
                          Honored for his outstanding commitment to patient
                          satisfaction and clinical excellence.
                        </p>
                      </div>
                    </div>
                  ))}
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
                  <ul className="flex flex-wrap gap-3">
                    {doctorData.treatments.map((item, index) => (
                      <li key={index} className="inline-block">
                        <Link
                          href="#"
                          className="text-M-heading-color text-base font-jost font-normal bg-M-text-color/5 rounded-md px-4 py-2 inline-flex gap-2 items-center hover:bg-M-heading-color hover:text-white transition-all duration-300"
                        >
                          {item}
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
                  <div>
                    <h5 className="text-base text-M-heading-color font-jost font-semibold">
                      Within 7-14 Days:
                    </h5>
                    <p className="text-base text-M-text-color font-jost">
                      Fee : {doctorData.followUpFee} TK
                    </p>
                  </div>
                  <div>
                    <h5 className="text-base text-M-heading-color font-jost font-semibold">
                      Same Condition Follow-Up:
                    </h5>
                    <p className="text-base text-M-text-color font-jost">
                      Fee : {doctorData.followUpFee} TK
                    </p>
                  </div>
                  <div>
                    <h5 className="text-base text-M-heading-color font-jost font-semibold">
                      Specialist Consultation:
                    </h5>
                    <p className="text-base text-M-text-color font-jost">
                      Fee : {doctorData.followUpFee} TK
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
                        Time: {doctorData.avgConsultationTime} minutes.
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
                    {doctorData.faqs.map((item, index) => (
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
          <div className="space-y-8 relative">
            <div className="bg-M-heading-color p-6 px-6 rounded-md">
              <h3 className="text-white text-xl font-semibold pb-2 border-b border-M-primary-color/20">
                Basic Information
              </h3>
              <div>
                <div className="flex items-start gap-5 mt-6">
                  {/* Icon */}
                  <Icon
                    className="text-M-primary-color shrink-0"
                    icon="solar:call-medicine-rounded-broken"
                    width="36"
                  />

                  {/* Label and Value */}
                  <div>
                    <h5 className="text-base text-white font-jost font-medium">
                      Phone Number
                    </h5>
                    <Link
                      href="tel: 018778878787"
                      className="text-white/50 hover:text-white transition-all duration-300"
                    >
                      018778878787
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-5 mt-6">
                  {/* Icon */}
                  <Icon
                    className="text-M-primary-color shrink-0"
                    icon="clarity:envelope-line"
                    width="36"
                  />
                  {/* Label and Value */}
                  <div>
                    <h5 className="text-base text-white font-jost font-medium">
                      Email
                    </h5>
                    <Link
                      href={`mailto:${doctorData.email}`}
                      className="text-white/50 hover:text-white transition-all duration-300 break-all"
                    >
                      {doctorData.email}
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-5 mt-6">
                  {/* Icon */}
                  <Icon
                    className="text-M-primary-color shrink-0"
                    icon="solar:user-outline"
                    width="36"
                  />

                  {/* Label and Value */}
                  <div>
                    <h5 className="text-base text-white font-jost font-medium">
                      Gender
                    </h5>
                    <p className="text-white/50 hover:text-white transition-all duration-300">
                      {doctorData.gender}
                    </p>
                  </div>
                </div>
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
            {/* Visiting Fee */}
            <div className="border border-M-heading-color/20 p-6 px-6 rounded-md">
              <h3 className="text-M-heading-color text-xl font-semibold pb-2 border-b text-center border-M-primary-color/20">
                Visiting Fee
              </h3>
              <div className="mt-4">
                <h5 className="text-base text-M-heading-color font-jost font-semibold">
                  Appointment:
                </h5>
                <p className="text-base text-M-text-color font-jost">
                  Fee : {doctorData.appointmentFee} Tk
                </p>
              </div>
              <div className="mt-4">
                <h5 className="text-base text-M-heading-color font-jost font-semibold">
                  Same Condition Follow-Up:
                </h5>
                <p className="text-base text-M-text-color font-jost">
                  Fee : {doctorData.followUpFee} TK
                </p>
              </div>
              <div className="mt-4">
                <h5 className="text-base text-M-heading-color font-jost font-semibold">
                  Specialist Consultation:
                </h5>
                <p className="text-base text-M-text-color font-jost">
                  Fee : {doctorData.followUpFee} TK
                </p>
              </div>
            </div>
            {/* Appointment Time */}
            <div className="border border-M-heading-color/20 p-6 px-6 rounded-md sticky top-1">
              <h3 className="text-M-heading-color text-xl font-semibold pb-2 border-b border-M-primary-color/20 text-center">
                Available For Appointment
              </h3>
              <div>
                <ul className="flex flex-wrap py-4 gap-3">
                  {doctorData.schedule.map((item, index) => {
                    // Convert time to 12-hour format with AM/PM
                    const convertTo12HourFormat = (time) =>
                      new Date(`2025-01-01T${time}:00`).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      );

                    // Convert the day to short form (e.g., "Wednesday" to "Wed")
                    const dayShortForm = {
                      Sunday: "Sun",
                      Monday: "Mon",
                      Tuesday: "Tue",
                      Wednesday: "Wed",
                      Thursday: "Thu",
                      Friday: "Fri",
                      Saturday: "Sat",
                    };
                    const shortDay = dayShortForm[item.day] || item.day;
                    return (
                      <li
                        key={index}
                        className="text-sm md:text-base p-3 border border-M-heading-color/20 inline-flex flex-wrap justify-center gap-2 rounded font-jost bg-M-text-color/10 transition-all duration-300 hover:bg-M-heading-color hover:text-white w-full text-center"
                      >
                        <strong>{shortDay}: </strong>
                        {convertTo12HourFormat(item.startTime)} -{" "}
                        {convertTo12HourFormat(item.endTime)}
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href="#"
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
export default SingleDoctorInfo;
