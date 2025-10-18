// MobileApp.jsx (FIXED)

'use client'
import React from 'react'; // 🔴 useEffect, useState, fetchDynamicData বাদ
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

// Assets
import shape4 from '@/assets/images/shape4.png';
import shape5 from '@/assets/images/shape5.png';
import AppStore from '@/assets/images/appStore.png';
import Gplay from '@/assets/images/Gplay.png';

const MobileApp = ({ downloadAppSection }) => { // ✅ prop ব্যবহার করুন
  const { t, i18n } = useTranslation();
  
  const currentLanguage = i18n.language || 'en';
  
  // 🔴 useState এবং useEffect/setInterval লুপ সম্পূর্ণ মুছে ফেলা হয়েছে
  
  // ✅ সরাসরি 'downloadAppSection' prop ব্যবহার করুন
  const translations = downloadAppSection?.translations?.[currentLanguage] || {};
  
  // Destructure translations for easier use
  const { title, subtitle, description, image } = translations;
  
  // Format image path by replacing backslashes with forward slashes
  const formattedImage = image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${image.replace(/\\/g, '/')}` : null;

  return (
    <div className="bg-[#323290] py-12 lg:py-24 relative">
      <Image src={shape4} alt="shape4" className="absolute right-0 top-0 z-0 hidden md:block" />
      <div className="container">
        <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-0">
          <div className="relative px-0 md:px-20">
            {formattedImage ? (
              <Image
                src={formattedImage}
                width={500}
                height={500}
                alt="mobile app screenshot"
                className="mx-auto relative z-10"
                unoptimized={true}
              />
            ) : (
              <div className="w-[300px] h-[500px] bg-[#4949A5] rounded-3xl mx-auto relative z-10 flex items-center justify-center">
                <p className="text-white text-lg">App Preview</p>
              </div>
            )}
            <Image src={shape5} alt="shape5" className="absolute left-0 bottom-0 z-0 animate-pulse hidden md:block" />
          </div>
          <div>
            <h6 className="text-base text-white font-medium font-jost uppercase mb-3">
              {title || t("mobileApp.defaultTitle")}
            </h6>
            <h2 className="font-jost font-bold text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-white capitalize">
              {subtitle || t("mobileApp.defaultSubtitle")}
            </h2>
            <p className="text-white mt-5 md:mt-7">
              {description || t("mobileApp.defaultDescription")}
            </p>
            <div className="flex gap-6 mt-10">
              <Link href="#">
                <Image src={Gplay} alt='Google Play' className='w-52' />
              </Link>
              <Link href="#">
                <Image src={AppStore} alt='App Store' className='w-52' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;