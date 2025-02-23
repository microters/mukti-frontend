"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

import drImage from "@/assets/images/doctor-profile.jpg";
import verified from "@/assets/images/badge.png";
import hLogo from "@/assets/images/HLogo.png";
import badge from "@/assets/images/badgeAward.png";

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

  // Toggle visibility based on section id
  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the specific section's visibility
    }));
  };

  return (
    <div>
      {/* Hero Area */}
      <div className="bg-[url(@/assets/images/inner-hero-bg.jpg)] bg-cover bg-top">
        <div className="h-96 px-3 bg-gradient-to-t from-[#009650be] to-[#323290be] relative"></div>
      </div>

      <div className="container pb-24 relative -mt-24 z-50">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-3">
            <div className="flex gap-6 bg-white shadow-md px-7 py-6 rounded-md">
              <Image
                src={drImage}
                alt="dr image"
                className="size-32 rounded-full border-2 border-M-primary-color"
              />
              <div className="w-full">
                <div className="flex items-start justify-between w-full border-b border-M-primary-color/20 pb-4">
                  <div>
                    <h3 className="flex gap-3 items-center text-M-heading-color text-2xl mb-1">
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
                <div className="pt-4 flex items-start gap-6">
                  <p className="text-M-text-color text-base font-normal font-jost flex items-start gap-2 basis-80">
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
            {/* filter List */}
            <div className="flex gap-6 bg-white px-7 py-6 rounded-md mt-6 border border-M-heading-color/10">
              <ul className="flex flex-wrap gap-4">
                {tabs.map((tab) => (
                  <li key={tab.id} className="inline-block">
                    <Link
                      href={tab.id}
                      className="inline-block px-4 py-2 border border-M-heading-color/20 rounded-md text-M-text-color font-jost font-normal uppercase hover:bg-M-heading-color hover:text-white transition-all duration-300"
                    >
                      {tab.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Short Bio */}
            <div className="bg-white px-7 rounded-md mt-6 border border-M-heading-color/10">
              <div
                onClick={() => toggleSection("shortBio")}
                className={`flex items-center justify-between  py-4 cursor-pointer ${
                  openSections.shortBio
                    ? "border-b border-M-heading-color/20"
                    : ""
                }`}
              >
                <h3 className="font-bold text-xl text-M-heading-color">
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
                <p className="font-jost font-normal text-base text-M-text-color">
                  Dr. Alex Johnson is a highly experienced and dedicated
                  physician specializing in internal medicine with over 15 years
                  of clinical expertise. He is widely recognized for his
                  patient-centered approach and unwavering commitment to
                  providing quality healthcare. Dr. Johnson is passionate about
                  diagnosing and managing a wide range of acute and chronic
                  illnesses, ensuring that every patient receives personalized
                  and effective treatment plans tailored to their unique needs.
                  His approachable demeanor, meticulous diagnostic skills, and
                  comprehensive care have earned him the trust and respect of
                  patients and colleagues alike.
                </p>
                <p className="font-jost font-normal text-base text-M-text-color">
                  Dr. Johnson’s philosophy of care is rooted in preventive
                  medicine and holistic wellness, empowering patients to lead
                  healthier lives through education and proactive measures. In
                  addition to his clinical practice, he actively contributes to
                  medical research and education, staying at the forefront of
                  advancements in internal medicine to offer the best care
                  possible.
                </p>
                <button className="flex items-center gap-2 text-M-primary-color">
                  <Icon icon="icons8:plus" width="20" height="20" /> Show More
                </button>
              </div>
            </div>

            {/* Practice Experience */}
            <div className="bg-white px-7 rounded-md mt-6 border border-M-heading-color/10">
              <div
                onClick={() => toggleSection("practiceExperience")}
                className={`flex items-center justify-between py-4 cursor-pointer ${
                  openSections.practiceExperience
                    ? "border-b border-M-heading-color/20"
                    : ""
                }`}
              >
                <h3 className="font-bold text-xl text-M-heading-color">
                  Practice Experience
                </h3>
                <Icon
                  icon="solar:alt-arrow-up-line-duotone"
                  width="24"
                  height="24"
                  className={`transition-all duration-300 ${
                    openSections.practiceExperience ? "rotate-180" : "rotate-0"
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
                <div className="flex gap-6">
                  <div className="size-36 flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-M-heading-color/20">
                    <Image src={hLogo} alt="h-logo" />
                  </div>
                  <div>
                    <h4 className="text-xl text-M-heading-color font-bold font-jost mb-2">
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
                <div className="flex gap-6">
                  <div className="size-36 flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-M-heading-color/20">
                    <Image src={hLogo} alt="h-logo" />
                  </div>
                  <div>
                    <h4 className="text-xl text-M-heading-color font-bold font-jost mb-2">
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
            <div className="bg-white px-7 rounded-md mt-6 border border-M-heading-color/10">
              <div
                onClick={() => toggleSection("treatments")}
                className={`flex items-center justify-between py-4 cursor-pointer ${
                  openSections.treatments
                    ? "border-b border-M-heading-color/20"
                    : ""
                }`}
              >
                <h3 className="font-bold text-xl text-M-heading-color">
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
            <div className="bg-white px-7 rounded-md mt-6 border border-M-heading-color/10">
              <div
                onClick={() => toggleSection("awardsAchievements")}
                className={`flex items-center justify-between py-4 cursor-pointer ${
                  openSections.awardsAchievements
                    ? "border-b border-M-heading-color/20"
                    : ""
                }`}
              >
                <h3 className="font-bold text-xl text-M-heading-color">
                  Awards & Achievements
                </h3>
                <Icon
                  icon="solar:alt-arrow-up-line-duotone"
                  width="24"
                  height="24"
                  className={`transition-all duration-300 ${
                    openSections.awardsAchievements ? "rotate-180" : "rotate-0"
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
                <p className="text-M-text-color text-base font-normal font-jost ">Dr. Johnson’s exceptional contributions to medicine and patient care have been widely recognized through numerous awards and honors. Dr. Johnson’s exceptional contributions to medicine and patient care have been widely recognized through numerous awards and honors.</p>
                <div className="flex  gap-5">
                    <Image src={badge} alt="badge" className="w-14 shrink-0" />
                    <div className="space-y-1">
                        <h4>Excellence in Patient Care Award – 2023</h4>
                        <p className="text-M-text-color font-jost text-base">Honored for his outstanding commitment to patient satisfaction and clinical excellence.</p>
                    </div>
                </div>
                <div className="flex  gap-5">
                    <Image src={badge} alt="badge" className="w-14 shrink-0" />
                    <div className="space-y-1">
                        <h4>Excellence in Patient Care Award – 2023</h4>
                        <p className="text-M-text-color font-jost text-base">Honored for his outstanding commitment to patient satisfaction and clinical excellence.</p>
                    </div>
                </div>
              </div>
            </div>

            {/* Conditions */}
            <div className="bg-white px-7 rounded-md mt-6 border border-M-heading-color/10">
              <div
                onClick={() => toggleSection("conditions")}
                className={`flex items-center justify-between py-4 cursor-pointer ${
                  openSections.conditions
                    ? "border-b border-M-heading-color/20"
                    : ""
                }`}
              >
                <h3 className="font-bold text-xl text-M-heading-color">
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
          </div>
          <div className="bg-M-heading-color">sidebar</div>
        </div>
      </div>
    </div>
  );
};

export default SingleDoctor;
