"use client";
import React, { useState } from "react";
import SectionHeading from "../Shared/SectionHeading/SectionHeading";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const WhoWeAre = ({whoWeAreSection}) => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language || "en";
    const whoWeAre = whoWeAreSection?.data?.translations[currentLanguage].whoWeAre || {};
    const sectionTitle = whoWeAre?.title;
    const sectionSubtitle = whoWeAre?.subtitle;
    const rawTabs = whoWeAre?.tabs;

  const tabs = rawTabs.map((tab) => {
    // Generate an ID from the tab title for the activeTab logic
    const id = tab.title.replace(/\s+/g, "-").toLowerCase(); 
    return {
      id,
      label: tab.title,
      content: tab.description,
      image: tab.image,
    };
  });

  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="bg-M-section-bg pt-24">
      <div className="container">
        <SectionHeading
          subtitle={sectionTitle}
          heading={sectionSubtitle}
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

          {/* Tab Content (selected by activeTab) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5 xl:gap-24 mt-5">
            <div>
              <h3 className="text-3xl text-M-heading-color font-bold mb-5">
                {activeTabData?.label}
              </h3>
              <p className="font-jost font-normal text-M-text-color text-base">
                {activeTabData?.content}
              </p>
            </div>
            <div>
              <Image
                src={
                  activeTabData?.image
                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${activeTabData.image}`
                    : fallbackImage
                }
                alt={activeTabData?.label || "Tab Image"}
                width={500}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;

// "use client";

// import React, { useEffect, useState, useMemo, useRef } from "react";
// import { useTranslation } from "react-i18next";
// import Image from "next/image";
// import SectionHeading from "../Shared/SectionHeading/SectionHeading";
// import { fetchDynamicData } from "@/app/api/dynamicData,";

// const WhoWeAre = ({ whoWeAreSection }) => {
//   const { t, i18n } = useTranslation();
//   const currentLanguage = i18n.language || "en";
  
//   const [section, setSection] = useState(whoWeAreSection || null);
//   const [activeTab, setActiveTab] = useState(""); // active tab ID
//   const previousImages = useRef({}); // cache-busting for images

//   // Function to fetch fresh data from backend
//   const fetchUpdatedData = async () => {
//     try {
//       const data = await fetchDynamicData(currentLanguage); // ensure fetchDynamicData uses cache: "no-store"
//       if (data?.whoWeAreSection) {
//         // Deep clone to guarantee new object reference
//         setSection(JSON.parse(JSON.stringify(data.whoWeAreSection)));
//       }
//     } catch (e) {
//       console.error("Error fetching WhoWeAre section:", e);
//     }
//   };

//   // Polling every 5 seconds for live updates
//   useEffect(() => {
//     fetchUpdatedData(); // initial fetch
//     const intervalId = setInterval(fetchUpdatedData, 5000);
//     return () => clearInterval(intervalId);
//   }, [currentLanguage]);

//   // Extract the translated section
//   const whoWeAre =
//     section?.data?.translations?.[currentLanguage]?.whoWeAre || {};

//   const sectionTitle = whoWeAre?.title || t("whoWeAre.defaultTitle");
//   const sectionSubtitle = whoWeAre?.subtitle || t("whoWeAre.defaultSubtitle");
//   const rawTabs = whoWeAre?.tabs || [];

//   // Map tabs to a usable format
//   const tabs = rawTabs.map((tab) => ({
//     id: tab.title.replace(/\s+/g, "-").toLowerCase(),
//     label: tab.title,
//     content: tab.description,
//     image: tab.image,
//   }));

//   // Reset active tab whenever tabs change or section updates
//   useEffect(() => {
//     if (tabs.length) {
//       setActiveTab(tabs[0].id);
//     }
//   }, [tabs]);

//   const activeTabData = tabs.find((tab) => tab.id === activeTab);

//   const BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/+$/, "");
//   const fmt = (p) => (p || "").replace(/\\/g, "/");

//   // Cache-busting for active tab image
//   let activeImageUrl = "";
//   if (activeTabData?.image) {
//     if (
//       !previousImages.current[activeTabData.id] ||
//       previousImages.current[activeTabData.id] !== activeTabData.image
//     ) {
//       previousImages.current[activeTabData.id] = activeTabData.image;
//       activeImageUrl = `${BASE}/${fmt(activeTabData.image)}?t=${Date.now()}`;
//     } else {
//       activeImageUrl = `${BASE}/${fmt(activeTabData.image)}`;
//     }
//   }

//   return (
//     <div className="bg-M-section-bg pt-24">
//       <div className="container">
//         <SectionHeading
//           subtitle={sectionTitle}
//           heading={sectionSubtitle}
//           align="center"
//         />

//         <div className="mt-10">
//           {/* Tab List */}
//           <ul className="bg-[#F9FAFB] py-3 px-10 flex items-center justify-center gap-6 max-w-[600px] mx-auto rounded-md">
//             {tabs.map((tab, index) => (
//               <li key={tab.id} className="relative">
//                 <button
//                   className={`px-4 py-2 font-jost font-normal text-lg rounded-md transition-colors duration-300 ${
//                     activeTab === tab.id
//                       ? "bg-white text-M-heading-color shadow"
//                       : "text-M-text-color"
//                   }`}
//                   onClick={() => setActiveTab(tab.id)}
//                 >
//                   {tab.label}
//                 </button>

//                 {index < tabs.length - 1 && (
//                   <span className="w-[1px] h-1/2 border-l border-dashed border-M-text-color absolute -right-3 top-1/2 -translate-y-1/2"></span>
//                 )}
//               </li>
//             ))}
//           </ul>

//           {/* Tab Content */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5 xl:gap-24 mt-5">
//             <div>
//               <h3 className="text-3xl text-M-heading-color font-bold mb-5">
//                 {activeTabData?.label}
//               </h3>
//               <p className="font-jost font-normal text-M-text-color text-base">
//                 {activeTabData?.content || t("whoWeAre.noContent")}
//               </p>
//             </div>

//             <div className="relative">
//               {activeTabData?.image ? (
//                 <Image
//                   // Add timestamp to force browser to reload updated image
//                   src={activeImageUrl}
//                   alt={activeTabData.label}
//                   width={500}
//                   height={400}
//                   className="w-full h-auto rounded-2xl"
//                   unoptimized={true}
//                 />
//               ) : (
//                 <div className="w-full h-64 bg-gray-100 rounded-2xl"></div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WhoWeAre;
