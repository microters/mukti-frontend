// AppointmentProcess.jsx (FIXED)

'use client'
import React from "react"; // 🔴 useEffect, useState বাদ
import { useTranslation } from "react-i18next";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import Image from "next/image";
import shape from "@/assets/images/arrow.png";
// 🔴 fetchDynamicData বাদ

const AppointmentProcess = ({ appointmentProcess }) => { // ✅ prop ব্যবহার করুন
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  // 🔴 useState(...) বাদ
  
  // 🔴 setInterval লুপ সম্পূর্ণ মুছে ফেলা হয়েছে

  // ✅ সরাসরি 'appointmentProcess' prop ব্যবহার করুন
  const features = appointmentProcess?.translations?.[currentLanguage] || [];

  // Function to format image path
  const formatImagePath = (imagePath) => {
    if (!imagePath) return null;
    const formattedPath = imagePath.replace(/\\/g, '/');
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${formattedPath}`;
  };

  return (
    <div className="py-12 lg:py-24 bg-M-section-bg">
      <div className="container">
        <SectionHeading
          heading={t("appointmentProcess.title")} 
          align="center"
          subtitle={t("appointmentProcess.subtitle")}
        />
        <div className="relative">
          <Image
            src={shape}
            alt="shape"
            className="absolute left-1/2 top-[15%] -translate-x-1/2 z-0 w-[60%] hidden md:block"
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 z-10 relative">
            {features.map((feature, index) => {
              // Format the icon path
              const iconSrc = formatImagePath(feature.icon);
              
              return (
                <div key={index} className="text-center group">
                  <div className="w-60 h-56 flex items-center justify-center bg-white mx-auto rounded-3xl mb-10">
                    {iconSrc ? (
                      <Image
                        src={iconSrc}
                        width={150}
                        height={150}
                        alt={feature.title || `icon${index}`}
                        className="group-hover:animate-shake"
                        unoptimized={true}
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto"></div>
                    )}
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-M-heading-color max-w-48 mx-auto">
                    {feature.title} 
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentProcess;