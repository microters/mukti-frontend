"use client";
import React, { useState } from "react";
import SectionHeading from "../Shared/SectionHeading/SectionHeading";
import Image from "next/image";
import img1 from "@/assets/images/about-img22.png";

const WhoWeAre = () => {
  const tabs = [
    {
      id: "about",
      label: "About Us",
      content:
        "Mukti Hospital is a state-of-the-art healthcare facility that combines advanced medical expertise with a patient-centric approach. With a team of highly skilled doctors, nurses, and medical professionals, we are dedicated to offering comprehensive, personalized, and affordable healthcare services.",
    },
    {
      id: "mission",
      label: "Our Mission",
      content:
        "Our mission is to provide high-quality, accessible, and affordable healthcare services while continuously innovating to enhance patient outcomes and experiences.",
    },
    {
      id: "vision",
      label: "Our Vision",
      content:
        "To be a global leader in healthcare by setting new standards in medical excellence, patient care, and research, ensuring a healthier future for all.",
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="bg-M-section-bg pt-24">
      <div className="container">
        <SectionHeading
          subtitle="Who We Are"
          heading="Empowering Your Vision"
          align="center"
        />
        <div className="mt-10">
          {/* Tab List */}
          <ul className="bg-[#F9FAFB] py-3 px-10 flex items-center justify-center gap-6 max-w-[600px] mx-auto rounded-md">
            {tabs.map((tab, index) => (
              <li key={tab.id} className="relative">
                <button
                  className={`px-4 py-2 font-jost font-normal text-lg rounded-md transition-colors duration-300 ${
                    activeTab === tab.id
                      ? "bg-white text-M-heading-color shadow"
                      : "text-M-text-color"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
                {index < tabs.length - 1 && (
                  <span className="w-[1px] h-1/2 border-l border-dashed border-M-text-color absolute -right-3 top-1/2 -translate-y-1/2"></span>
                )}
              </li>
            ))}
          </ul>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5 xl:gap-24 mt-5">
            <div>
              <h3 className="text-3xl text-M-heading-color font-bold mb-5">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </h3>
              <p className="font-jost font-normal text-M-text-color text-base">
                {tabs.find((tab) => tab.id === activeTab)?.content}
              </p>
            </div>
            <div>
              <Image src={img1} alt="About Image" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
