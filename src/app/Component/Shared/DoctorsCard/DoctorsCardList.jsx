import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Button from "../Buttons/Button";
import Image from "next/image";

const DoctorsCardList = ({ doctor }) => {
  return (
    <div
      key={doctor.id}
      className="border border-slate-200 mt-8 p-7 flex gap-6 rounded-md"
    >
      {/* Doctor Image */}
      <Image
        src={doctor.image}
        alt={doctor.name}
        className="size-[200px] rounded-full shrink-0"
      />

      <div className="grid grid-cols-2 gap-10 items-center">
        {/* Left Section */}
        <div className="flex-1 relative before:w-[1px] before:h-1/4 before:bg-slate-300 before:absolute before:-right-5 before:top-1/2 before:-translate-y-1/2">
          <ul className="flex flex-wrap items-center gap-4 mb-5">
            {/* Department */}
            <li className="border-2 border-[#00224F50] inline-block w-auto rounded-md py-2 px-4 text-M-primary-color text-base font-jost font-normal">
              {doctor.department}
            </li>

            {/* Experience */}
            <li className="bg-[#323290] inline-flex items-center gap-2 rounded-md py-2 px-4 font-jost font-normal text-base text-white">
              <Icon icon="solar:medical-kit-linear" width="18" />
              {doctor.experience} years
            </li>
          </ul>

          {/* Doctor Name */}
          <h3 className="text-[#323290] text-xl font-jost font-bold mb-4">
            <Link
              href="#"
              className="hover:text-M-primary-color transition-all duration-300 capitalize"
            >
              {doctor.name}
            </Link>
          </h3>

          {/* Academic Qualification */}
          <p className="text-M-text-color text-base font-normal font-jost flex gap-2">
            <Icon
              icon="oui:index-open"
              width="24"
              className="text-M-heading-color shrink-0 relative top-[5px]"
            />
            {doctor.qualifications}
          </p>

          {/* Location */}
          <p className="text-M-text-color text-base font-normal font-jost flex items-center gap-2 mt-2 capitalize">
            <Icon
              icon="mdi:location-on-outline"
              width="24"
              className="text-M-heading-color"
            />
            {doctor.hospital}
          </p>
        </div>

        {/* Right Section (Availability & Booking) */}
        <div className="text-center">
          <h4 className="font-jost font-bold text-base text-M-heading-color">
            {doctor.availability.days}
          </h4>
          <p className="mt-1 mb-4 inline-block font-jost font-normal text-sm text-slate-600">
            {doctor.availability.time}
          </p>
          <Button
            linkHref="#"
            buttonText="Book An Appointment"
            buttonColor="bg-M-primary-color"
            textColor="text-white"
            borderColor="border-M-primary-color"
            alignment="center"
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorsCardList;
