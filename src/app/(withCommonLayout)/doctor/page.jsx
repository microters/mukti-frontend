"use client";
import HeroInnerPage from "@/app/Component/UI/HeroInnerPage";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import dermatology from "@/assets/images/dermatology-icon.png";
import cardiology from "@/assets/images/cardiologyIcon.png";
import gastrology from "@/assets/images/gastrologyIcon.png";
import male from "@/assets/images/male.png";
import female from "@/assets/images/female.png";

import doctorProfile from "@/assets/images/doctor-profile.jpg";
import doctorProfile1 from "@/assets/images/doctor-profile2.jpg";
import doctorProfile2 from "@/assets/images/doctor-profile3.jpg";
import DoctorsCardList from "@/app/Component/Shared/DoctorsCard/DoctorsCardList";
import DoctorsCardGrid from "@/app/Component/Shared/DoctorsCard/DoctorsCardGrid";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Doctor = () => {
  const itemsPerPage = 4;
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";
  const [selectedSpecialties, setSelectedSpecialties] = useState({});
  const [doctors, setDoctors] = useState([]); // State to hold the fetched doctor data
  const [loading, setLoading] = useState(true); //
  const [selectedGenders, setSelectedGenders] = useState({});
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(true);
  const [isGendersOpen, setIsGendersOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridView, setIsGridView] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

useEffect(() => {
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/doctor", {
        headers: {
          "x-api-key": "caf56e69405fe970f918e99ce86a80fbf0a7d728cca687e8a433b817411a6079",
        },
      });
      // Check if the data is nested
      const doctorsData = Array.isArray(response.data)
        ? response.data
        : response.data.doctors || [];

      setDoctors(doctorsData);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to fetch doctor list");
    } finally {
      setLoading(false);
    }
  };

  fetchDoctors();
}, []);
console.log(doctors);


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
      hospital: "Mukti Hospital",
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
      hospital: "Mukti Hospital",
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
      hospital: "Mukti Hospital",
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
      hospital: "Mukti Hospital",
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
      hospital: "Mukti Hospital",
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
  const totalPages = Math.ceil(doctors.length / itemsPerPage);

  // Calculate the items to show for the current page
  const currentItems = doctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle toggle between grid and list view
  const toggleLayout = () => {
    setIsGridView(!isGridView);
  };

  // Handle Filter Area in Mobile
  useEffect(() => {
    // This check ensures that `window` is only accessed on the client side
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // Handle toggle of div visibility
  const handleToggle = () => {
    if (screenWidth <= 768) {
      setIsFilterOpen(!isFilterOpen);
    }
  };

  // Ensure the div is visible if screen is more than 768px
  useEffect(() => {
    if (screenWidth > 768) {
      setIsFilterOpen(true);
    }
  }, [screenWidth]);

  return (
    <div>
      <HeroInnerPage />
      <div className="container py-24 relative">
        <button
          onClick={handleToggle}
          className="flex gap-3 items-center justify-center w-full py-3 px-3 text-base text-white uppercase font-jost font-semibold bg-M-primary-color sticky bottom-1 z-20 rounded-md mb-4 md:hidden"
        >
          <Icon icon="cil:filter" width="24" /> Filter
        </button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {isFilterOpen && (
            <div className="space-y-8 fixed md:relative bg-white top-0 left-0 w-full overflow-y-scroll md:overflow-y-auto h-screen md:h-auto px-2 py-2 md:p-0 z-50">
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
                        Get updated on whatsapp & accept T&C
                      </label>
                    </div>
                  </div>
                  <button className="font-bold font-jost text-base md:text-xs xl:text-lg text-white py-3 px-3 md:px-3 lg:px-8 w-full bg-M-primary-color flex items-center justify-center gap-2 rounded-md uppercase transition-all duration-300 hover:bg-M-secondary-color">
                    {" "}
                    <Icon icon="solar:call-medicine-linear" width="24" />{" "}
                    Request callback
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
                      <span className="flex gap-3 items-center font-jost font-normal">
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
              <div className="flex gap-3 bg-white ">
                <button
                  onClick={handleToggle}
                  className="font-jost font-normal text-base text-white uppercase px-3 py-3 rounded-md w-full bg-M-primary-color hover:bg-M-heading-color md:hidden transition-all duration-300"
                >
                  Apply Filters
                </button>
                <button
                  onClick={resetSelections}
                  className="font-jost font-normal text-base text-white uppercase px-3 py-3 rounded-md w-full bg-M-secondary-color  transition-all duration-300 hover:bg-M-primary-color"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}

          <div className=" md:col-span-2">
            <div className="border border-slate-200 flex flex-wrap gap-3 items-center justify-center lg:justify-between px-5 py-3 rounded-md">
              <h5 className="text-base xl:text-xl text-M-heading-color font-jost font-bold">
                Showing Doctors For You :{" "}
                <span className="bg-M-secondary-color text-white text-sm font-normal px-2 lg:px-3 py-1 rounded-md">
                  {doctors.length}
                </span>
              </h5>
              <div className="flex items-center gap-3">
                <select
                  name="sortFilter"
                  id="sortFilter"
                  className="px-3 py-3 rounded border-0 ring-0 focus:outline-none font-jost font-normal bg-slate-50 "
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
                <button
                  onClick={toggleLayout}
                  className={`size-9 lg:size-12 inline-flex items-center justify-center rounded ${isGridView ? "bg-slate-50 text-M-heading-color" : "text-white bg-M-heading-color"} `}
                >
                  <Icon
                    icon="heroicons-outline:menu-alt-2"
                    width="24"
                    height="24"
                  />
                </button>
                <button
                  onClick={toggleLayout}
                  className={`size-9 lg:size-12 inline-flex items-center justify-center rounded ${isGridView ? "text-white bg-M-heading-color" : "bg-slate-50 text-M-heading-color"} `}
                >
                  <Icon
                    icon="tdesign:menu-application"
                    width="24"
                    height="24"
                  />
                </button>
              </div>
            </div>
            {/* Doctors Card */}
            {isGridView ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
                {currentItems.map((doctor, index) => (
                  <div key={doctor.id}>
                    <DoctorsCardGrid key={index} doctor={doctor} />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {currentItems.map((doctor, index) => (
                  <div key={doctor.id}>
                    <DoctorsCardList key={index} doctor={doctor} />
                  </div>
                ))}
              </div>
            )}

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
                  <li key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`size-11 inline-flex items-center justify-center cursor-pointer rounded-full font-jost font-bold hover:bg-M-primary-color hover:text-white transition-all duration-300 ${
                        currentPage === index + 1
                          ? "bg-M-primary-color text-white"
                          : "text-M-primary-color bg-M-primary-color/10"
                      }`}
                    >
                      {index + 1}
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