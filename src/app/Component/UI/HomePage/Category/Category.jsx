'use client';

import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import shape from "@/assets/images/features-shape3.png";
import Link from "next/link";
import Button from "@/app/Component/Shared/Buttons/Button";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";


const Category = ({ departments }) => {
  // console.log(departments);
  
  const { t, i18n } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="min-h-[200px] bg-gray-100 animate-pulse"></div>;

  return (
    <div className="bg-[#E6F5F3] py-[100px] px-[10px]">
      <div className="container">
        <SectionHeading align="center" heading={t('category.title')} subtitle={t('category.subtitle')} />

        {!departments.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-10 mb-10">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white text-center py-8 px-6 rounded-lg overflow-hidden relative">
                <Skeleton circle height={80} width={80} className="mx-auto mb-4" />
                <Skeleton height={20} width={140} className="mx-auto mb-2" />
                <Skeleton height={40} width={40} className="mx-auto rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-10 mb-10">
            {departments.map((department) => (
              <div key={department.id} className="bg-white group text-center py-8 px-6 rounded-lg overflow-hidden relative">
                <Image src={shape} alt="Shape" className="absolute -left-3 top-0 max-w-36 opacity-0 group-hover:opacity-100 group-hover:left-0 transition-all duration-300" />
                <div className="flex items-center justify-center size-20 mx-auto mb-3">
                  <Image src={department.icon} alt={department.translations[i18n.language]?.name} width={80} height={80} className="rounded-full object-cover" unoptimized />
                </div>
                <h3 className="text-xl text-M-heading-color font-bold font-jost">
                  {department.translations[i18n.language]?.name}
                </h3>
                <Link href={`/${i18n.language === 'bn' ? 'bn/' : ''}departments/${department.id}`} className="size-14 inline-flex items-center justify-center bg-[#E6F5F3] text-M-primary-color rounded-full mt-5 origin-center transition-all duration-300 group-hover:bg-M-secondary-color group-hover:text-white">
                  <Icon icon="solar:arrow-right-linear" width={24} height={24} />
                </Link>
              </div>
            ))}
          </div>
        )}

        <Button
          linkHref={`/${i18n.language === 'bn' ? 'bn/' : ''}services`}
          buttonText={t('category.allServices')}
          buttonColor="bg-M-secondary-color"
          textColor="text-white"
          borderColor="border-M-secondary-color"
          padding="py-3 px-8"
          fontSize="text-lg"
          icons="iconamoon:arrow-right-2-light"
          alignment="text-center"
        />
      </div>
    </div>
  );
};

export default Category;
