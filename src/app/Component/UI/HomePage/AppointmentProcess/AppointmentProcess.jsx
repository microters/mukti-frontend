'use client'
import React from "react";
import { useTranslation } from "react-i18next"; 
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import Image from "next/image";

// Assets
import shape from "@/assets/images/arrow.png";

const AppointmentProcess = ({ appointmentProcess }) => {
  const { t, i18n } = useTranslation(); 
  const currentLanguage = i18n.language || 'en';

  // Extract the translations for the current language
  const features = appointmentProcess?.translations?.[currentLanguage] || [];

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
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-60 h-56 flex items-center justify-center bg-white mx-auto rounded-3xl mb-10">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${feature.icon}`}
                    width={150}
                    height={150}
                    alt={`icon${index}`}
                    className="group-hover:animate-shake"
                  />
                </div>
                <h3 className="font-bold text-lg sm:text-xl text-M-heading-color md:max-w-48 mx-auto">
                  {feature.title}  {/* Translated title */}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentProcess;
