'use client'
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import shapeimg from "@/assets/images/wwShape.png";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";

const WhyChooseUs = ({ whyChooseUsSection }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";

  // Extract the translations for the current language
  const translations = whyChooseUsSection?.translations?.[currentLanguage] || {};
  
  // Destructure translations for easier use
  const { title, subtitle, description, services, image } = translations;
  console.log(services)

  return (
    <div className="container py-24">
      <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-10">
        <div className="relative bg-M-heading-color rounded-lg px-10 pt-14 box-border">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${image}`}
            width={500}
            height={500}
            alt="whyChooseUsImage"
            className="z-10 mx-auto"
          />
           <Image src={shapeimg} alt="wwImage" className="absolute left-0 bottom-0 z-0" />
        </div>
        <div>
          <SectionHeading
            subtitle={subtitle}
            heading={title}
            align="left"
          />
          <p className="text-M-text-color max-w-full lg:max-w-[525px] mt-4">
            {description}
          </p>

          <div className="max-w-full lg:max-w-[525px] space-y-6 mt-7">
            {services && services.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 border border-[#615EFC]/20 p-5 rounded-lg hover:border-[#615EFC] transition-all duration-300"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${item.serviceIcon}`}
                  alt={item.serviceTitle}
                  width={50}
                  height={50}
                  className="shrink-0 w-12 h-14"
                />
                <div>
                  <h4 className="font-bold font-jost text-xl text-M-heading-color">
                    {item.serviceTitle}
                  </h4>
                  <p className="font-jost font-normal text-base text-M-text-color">
                    {item.serviceDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
