"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import DoctorsCard from "@/app/Component/Shared/DoctorsCard/DoctorsCard";

import { Icon } from "@iconify/react";
import image1 from "@/assets/images/doctorProfileImg.png";
import image2 from "@/assets/images/doctorProfile1.png";
import image3 from "@/assets/images/doctorProfile2.png";
import image4 from "@/assets/images/doctorProfile3.png";
import image5 from "@/assets/images/doctorProfile4.png";
import Link from "next/link";

const BestDoctors = () => {
  const [activeTab, setActiveTab] = useState("Dermatology");

  const categoryData = [
    { title: "Dermatology" },
    { title: "Cardiology" },
    { title: "Gastroenterology" },
    { title: "Ear-Nose-Throat" },
    { title: "Ophthalmology" },
    { title: "Nephrology" },
  ];

  const doctorsList = [
    {
      name: "Dr. Nahidul Islam",
      specialization: "Dermatology",
      image: image1,
      reviews: 124,
      qualification: "MDS - Periodontology and..",
      profileLink: "#",
      appointmentLink: "#",
    },
    {
      name: "Dr. Alice Johnson",
      specialization: "Cardiology",
      image: image2,
      reviews: 98,
      qualification: "MD - Cardiology",
      profileLink: "#",
      appointmentLink: "#",
    },
    {
      name: "Dr. Michael Brown",
      specialization: "Gastroenterology",
      image: image3,
      reviews: 75,
      qualification: "MD - Gastroenterology",
      profileLink: "#",
      appointmentLink: "#",
    },
    {
      name: "Dr. Sarah Davis",
      specialization: "Ear-Nose-Throat",
      image: image4,
      reviews: 112,
      qualification: "MD - ENT",
      profileLink: "#",
      appointmentLink: "#",
    },
    {
      name: "Dr. Emily Clark",
      specialization: "Ophthalmology",
      image: image5,
      reviews: 134,
      qualification: "MD - Ophthalmology",
      profileLink: "#",
      appointmentLink: "#",
    },
    {
      name: "Dr. John Wilson",
      specialization: "Nephrology",
      image: image4,
      reviews: 108,
      qualification: "MD - Nephrology",
      profileLink: "#",
      appointmentLink: "#",
    },
    {
      name: "Dr. Robert Lewis",
      specialization: "Dermatology",
      image: image1,
      reviews: 152,
      qualification: "MDS - Dermatology",
      profileLink: "#",
      appointmentLink: "#",
    },
    {
      name: "Dr. Jessica Lee",
      specialization: "Cardiology",
      image: image2,
      reviews: 65,
      qualification: "MD - Cardiology",
      profileLink: "#",
      appointmentLink: "#",
    },
    {
      name: "Dr. William Harris",
      specialization: "Gastroenterology",
      image: image3,
      reviews: 120,
      qualification: "MD - Gastroenterology",
      profileLink: "#",
      appointmentLink: "#",
    },
    {
      name: "Dr. Mia Young",
      specialization: "Ear-Nose-Throat",
      image: image4,
      reviews: 80,
      qualification: "MD - ENT",
      profileLink: "#",
      appointmentLink: "#",
    },
    {
      name: "Dr. David Robinson",
      specialization: "Ophthalmology",
      image: image5,
      reviews: 90,
      qualification: "MD - Ophthalmology",
      profileLink: "#",
      appointmentLink: "#",
    },
    {
      name: "Dr. Sophia Martinez",
      specialization: "Nephrology",
      image: image4,
      reviews: 102,
      qualification: "MD - Nephrology",
      profileLink: "#",
      appointmentLink: "#",
    },
  ];

  console.log(doctorsList);
  return (
    <div className="py-[100px]">
      <div className="container">
        <SectionHeading
          heading="Top Rated Specialists"
          subtitle="MEET OUR PROFESSIONALS"
          align="center"
        />
        <div className="p-4 mx-auto mt-8">
          {/* Tab Buttons */}
          <div className="flex justify-between space-x-2 py-4 px-7 bg-M-heading-color rounded-md">
            {categoryData.map((tab) => (
              <button
                key={tab.title}
                onClick={() => setActiveTab(tab.title)}
                className={`px-4 py-2 rounded-md min-w-24 font-semibold font-jost text-base  uppercase hover:bg-white hover:text-M-heading-color transition-all duration-500 relative before:absolute before:-right-[24px] before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-1/2 before:bg-white last:before:hidden  ${
                  activeTab === tab.title ? "text-M-heading-color bg-white" : "text-white "
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Dynamic Tab Content */}
          <div className="mt-4">
            {categoryData.map(
              (tab) =>
                activeTab === tab.title && (
                  <div key={tab.title}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {doctorsList
                        .filter((doctor) => doctor.specialization === tab.title) // Filter doctors by specialization
                        .map((doctor, index) => (
                          <DoctorsCard key={index} doctor={doctor} />
                        ))}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestDoctors;
