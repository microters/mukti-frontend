'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

// Assets
import shape4 from '@/assets/images/shape4.png';
import shape5 from '@/assets/images/shape5.png';
import AppStore from '@/assets/images/appStore.png';
import Gplay from '@/assets/images/Gplay.png';

const MobileApp = ({ downloadAppSection }) => {
  const { t, i18n } = useTranslation(); 
  const currentLanguage = i18n.language || 'en';

  // Extract the translations for the current language
  const translations = downloadAppSection?.translations?.[currentLanguage] || {};

  // Destructure translations for easier use
  const { title, subtitle, description, image } = translations;

  return (
    <div className="bg-[#323290] py-12 lg:py-24 relative">
      <Image src={shape4} alt="shape4" className="absolute right-0 top-0 z-0 hidden md:block" />
      <div className="container">
        <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-0">
          <div className="relative px-0 md:px-20">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${image}`}
              width={500}
              height={500}
              alt="mobileApp"
              className="mx-auto relative z-10"
            />
            <Image src={shape5} alt="shape5" className="absolute left-0 bottom-0 z-0 animate-pulse hidden md:block" />
          </div>
          <div>
            <h6 className="text-base text-white font-medium font-jost uppercase mb-3">{title}</h6>
            <h2 className="font-jost font-bold text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-white capitalize">{subtitle}</h2>
            <p className="text-white mt-5 md:mt-7">{description}</p>
            <div className="flex gap-6 mt-10">
                <Link href="#"><Image src={Gplay} alt='Gplay' className='w-52' /></Link>
                <Link href="#"><Image src={AppStore} alt='AppStore' className='w-52' /></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
