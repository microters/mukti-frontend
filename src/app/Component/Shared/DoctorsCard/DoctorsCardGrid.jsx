import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Button from "../Buttons/Button";
import Image from "next/image";

const DoctorsCardGrid = ({ doctor }) => {
  if (!doctor || !doctor.translations) return null;

  // Extract English translation (or fallback to default values)
  const doctorData = doctor.translations["en"] || {};
  const {
    name = "Unknown Doctor",
    department = "N/A",
    yearsOfExperience = "N/A",
    academicQualification = "N/A",
  } = doctorData;

  // Set default image if doctor icon is missing
  const doctorImage = doctor.icon
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${doctor.icon}`
    : "/default-profile-photo.png";

  return (
    <div key={doctor.id} className="h-full">
      <div className="w-full flex flex-col justify-between h-full border border-slate-200 p-7 rounded-md ">
        <div>
          {/* Doctor Image */}
          <Image
            src={doctorImage}
            alt={name}
            width={100}
            height={100}
            className="size-[120px] rounded-full shrink-0 mb-5 ring ring-M-primary-color/80"
          />
          {/* Doctor Name */}
          <h3 className="text-[#323290] text-xl font-jost font-bold mb-4">
            <Link
              href="#"
              className="hover:text-M-primary-color transition-all duration-300 capitalize"
            >
              {name}
            </Link>
          </h3>

          {/* Academic Qualification */}
          <p className="text-M-text-color text-base font-normal font-jost flex gap-2">
            <Icon
              icon="oui:index-open"
              width="24"
              className="text-M-heading-color shrink-0 relative top-[5px]"
            />
            {academicQualification}
          </p>

          {/* Location */}
          <p className="text-M-text-color text-base font-normal font-jost flex items-center gap-2 mt-2 capitalize">
            <Icon
              icon="mdi:location-on-outline"
              width="24"
              className="text-M-heading-color"
            />
            Mukti Hospital
          </p>

          <ul className="flex flex-wrap items-center gap-4 mt-5">
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
        </div>

        {/* Availability & Booking Section */}
        <div className="text-center border-t border-M-primary-color/20 mt-7 pt-5 w-full">
          <div className="mt-1 mb-4 space-y-1">
            {doctor.schedule && doctor.schedule.length > 0 ? (
              doctor.schedule.map((slot, index) => (
                <h4
                  key={index}
                  className="font-jost font-bold text-base text-M-heading-color"
                >
                  {slot.day} :{" "}
                  <span className=" inline-block font-jost font-normal text-sm text-slate-600">
                    {slot.startTime} - {slot.endTime}
                  </span>
                </h4>
              ))
            ) : (
              <h4 className="font-jost font-bold text-base text-red-500">
                Not Available
              </h4>
            )}
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
    </div>
  );
};

export default DoctorsCardGrid;
