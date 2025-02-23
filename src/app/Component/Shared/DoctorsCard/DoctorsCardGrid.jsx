import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Button from "../Buttons/Button";
import Image from "next/image";

const DoctorsCardGrid = ({ doctor }) => {
  return (
    <div key={doctor.id} className="h-full">
      <div className="items-center w-full flex flex-col justify-between h-full border border-slate-200 p-7 rounded-md ">
        <div>
          {/* Doctor Image */}
          <Image
            src={doctor.image}
            alt={doctor.name}
            className="size-[120px] rounded-full shrink-0 mb-5"
          />
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

          <ul className="flex flex-wrap items-center gap-4 mt-5">
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
        </div>

        {/* Availability & Booking Section */}
        <div className="text-center border-t border-M-primary-color/20 mt-7 pt-5 w-full">
          <h4 className="font-jost font-bold text-base text-M-heading-color">
            {doctor.availability.days} :{" "}
            <span className="mt-1 mb-4 inline-block font-jost font-normal text-sm text-slate-600">
              {doctor.availability.time}
            </span>
          </h4>

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
