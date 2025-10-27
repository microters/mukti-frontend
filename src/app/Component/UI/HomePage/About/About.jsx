// About.jsx (FIXED)

"use client"; // useTranslation হুকের জন্য এটি থাকবে

import React from "react"; // 🔴 useEffect, useState বাদ
import { useTranslation } from "react-i18next";
import Image from "next/image";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import Button from "@/app/Component/Shared/Buttons/Button";

// Assets
import aboutObject from "@/assets/images/about_object.png";
import aboutShape1 from "@/assets/images/aboutShape1.png";
import aboutShape2 from "@/assets/images/aboutShape2.png";
// 🔴 fetchDynamicData এবং useEffect/useState/setInterval সম্পর্কিত সব কোড বাদ

// ✅ এটি শুধু props এর উপর নির্ভরশীল একটি সাধারণ UI কম্পোনেন্ট।
const About = ({ aboutSection }) => {
  const { t, i18n  } = useTranslation();
  const currentLanguage = i18n.language || "en";

  // 🔴 Polling useEffect এবং useState বাদ

  // ✅ সরাসরি prop থেকে ডেটা ব্যবহার করা হচ্ছে
  const tr = aboutSection?.translations?.[currentLanguage] || {};
  
  const {
    title,
    subtitle,
    description,
    experience,
    services = [],
    images = [],
  } = tr;

  const BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/+$/, "");
  const fmt = (p) => (p || "").replace(/\\/g, "/");
  const formattedImages = Array.isArray(images)
    ? images.map((img) => `${BASE}/${fmt(img)}`)
    : [];

  return (
    <div className="container py-12 lg:py-[100px] flex flex-wrap lg:flex-nowrap gap-10 items-center relative">
      <Image
        src={aboutObject}
        alt="about"
        className="hidden xl:block absolute right-0 bottom-[10%] -z-10 animate-spin"
        unoptimized={true}
      />

      <div className="w-full max-w-[500px] mx-auto lg:w-5/12 md:space-y-6 relative before:size-0 lg:before:size-8 before:bg-M-secondary-color before:rounded-md before:rotate-45 before:absolute before:top-[50%] before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:z-[-1]">
        <Image src={aboutShape2} alt="about shape" className="absolute left-0 top-6 -z-10 animate-spin hidden md:inline-block" />
        <Image src={aboutShape1} alt="about shape" className="absolute left-0 bottom-[7%] -z-10 hidden md:inline-block" />
        
        <div className="grid-cols-1 md:grid-cols-2 gap-6 items-baseline hidden md:grid">
          {formattedImages?.[2] ? (
            <span className="pt-10 pl-10">
              <Image
                src={formattedImages[2]}
                width={600}
                height={600}
                style={{ width: "100%" }}
                alt="about image"
                className="rounded-[35px] rounded-tl-none"
                unoptimized={true}
              />
            </span>
          ) : (
            <div className="pt-10 pl-10 bg-gray-200 h-64 w-full"></div>
          )}
          {formattedImages?.[1] ? (
            <span>
              <Image
                src={formattedImages[1]}
                width={600}
                height={600}
                style={{ width: "100%" }}
                alt="about image"
                className="h-full hidden md:block rounded-[35px] rounded-tr-none"
                unoptimized={true}
              />
            </span>
          ) : (
            <div className="bg-gray-200 h-64 w-full hidden md:block"></div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start px-5">
          {formattedImages?.[0] ? (
            <span className="pb-10 pl-5 hidden md:block">
              <Image
                src={formattedImages[0]}
                width={600}
                height={600}
                style={{ width: "100%" }}
                alt="about image"
                className="rounded-[35px] rounded-bl-none"
                unoptimized={true}
              />
            </span>
          ) : (
            <div className="pb-10 pl-5 bg-gray-200 h-64 w-full hidden md:block"></div>
          )}
          <div className="border border-M-primary-color h-[calc(100%-20px)] flex items-center justify-center rounded-3xl rounded-br-none relative before:w-full before:h-full before:absolute before:bg-[#E6F5F3] before:-top-[10px] before:-left-[10px] before:rounded-3xl before:rounded-br-none before:-z-10 ml-3 mt-2"> 
            <div className="text-center relative py-20">
              <h4 className="font-semibold font-poppins text-6xl text-[#39CABB]">{experience || "0"}</h4>
              <p className="font-jost font-bold text-xl">{t("about.yearExperience")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-7/12 space-y-6">
        <SectionHeading
          subtitle={subtitle || t("about.defaultSubtitle")}
          heading={title || t("about.defaultTitle")}
        />
        <p className="text-M-text-color font-jost text-base">{description || t("about.defaultDescription")}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2 max-w-[600px]">
          {services && services.length > 0 ? services.map((service, index) => (
            <div key={index} className="border border-[#323290] rounded-md pr-3 flex items-center gap-4 overflow-hidden group">
              <div className="w-20 h-16 bg-[#323290]/10 flex items-center justify-center rounded-s-md rounded-r-[30px]">
                {service.icon && (
                  <Image 
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${service.icon}`} 
                    width={36} 
                    height={36} 
                    alt={service.serviceTitle || "service icon"} 
                    className="group-hover:animate-shake shrink-0"
                    unoptimized={true}
                  />
                )}
              </div>
              <h4 className="text-base text-M-heading-color">{service.serviceTitle}</h4>
            </div>
          )) : (
            <div className="col-span-2">
              <p className="text-M-text-color">{t("about.noServicesAvailable")}</p>
            </div>
          )}
        </div>

        <Button
          linkHref="/about"
          buttonText={t("about.learnMore")} 
          buttonColor="bg-M-secondary-color"
          textColor="text-white"
          borderColor="border-M-secondary-color"
          padding="py-3 px-8"
          fontSize="text-lg"
          icons="iconamoon:arrow-right-2-light"
        />
      </div>
    </div>
  );
};

export default About;