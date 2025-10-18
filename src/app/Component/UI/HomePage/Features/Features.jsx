// Features.jsx (FIXED)

'use client'
import React from "react"; // 🔴 useEffect, useState বাদ
import Image from "next/image";
import { useTranslation } from "react-i18next";

// Import images
import rkShape1 from "@/assets/images/features-shape4.png";
import rkShape2 from "@/assets/images/features-shape3.png";
import rkShape3 from "@/assets/images/features-shape2.png";
import rkShape4 from "@/assets/images/features-shape1.png";
// 🔴 fetchDynamicData এবং useEffect/useState/setInterval সম্পর্কিত সব কোড বাদ

// ✅ 'featuresSection' prop হিসেবে নিন
const Features = ({ featuresSection }) => {
  const { i18n } = useTranslation();
  
  // 🔴 Polling useEffect এবং useState বাদ

  const currentLanguage = i18n.language || "en";
  
  // ✅ সরাসরি prop ব্যবহার করুন, state নয়
  const features = featuresSection?.translations?.[currentLanguage] || [];

  const shapeImages = [rkShape1, rkShape2, rkShape3, rkShape4];
  const BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/+$/, "");

  return (
    <div className="bg-[#EBF7F6] py-12 lg:py-[100px]">
      <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
        {features.map((feature, index) => {
          const shapeImage = shapeImages[index % shapeImages.length];
          const formattedIcon = feature.icon
            ? `${BASE}/${(feature.icon || "").replace(/\\/g, "/")}`
            : null;
          return (
            <div key={index} className="bg-white pt-14 pb-10 px-4 text-center rounded-md overflow-hidden group relative group">
              <Image
                src={shapeImage}
                alt="Shape Image"
                className="absolute top-0 left-0 rounded-s-md"
              />
              <Image
                src={formattedIcon}
                width={96}
                height={96}
                alt="Main image"
                className="w-24 mx-auto group-hover:animate-shake"
              />
              <h5 className="text-M-heading-color text-base font-jost mt-5">
                {feature.subtitle}
              </h5>
              <h3 className="text-xl mt-2" style={{ color: feature.color || "#000" }}>
                {feature.title}
              </h3>
            </div>
          );
        })} 
      </div>
    </div>
  );
};

export default Features;