import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import shape from "@/assets/images/features-shape3.png";
import Link from "next/link";
import Button from "@/app/Component/Shared/Buttons/Button";

const Category = ({departments}) => {
  return (
    <div className="bg-[#E6F5F3] py-[100px] px-[10px]">
        <div className="container">
          <SectionHeading align="center" heading="Browse by Specialist" subtitle="Category" />
          {/* Category Data Loading */}
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
                    <Image src={department.icon} alt={department.translations.en.name} width={80} height={80} className="rounded-full object-cover" unoptimized />
                  </div>
                  <h3 className="text-xl text-M-heading-color font-bold font-jost">{department.translations.en.name}</h3>
                  <Link href={`/departments/${department.id}`} className="size-14 inline-flex items-center justify-center bg-[#E6F5F3] text-M-primary-color rounded-full mt-5 origin-center transition-all duration-300 group-hover:bg-M-secondary-color group-hover:text-white">
                    <Icon icon="solar:arrow-right-linear" width={24} height={24} />
                  </Link>
                </div>
              ))}
            </div>
          )}
            {/* Button to view all services */}
          <Button
            linkHref="/services"
            buttonText="All Services"
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