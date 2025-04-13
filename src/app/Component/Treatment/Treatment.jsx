'use client'
import Image from "next/image";
import React from "react";
import Skeleton from "react-loading-skeleton";
import shape from "@/assets/images/features-shape3.png";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Appointment from "@/app/Component/Shared/AppointmentAreas/Appointment";
import Counterup from "@/app/Component/Shared/Counter/Counterup";

const Treatment = ({ departments, aboutPage }) => {
  const { i18n } = useTranslation();

  return (
    <div>
      {/* Department Area */}
      <div className="bg-M-section-bg py-24">
        <div className="container">
          {!departments.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-10 mb-10">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white text-center py-8 px-6 rounded-lg overflow-hidden relative"
                >
                  <Skeleton
                    circle
                    height={80}
                    width={80}
                    className="mx-auto mb-4"
                  />
                  <Skeleton height={20} width={140} className="mx-auto mb-2" />
                  <Skeleton
                    height={40}
                    width={40}
                    className="mx-auto rounded-full"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-10 mb-10">
              {departments.map((department) => (
                <div
                  key={department.id}
                  className="bg-white group text-center py-8 px-6 rounded-lg overflow-hidden relative"
                >
                  <Image
                    src={shape}
                    alt="Shape"
                    className="absolute -left-3 top-0 max-w-36 opacity-0 group-hover:opacity-100 group-hover:left-0 transition-all duration-300"
                  />
                  <div className="flex items-center justify-center size-20 mx-auto mb-3">
                    <Image
                      src={`http://localhost:5000${department.icon}`}

                      alt={department.translations[i18n.language]?.name}
                      width={80}
                      height={80}
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-xl text-M-heading-color font-bold font-jost">
                    {department.translations[i18n.language]?.name}
                  </h3>
                  <Link
                    href={`/department/${department.slug}`}
                    className="size-14 inline-flex items-center justify-center bg-[#E6F5F3] text-M-primary-color rounded-full mt-5 origin-center transition-all duration-300 group-hover:bg-M-secondary-color group-hover:text-white"
                  >
                    <Icon
                      icon="solar:arrow-right-linear"
                      width={24}
                      height={24}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Appointment Form Area */}
      <Appointment aboutPage={aboutPage}/>

      {/* Counter Up Area */}
      <div className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Counterup
              target={15}
              title="Years With You"
              description="Etiam ante ante, molestie vitae cursus ac, pharetra euismod libero."
            />
            <Counterup
              target={65}
              title="Awards"
              description="Etiam ante ante, molestie vitae cursus ac, pharetra euismod libero."
            />
            <Counterup
              target={250}
              title="Doctors"
              description="Etiam ante ante, molestie vitae cursus ac, pharetra euismod libero."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Treatment;
