// WhyChooseUs.jsx (FIXED)

"use client";

import React from "react"; // 🔴 useEffect, useState বাদ
import { useTranslation } from "react-i18next";
import Image from "next/image";
import shapeimg from "@/assets/images/wwShape.png";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
// 🔴 fetchDynamicData বাদ

const WhyChooseUs = ({ whyChooseUsSection }) => { // ✅ prop ব্যবহার করুন
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";

  // 🔴 useState(whyChooseUsSection) বাদ
  // 🔴 setInterval লুপ সম্পূর্ণ মুছে ফেলা হয়েছে

  // ✅ সরাসরি 'whyChooseUsSection' prop ব্যবহার করুন
  const translations = whyChooseUsSection?.translations?.[currentLanguage] || {};
  
  const { title, subtitle, description, services, image } = translations;

  // Format image path
  const formatImagePath = (imagePath) => {
    if (!imagePath) return null;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${imagePath.replace(/\\/g, '/')}`;
  };
  
  // Format the main image path
  const formattedImage = formatImagePath(image);

  return (
    <div className="container py-12 lg:py-24">
      <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-10">
        <div className="relative bg-M-heading-color rounded-lg px-10 pt-14 box-border">
          {formattedImage ? (
            <Image
              src={formattedImage}
              width={500}
              height={500}
              alt="Why Choose Us"
              className="z-10 mx-auto relative"
              unoptimized={true}
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-300 rounded-lg flex items-center justify-center z-10">
              <p className="text-gray-600 text-lg">Image not available</p>
            </div>
          )}

          <Image src={shapeimg} alt="Background Shape" className="absolute left-0 bottom-0 z-0" />
        </div>
        <div>
          <SectionHeading
            subtitle={subtitle || t("whyChooseUs.defaultSubtitle")}
            heading={title || t("whyChooseUs.defaultTitle")}
            align="left"
          />
          <p className="text-M-text-color max-w-full lg:max-w-[525px] mt-4">
            {description || t("whyChooseUs.defaultDescription")}
          </p>

          <div className="max-w-full lg:max-w-[525px] space-y-6 mt-7">
            {services && services.map((item, index) => {
              // Format service icon path
              const serviceIconPath = formatImagePath(item.serviceIcon);

              return (
                <div
                  key={index}
                  className="flex gap-4 border border-[#615EFC]/20 p-5 rounded-lg hover:border-[#615EFC] transition-all duration-300"
                >
                  {serviceIconPath ? (
                    <Image
                      src={serviceIconPath}
                      alt={item.serviceTitle || `Service ${index + 1}`}
                      width={50}
                      height={50}
                      className="shrink-0 w-12 h-12"
                      unoptimized={true}
                    />
                  ) : (
                    <div className="shrink-0 w-12 h-14 bg-gray-200 rounded-md flex items-center justify-center">
                      <span className="text-gray-400 text-2xl">?</span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold font-jost text-xl text-M-heading-color">
                      {item.serviceTitle}
                    </h4>
                    <p className="font-jost font-normal text-base text-M-text-color">
                      {item.serviceDescription}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;