import SectionHeading from '@/app/Component/Shared/SectionHeading/SectionHeading';
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import Button from '@/app/Component/Shared/Buttons/Button';

// Assets
import shape from "@/assets/images/features-shape3.png";
import DermatologyImg from "@/assets/images/dermatology 1.png"; 
import CardiologistImg from "@/assets/images/Cardiologist.png"; 
import GastroenterologistImg from "@/assets/images/Gastroenterologist.png"; 
import ETNImg from "@/assets/images/Ear-Nose-Throat.png"; 
import OphthalmologistImg from "@/assets/images/Ophthalmologist.png"; 
import NephrologistImg from "@/assets/images/Nephrologist.png"; 
import { Icon } from '@iconify/react';

// Sample data for the categories
const categoryData = [
    {
      icon: DermatologyImg,
      title: "Dermatology",
      link: "#",
    },
    {
      icon: CardiologistImg,
      title: "Cardiology",
      link: "#",
    },
    {
      icon: GastroenterologistImg,
      title: "Gastroenterology",
      link: "#",
    },
    {
      icon: ETNImg,
      title: "Ear-Nose-Throat",
      link: "#",
    },
    {
      icon: OphthalmologistImg,
      title: "Ophthalmology",
      link: "#",
    },
    {
      icon: NephrologistImg,
      title: "Nephrologist",
      link: "#",
    },
    {
        icon: DermatologyImg,
        title: "Dermatology",
        link: "#",
      },
      {
        icon: CardiologistImg,
        title: "Cardiology",
        link: "#",
      },
      {
        icon: GastroenterologistImg,
        title: "Gastroenterology",
        link: "#",
      },
      {
        icon: ETNImg,
        title: "Ear-Nose-Throat",
        link: "#",
      },
      {
        icon: OphthalmologistImg,
        title: "Ophthalmology",
        link: "#",
      },
      {
        icon: NephrologistImg,
        title: "Nephrologist",
        link: "#",
      },
    
  ];

const Category = () => {
    return (
        <div className="bg-[#E6F5F3] py-[100px] px-[10px]">
        <div className="container">
          <SectionHeading
            align="center"
            heading="Browse by specialist"
            subtitle="Category"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-10 mb-10">
            {categoryData.map((category, index) => (
              <div
                key={index}
                className="bg-white group text-center py-8 px-6 rounded-lg overflow-hidden relative"
              >
                {/* Background shape image */}
                <Image
                  src={shape}
                  alt="Shape"
                  className="absolute -left-3 top-0 max-w-36 opacity-0 group-hover:opacity-100 group-hover:left-0 transition-all duration-300"
                />
                {/* Icon in the center */}
                <div className="flex items-center justify-center size-20 mx-auto mb-3">
                  <Image src={category.icon} alt={category.title} />
                </div>
                {/* Title */}
                <h3 className="text-xl text-M-heading-color font-bold font-jost">
                  {category.title}
                </h3>
                {/* Link */}
                <Link
                  href={category.link}
                  className="size-14 inline-flex items-center justify-center bg-[#E6F5F3] text-M-primary-color rounded-full mt-5 origin-center transition-all duration-300 group-hover:bg-M-secondary-color group-hover:text-white"
                >

                  <Icon icon="solar:arrow-right-linear" width="24" height="24" />
                </Link>
              </div>
            ))}
          </div>
          <Button 
              linkHref="https://example.com"
              buttonText="All Services"
              buttonColor="bg-M-secondary-color"
              textColor="text-white"
              borderColor="border-M-secondary-color"
              padding="py-3 px-8"
              fontSize="text-lg"
              icons= "iconamoon:arrow-right-2-light"
              alignment="text-center"
          />
        </div>
      </div>
    );
};

export default Category;