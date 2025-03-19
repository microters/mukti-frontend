"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Button from "../Buttons/Button";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const DoctorsCardGrid = ({ doctor }) => {
  console.log("doctor card", doctor);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";
  console.log(currentLanguage);

  if (!doctor || !doctor.translations) return null;
  const doctorData = doctor.translations[currentLanguage] || {};
  const {
    name = t("Unknown Doctor"),
    department = t("N/A"),
    yearsOfExperience = t("N/A"),
    academicQualification = t("N/A"),
  } = doctorData;

  // Set default image if doctor icon is missing
  const doctorImage = doctor.icon
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${doctor.icon}`
    : "/default-profile-photo.png";

  const profileLink = doctor.slug ? `/doctor/${doctor.slug}` : "#";

  return (
    <div key={doctor.id} className="h-full">
      <div className="w-full flex flex-col justify-between h-full border border-slate-200 p-7 rounded-md text-center">
        <div>
          {/* Doctor Image */}
          <Link
            href={profileLink}
            className="size-[120px] block rounded-full shrink-0 mb-5 ring ring-M-primary-color/80 overflow-hidden mx-auto"
          >
            <Image
              src={doctorImage}
              alt={name}
              width={100}
              height={100}
              className="w-full"
            />
          </Link>
          {/* Doctor Name */}
          <h3 className="text-[#323290] text-xl font-jost font-bold mb-4">
            <Link
              href={profileLink}
              className="hover:text-M-primary-color transition-all duration-300 capitalize"
            >
              {name}
            </Link>
          </h3>

          {/* Academic Qualification */}
          <p className="text-M-text-color text-base font-normal font-jost flex gap-2 justify-center">
            <Icon
              icon="oui:index-open"
              width="24"
              className="text-M-heading-color shrink-0 relative top-[5px]"
            />
            {academicQualification}
          </p>

          {/* Location */}
          <p className="text-M-text-color text-base font-normal font-jost flex items-center justify-center gap-2 mt-2 capitalize">
            <Icon
              icon="mdi:location-on-outline"
              width="24"
              className="text-M-heading-color"
            />
            Mukti Hospital
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-4 mt-5">
            {/* Department */}
            <li className="border-2 border-[#00224F50] inline-block w-auto rounded-md py-2 px-4 text-M-primary-color text-base font-jost font-normal">
              {department}
            </li>

            {/* Experience */}
            <li className="bg-[#323290] inline-flex items-center gap-2 rounded-md py-2 px-4 font-jost font-normal text-base text-white">
              <Icon icon="solar:medical-kit-linear" width="18" />
              {yearsOfExperience} years
            </li>
          </ul>

          {/* Availability & Booking Section */}
          <div className="text-center border-t border-M-primary-color/20 mt-7 pt-5 w-full">
            <div className="mb-4 space-y-2">
              <h4 className="mb-3 font-jost text-lg text-black">
                Weekly Schedule
              </h4>
              {doctor.schedule && doctor.schedule.length > 0 ? (
                doctor.schedule.map((slot, index) => {
                  // Convert time to 12-hour format using toLocaleTimeString
                  const formatTime = (time) =>
                    new Date(`1970-01-01T${time}:00`).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    });

                  return (
                    <h4
                      key={index}
                      className="font-jost font-normal text-base text-black flex items-center justify-between gap-3 bg-M-section-bg/50 py-2 px-3 rounded-md"
                    >
                      {slot.day}{" "}
                      <span className="inline-block font-jost font-normal text-sm text-slate-600">
                        {formatTime(slot.startTime)} -{" "}
                        {formatTime(slot.endTime)}
                      </span>
                    </h4>
                  );
                })
              ) : (
                <h4 className="font-jost font-bold text-base text-red-500">
                  Not Available
                </h4>
              )}
            </div>
          </div>
        </div>

        {/* Booking Button */}
        <Button
          linkHref="#"
          buttonText="Book An Appointment"
          buttonColor="bg-M-primary-color"
          textColor="text-white w-full justify-center"
          borderColor="border-M-primary-color"
          alignment="center"
        />
      </div>
    </div>
  );
};

export default DoctorsCardGrid;
