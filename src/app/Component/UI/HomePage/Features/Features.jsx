// 'use client'
// import React from "react";
// import Image from "next/image";
// import { useTranslation } from "react-i18next";

// // Import images
// import rkShape1 from "@/assets/images/features-shape4.png";
// import rkShape2 from "@/assets/images/features-shape3.png";
// import rkShape3 from "@/assets/images/features-shape2.png";
// import rkShape4 from "@/assets/images/features-shape1.png";

// const Features = ({ featuresSection }) => {
//   const { i18n } = useTranslation();
//   const currentLanguage = i18n.language || "en";

//   // Extract the features translations for the current language
//   const features = featuresSection?.translations?.[currentLanguage] || [];

//   // Shape images corresponding to each feature
//   const shapeImages = [rkShape1, rkShape2, rkShape3, rkShape4];

//   return (
//     <div className="bg-[#EBF7F6] py-12 lg:py-[100px]">
//       <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
//         {/* Loop through features data and render each card dynamically */}
//         {features.map((feature, index) => {
//           const shapeImage = shapeImages[index % shapeImages.length];
//           const formattedIcon = feature.icon ? 
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/${feature.icon.replace(/\\/g, '/')}` : 
//           null;
//           return (
//             <div key={index} className="bg-white pt-14 pb-10 px-4 text-center rounded-md overflow-hidden group relative group">
//               <Image
//                 src={shapeImage}
//                 alt="Shape Image"
//                 className="absolute top-0 left-0 rounded-s-md"
//               />
//               <Image
//                 src={formattedIcon}
//                 width={96}
//                 height={96}
//                 alt="Main image"
//                 className="w-24 mx-auto group-hover:animate-shake"
//               />
//               <h5 className="text-M-heading-color text-base font-jost mt-5">
//                 {feature.subtitle}
//               </h5>
//               <h3 className="text-xl mt-2" style={{ color: feature.color || "#000" }}>
//                 {feature.title}
//               </h3>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Features;



'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

// Import images
import rkShape1 from "@/assets/images/features-shape4.png";
import rkShape2 from "@/assets/images/features-shape3.png";
import rkShape3 from "@/assets/images/features-shape2.png";
import rkShape4 from "@/assets/images/features-shape1.png";
import { fetchDynamicData } from "@/app/api/dynamicData,";

const Features = ({ featuresSection }) => {
  const { i18n } = useTranslation();
  const [section, setSection] = useState(featuresSection || null);

  // Same polling as your Hero/Testimonials
  useEffect(() => {
    const fetchUpdatedFeatures = async () => {
      try {
        const data = await fetchDynamicData(i18n.language || "en");
        if (data && data.featuresSection) setSection(data.featuresSection);
      } catch (err) {
        console.error("Error fetching updated features:", err);
      }
    };

    // fetch once immediately, then poll every 5s
    fetchUpdatedFeatures();
    const interval = setInterval(fetchUpdatedFeatures, 5000);
    return () => clearInterval(interval);
  }, []); // keep it simple, like your Hero snippet

  const currentLanguage = i18n.language || "en";
  const features = section?.translations?.[currentLanguage] || [];

  const shapeImages = [rkShape1, rkShape2, rkShape3, rkShape4];
  const BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/+$/, "");

  return (
    <div className="bg-[#EBF7F6] py-12 lg:py-[100px]">
      <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
        {/* Loop through features data and render each card dynamically */}
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


