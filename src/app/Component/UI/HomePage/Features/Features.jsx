'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook

// Import images
import rkShape1 from "@/assets/images/features-shape4.png";
import rkShape2 from "@/assets/images/features-shape3.png";
import rkShape3 from "@/assets/images/features-shape2.png";
import rkShape4 from "@/assets/images/features-shape1.png";

const Features = ({ featuresSection }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";

  // Extract the features translations for the current language
  const features = featuresSection?.translations?.[currentLanguage] || [];

  // Shape images corresponding to each feature
  const shapeImages = [rkShape1, rkShape2, rkShape3, rkShape4];

  return (
    <div className="bg-[#EBF7F6] py-[100px]">
      <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
        {/* Loop through features data and render each card dynamically */}
        {features.map((feature, index) => {
          const shapeImage = shapeImages[index % shapeImages.length];
          const icon = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${feature.icon}`;
          console.log(icon);
          

          return (
            <div key={index} className="bg-white pt-14 pb-10 px-4 text-center rounded-md overflow-hidden group relative group">
              <Image
                src={shapeImage}
                alt="Shape Image"
                className="absolute top-0 left-0 rounded-s-md"
              />
              <Image
                src={icon}
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
              <Link
                href="#"
                className="size-14 inline-flex items-center justify-center bg-[#E6F5F3] rounded-full mt-5 group-hover:-rotate-45 transition-transform duration-300 text-[#39CABB]"
              >
                <Icon icon="solar:arrow-right-linear" width="24" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;


