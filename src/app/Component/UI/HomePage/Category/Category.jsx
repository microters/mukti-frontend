'use client';

import { useTranslation } from "react-i18next";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import { Icon } from "@iconify/react";
import Image from "next/image";
import shape from "@/assets/images/features-shape3.png";
import Link from "next/link";
import Button from "@/app/Component/Shared/Buttons/Button";

const Category = ({ departments, locale }) => {
  console.log("Departments passed to Category:", departments); // Debugging
  console.log("Current locale in Category:", locale); // Debugging
  
  const { t, i18n } = useTranslation();
  const currentLanguage = locale || i18n.language || "en"; 

  // Show only the first 12 departments
  const displayedDepartments = departments?.slice(0, 12) || [];

  if (!departments || departments.length === 0) {
    return <div className="min-h-[200px] bg-gray-100 animate-pulse"></div>;
  }

  return (
    <div className="bg-[#E6F5F3] py-12 lg:py-[100px] px-[10px]">
      <div className="container">
        {/* Section Heading */}
        <SectionHeading align="center" heading={t('category.title')} subtitle={t('category.subtitle')} />

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-10 mb-10">
          {/* Mapping over departments */}
          {displayedDepartments.map((department) => {
            // Set department icon, using fallback image if not available
            const departmentIcon = department.icon
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${department.icon}`
              : "/default-profile-photo.png";

            // Get department name and description based on the current language
            const departmentName = department.translations[currentLanguage]?.name || department.translations.en.name;

            return (
              <div key={department.id} className="bg-white group text-center py-8 px-3 md:px-6 rounded-lg overflow-hidden relative">
                <Image
                  src={shape}
                  alt="Shape"
                  className="absolute -left-3 top-0 max-w-36 opacity-0 group-hover:opacity-100 group-hover:left-0 transition-all duration-300"
                />
                <div className="flex items-center justify-center size-20 mx-auto mb-3">
                  <Image
                    src={departmentIcon}
                    alt={departmentName || "Department"}
                    width={80}
                    height={80}
                    className="object-cover"
                    unoptimized
                  />
                </div>
                {/* Department Name */}
                <h3 className="text-base md:text-lg text-M-heading-color font-bold font-jost break-words">
                  {departmentName}
                </h3>
  
                <Link
                  href={`/${currentLanguage === 'bn' ? 'bn/' : ''}treatments/slug`}
                  className="size-14 inline-flex items-center justify-center bg-[#E6F5F3] text-M-primary-color rounded-full mt-5 origin-center transition-all duration-300 group-hover:bg-M-secondary-color group-hover:text-white"
                >
                  <Icon icon="solar:arrow-right-linear" width={24} height={24} />
                </Link>
              </div>
            )
          })}
        </div>

        {/* Button for all services */}
        <Button
          linkHref={`/${currentLanguage === 'bn' ? 'bn/' : ''}treatments`}
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
