"use client";
import FormButton from "@/app/Component/Shared/Buttons/FormButton";
import HeroInnerPage from "@/app/Component/UI/HeroInnerPage";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

import dermatology from "@/assets/images/dermatology-icon.png";
import cardiology from "@/assets/images/cardiologyIcon.png";
import gastrology from "@/assets/images/gastrologyIcon.png";
import male from "@/assets/images/male.png";
import female from "@/assets/images/female.png";

import doctorProfile from "@/assets/images/doctor-profile.jpg";
import doctorProfile1 from "@/assets/images/doctor-profile2.jpg";
import doctorProfile2 from "@/assets/images/doctor-profile3.jpg";
import Button from "@/app/Component/Shared/Buttons/Button";

const Doctor = () => {
  const itemsPerPage = 2;
  const [selectedSpecialties, setSelectedSpecialties] = useState({});
  const [selectedGenders, setSelectedGenders] = useState({});
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(true);
  const [isGendersOpen, setIsGendersOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const specialtyItems = [
    { id: 1, title: "Dermatology", image: dermatology },
    { id: 2, title: "Gastrology", image: gastrology },
    { id: 3, title: "Cardiology", image: cardiology },
    { id: 4, title: "Cardiology", image: cardiology },
    { id: 5, title: "Cardiology", image: cardiology },
  ];

  const genders = [
    { id: 1, title: "Male", image: male },
    { id: 2, title: "Female", image: female },
  ];

  const doctorsData = [
    {
      id: 1,
      name: "Dr. Nahidul Islam",
      image: doctorProfile,
      department: "Cardiology",
      experience: 4,
      qualifications:
        "MBBS (Bachelor of Medicine, Bachelor of Surgery), MD - Cardiology, MDS - Periodontology and Oral Implantology",
      hospital: "Mukti Hospital",
      availability: {
        days: "Friday - Monday",
        time: "12:00 AM - 03:00 PM",
      },
    },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      image: doctorProfile1,
      department: "Neurology",
      experience: 7,
      qualifications: "MBBS, MD - Neurology, Fellowship in Stroke Management",
      hospital: "City Care Hospital",
      availability: {
        days: "Monday - Thursday",
        time: "10:00 AM - 02:00 PM",
      },
    },
    {
      id: 3,
      name: "Dr. Robert Smith",
      image: doctorProfile2,
      department: "Orthopedics",
      experience: 5,
      qualifications: "MBBS, D.Ortho, Fellowship in Joint Replacement Surgery",
      hospital: "OrthoCare Clinic",
      availability: {
        days: "Tuesday - Friday",
        time: "09:00 AM - 01:00 PM",
      },
    },
    {
      id: 4,
      name: "Dr. Emma White",
      image: doctorProfile,
      department: "Pediatrics",
      experience: 6,
      qualifications:
        "MBBS, MD - Pediatrics, Certified in Pediatric Critical Care",
      hospital: "Children's Health Center",
      availability: {
        days: "Monday - Wednesday",
        time: "08:00 AM - 04:00 PM",
      },
    },
    {
      id: 5,
      name: "Dr. William Brown",
      image: doctorProfile1,
      department: "Dermatology",
      experience: 8,
      qualifications:
        "MBBS, MD - Dermatology, Fellowship in Cosmetic Dermatology",
      hospital: "Dermacare Clinic",
      availability: {
        days: "Wednesday - Saturday",
        time: "11:00 AM - 05:00 PM",
      },
    },
    {
      id: 6,
      name: "Dr. Olivia Davis",
      image: doctorProfile2,
      department: "Gynecology",
      experience: 10,
      qualifications:
        "MBBS, MS - Obstetrics & Gynecology, Fellowship in High-Risk Obstetrics",
      hospital: "Women's Health Clinic",
      availability: {
        days: "Monday - Friday",
        time: "09:00 AM - 03:00 PM",
      },
    },
  ];

  const toggleSpecialty = (id) => {
    setSelectedSpecialties((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleGender = (id) => {
    setSelectedGenders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetSelections = () => {
    setSelectedSpecialties({});
    setSelectedGenders({});
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(doctorsData.length / itemsPerPage);

  // Calculate the items to show for the current page
  const currentItems = doctorsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <HeroInnerPage />
      <div className="container py-24">
        <div className="grid grid-cols-3 gap-8">
          <div className="space-y-8">
            <div className="bg-M-heading-color px-5 py-7 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-2">
                Can't find what are you looking for?
              </h3>
              <h5 className="text-base font-normal text-slate-200 mb-6">
                Fill this form for callback from us.
              </h5>
              <form action="#" className="flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Your Name*"
                  required
                  className="block w-full px-5 py-3 ring-0 focus:outline-none rounded-md font-jost "
                />
                <input
                  type="tel"
                  placeholder="Enter your Number"
                  className="block w-full px-5 py-3 ring-0 focus:outline-none rounded-md font-jost"
                />
                <div>
                  <div className=" relative">
                    <input
                      type="checkbox"
                      id="agreement"
                      className="hidden peer"
                    />
                    <span className="h-4 w-4 border flex-none border-slate-100 rounded inline-flex items-center justify-center ltr:mr-3 rtl:ml-3 transition-all duration-150 bg-slate-100 peer-checked:bg-M-primary-color peer-checked:ring-1 peer-checked:ring-M-primary-color peer-checked:ring-offset-1 absolute top-[6px] left-0 z-0">
                      <Icon
                        icon="mynaui:check"
                        width="24"
                        className="text-slate-100"
                      />
                    </span>
                    <label
                      htmlFor="agreement"
                      className="cursor-pointer font-jost font-normal text-base text-slate-200 relative z-10 pl-6"
                    >
                      Get updateds on whatsapp & accept T&C
                    </label>
                  </div>
                </div>
                <button className="font-bold font-jost text-lg text-white py-3 px-8 w-full bg-M-primary-color flex items-center justify-center gap-2 rounded-md uppercase transition-all duration-300 hover:bg-M-secondary-color">
                  {" "}
                  <Icon icon="solar:call-medicine-linear" width="24" /> Request
                  callback
                </button>
              </form>
            </div>
            <div className="border border-M-primary-color/5 rounded-md overflow-hidden">
              <h3
                onClick={() => setIsSpecialtiesOpen(!isSpecialtiesOpen)}
                className="text-xl text-white bg-M-primary-color px-5 py-4 flex items-center justify-between gap-5 w-full cursor-pointer"
              >
                Specialty{" "}
                <span>
                  <Icon icon="solar:alt-arrow-down-linear" width="24" />
                </span>
              </h3>
              <ul
                className={`px-4 transition-all duration-300 overflow-hidden ${isSpecialtiesOpen ? "h-full" : "h-0"}`}
              >
                {specialtyItems.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => toggleSpecialty(item.id)}
                    className={`flex justify-between items-center gap-3 cursor-pointer py-4 border-b border-M-primary-color/10 last:border-0 transition-all duration-300 ${selectedSpecialties[item.id] ? "text-slate-900" : "text-slate-400"}`}
                  >
                    <span className="flex gap-3 items-cente font-jost font-normalr">
                      <Image src={item.image} alt={item.title} />
                      {item.title}
                    </span>
                    {selectedSpecialties[item.id] ? (
                      <Icon
                        icon="material-symbols-light:check-box-outline-rounded"
                        width="24"
                        className="text-M-primary-color"
                      />
                    ) : (
                      <Icon
                        icon="material-symbols-light:square-outline-rounded"
                        width="24"
                        className="text-slate-400"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-M-primary-color/5 rounded-md overflow-hidden">
              <h3
                onClick={() => setIsGendersOpen(!isGendersOpen)}
                className="text-xl text-white bg-M-primary-color px-5 py-4 flex items-center justify-between gap-5 w-full"
              >
                Gender{" "}
                <span>
                  <Icon icon="solar:alt-arrow-down-linear" width="24" />
                </span>
              </h3>
              <ul
                className={`px-4 transition-all duration-300 overflow-hidden ${isGendersOpen ? "h-auto" : "h-0"}`}
              >
                {genders.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => toggleGender(item.id)}
                    className={`flex justify-between items-center gap-3 cursor-pointer py-4 border-b border-M-primary-color/10 last:border-0 transition-all duration-300 ${selectedGenders[item.id] ? "text-slate-900" : "text-slate-400"}`}
                  >
                    <span className="flex gap-3 items-center font-jost font-normal">
                      <Image src={item.image} alt={item.title} />
                      {item.title}
                    </span>
                    {selectedGenders[item.id] ? (
                      <Icon
                        icon="material-symbols-light:check-box-outline-rounded"
                        width="24"
                        className="text-M-primary-color"
                      />
                    ) : (
                      <Icon
                        icon="material-symbols-light:square-outline-rounded"
                        width="24"
                        className="text-slate-400"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={resetSelections}
              className="font-jost font-normal text-base text-white uppercase px-3 py-3 rounded-md w-full bg-M-secondary-color  transition-all duration-300 hover:bg-M-primary-color"
            >
              Clear Filters
            </button>
          </div>
          <div className="col-span-2">
            <div className="border border-slate-900/30 flex items-center justify-between px-5 py-3 rounded-md">
              <h5 className="text-xl text-M-heading-color font-jost font-bold">
                Showing Doctors For You :{" "}
                <span className="bg-M-secondary-color text-white px-3 py-1 rounded-md">
                  50
                </span>
              </h5>
              <div>
                <select
                  name="sortFilter"
                  id="sortFilter"
                  className="px-3 py-2 rounded border-0 ring-0 focus:outline-none font-jost font-normal bg-slate-50"
                >
                  <option value="N/A">Default</option>
                  <option value="name" className="text-M-heading-color">
                    Sort by Name
                  </option>
                  <option value="experience" className="text-M-heading-color">
                    Sort by Experience
                  </option>
                  <option value="rating" className="text-M-heading-color">
                    Sort by Rating
                  </option>
                  <option value="date" className="text-M-heading-color">
                    Sort by Date
                  </option>
                </select>
              </div>
            </div>
            {/* Doctors Card */}
            {currentItems.map((doctor, index) => (
              <div
                key={doctor.id}
                className="border border-slate-100 mt-8 p-7 flex gap-6"
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
            ))}

            {/* Pagination Area */}
            {doctorsData.length > itemsPerPage && (
              <ul className="mt-10 px-5 py-3 flex items-center shadow shadow-M-primary-color/10 gap-2">
                {/* Left Arrow */}
                <li>
                  <Link
                    href="#"
                    onClick={() =>
                      handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                    }
                    disabled={currentPage === 1}
                    className={`size-11 inline-flex items-center justify-center bg-M-primary-color/10 rounded-full text-M-primary-color font-jost font-bold hover:bg-M-primary-color hover:text-white transition-all duration-300 ${
                      currentPage === 1
                        ? "pointer-events-none opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <Icon
                      icon="material-symbols-light:keyboard-arrow-left"
                      width="24"
                    />
                  </Link>
                </li>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      onClick={() => handlePageChange(index + 1)}
                      className={`size-11 inline-flex items-center justify-center  rounded-full  font-jost font-bold hover:bg-M-primary-color hover:text-white transition-all duration-300 ${
                        currentPage === index + 1
                          ? "bg-M-primary-color text-white"
                          : "text-M-primary-color bg-M-primary-color/10"
                      }`}
                    >
                      {index + 1}
                    </Link>
                  </li>
                ))}

                {/* Right Arrow */}
                <li>
                  <Link
                    href="#"
                    onClick={() =>
                      handlePageChange(
                        currentPage < totalPages ? currentPage + 1 : totalPages
                      )
                    }
                    disabled={currentPage === totalPages}
                    className={`size-11 inline-flex items-center justify-center bg-M-primary-color/10 rounded-full text-M-primary-color font-jost font-bold hover:bg-M-primary-color hover:text-white transition-all duration-300 ${
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }`}
                  >
                    <Icon
                      icon="material-symbols-light:keyboard-arrow-right"
                      width="24"
                    />
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
