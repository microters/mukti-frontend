import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";

const DoctorsCardList = ({ doctor }) => {
  if (!doctor || !doctor.translations) return null;

  // Extract English translation (or fallback to default values)
  const doctorData = doctor.translations["en"] || {};
  const {
    name = "Unknown Doctor",
    department = "N/A",
    yearsOfExperience = "N/A",
    academicQualification = "N/A",
  } = doctorData;
  const slug = doctor.slug
  console.log(slug);
  const profileLink = doctor.slug ? `/doctor/${doctor.slug}` : "#";
  const appointmentLink = `/book-appointment/${slug}`;
  // Set default image if doctor icon is missing
  const doctorImage = doctor.icon
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${doctor.icon}`
    : "/default-profile-photo.png";
  return (
    <div
      key={doctor.id}
      className="border border-slate-200 mt-8 p-7 flex flex-col lg:flex-row gap-6 rounded-md"
    >
      {/* Doctor Image */}
      <Link
        href={profileLink}
        className="size-32 xl:size-[150px] rounded-full shrink-0 ring ring-M-primary-color/80 overflow-hidden"
      >
        <Image
          src={doctorImage}
          alt={name}
          width={100}
          height={100}
          className="w-full"
        />
      </Link>

      <div className="grid grid-cols-1 w-full lg:w-auto lg:grid-cols-2 gap-10 ">
        {/* Left Section */}
        <div className="flex-1 relative before:hidden lg:before:block before:w-[1px] before:h-1/4 before:bg-slate-300 before:absolute before:-right-5 before:top-1/2 before:-translate-y-1/2">
          <ul className="flex flex-wrap items-center gap-4 mb-5">
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
        </div>

        {/* Right Section (Availability & Booking) */}
        <div className="txt-left lg:text-center">
          <h4 className="mb-3 font-jost text-lg text-black">Weekly Schedule</h4>
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
                <div key={index} className="mb-2">
                  <h4
                    key={index}
                    className="font-jost font-bold text-base text-black flex items-center justify-between gap-3 bg-M-section-bg/50 py-2 px-3 rounded-md"
                  >
                    {slot.day} :{" "}
                    <span className=" inline-block font-jost font-normal text-sm text-slate-600">
                      {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                    </span>
                  </h4>
                </div>
              );
            })
          ) : (
            <h4 className="font-jost font-bold text-base text-red-500">
              Not Available
            </h4>
          )}
         <Link
        href={appointmentLink}
        className="bg-[#E8EEF4] text-[#00224F] text-lg w-full py-3 px-3 block text-center font-bold font-jost hover:bg-M-primary-color hover:text-white transition-all duration-300"
      >
        Book An Appointment
      </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorsCardList;
