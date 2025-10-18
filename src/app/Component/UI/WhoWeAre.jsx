// WhoWeAre.jsx (FIXED)

"use client";
import React, { useState } from "react";
import SectionHeading from "../Shared/SectionHeading/SectionHeading";
import Image from "next/image";
import { useTranslation } from "react-i18next";
// 🔴 fetchDynamicData এবং useEffect (পোলিং) বাদ

const WhoWeAre = ({whoWeAreSection}) => { // ✅ prop ব্যবহার করুন
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language || "en";
    
    // 🔴 useState(whoWeAreSection) এবং useEffect/setInterval লুপ সম্পূর্ণ মুছে ফেলা হয়েছে
    
    // ✅ সরাসরি 'whoWeAreSection' prop ব্যবহার করুন
    const whoWeAre = whoWeAreSection?.data?.translations[currentLanguage].whoWeAre || {};
    const sectionTitle = whoWeAre?.title;
    const sectionSubtitle = whoWeAre?.subtitle;
    const rawTabs = whoWeAre?.tabs || []; // ✅ ডিফল্ট খালি অ্যারে

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

  // ✅ Tab-এর জন্য useState ঠিক আছে
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const activeTabData = tabs.find((tab) => tab.id === activeTab);
  
  // ✅ fallbackImage যোগ করা হয়েছে (যদি ইমেজ না থাকে)
  const fallbackImage = "/assets/placeholder-image.png"; // আপনার একটি ফলব্যাক ইমেজ পাথ দিন

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