'use client'
import CommonHero from "@/app/Component/UI/CommonHero";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import DoctorsCardGrid from "../Shared/DoctorsCard/DoctorsCardGrid";
import DoctorsCardList from "../Shared/DoctorsCard/DoctorsCardList";
import { useEffect, useState } from "react";

const SingleTreatment = ({department, doctors}) => {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language || "en";
    const [sortOption, setSortOption] = useState("default");
    const [isGridView, setIsGridView] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(0);
    const itemsPerPage = 4;
    
    const departmentTranslations = department?.translations?.[currentLanguage] 
      || department?.translations?.en 
      || {};

    const departmentName = departmentTranslations.name || "Fallback Dept";
    const filteredDoctors = (doctors || []).filter((doctor) => {
      const docTranslations = doctor.translations[currentLanguage] 
        || doctor.translations.en 
        || {};

      return docTranslations.department?.toLowerCase() === departmentName.toLowerCase();
    });

      // ✅ Sorting Logic (applies AFTER filtering)
      const sortedDoctors = [...filteredDoctors].sort((a, b) => {
        const nameA = a.translations[currentLanguage]?.name.toLowerCase();
        const nameB = b.translations[currentLanguage]?.name.toLowerCase();
        const experienceA =
          parseInt(a.translations[currentLanguage]?.yearsOfExperience) || 0;
        const experienceB =
          parseInt(b.translations[currentLanguage]?.yearsOfExperience) || 0;
    
        switch (sortOption) {
          case "name-asc":
            return nameA.localeCompare(nameB);
          case "name-desc":
            return nameB.localeCompare(nameA);
          case "experience-asc":
            return experienceA - experienceB;
          case "experience-desc":
            return experienceB - experienceA;
          default:
            return 0;
        }
      });
    
      // ✅ Pagination Logic (applies AFTER sorting)
      const totalPages = Math.ceil(sortedDoctors.length / itemsPerPage);
      const paginatedDoctors = sortedDoctors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
    
      // ✅ Ensure pagination resets when filters change
      useEffect(() => {
        setCurrentPage(1);
      }, [sortOption]);
    
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
    
      // Ensure the div is visible if screen is more than 768px
      useEffect(() => {
        if (screenWidth > 768) {
          setIsFilterOpen(true);
        }
      }, [screenWidth]);


  return (
    <div>
      <CommonHero pageName={departmentTranslations.name || "Fallback Title"} />
      <div className="container shadow-md bg-white py-8 px-4 md:px-8 rounded-md pb-14 gap-y-10 lg:gap-10 relative -mt-10 md:-mt-20 mb-14">
      <div className="md:col-span-2">
          {/* Doctor filter start */}
          <div className="border border-slate-200 flex flex-wrap gap-3 items-center justify-center lg:justify-between px-5 py-3 rounded-md">
            <h5 className="text-base xl:text-xl text-M-heading-color font-jost font-bold">
              Showing Doctors For You :{" "}
              <span className="bg-M-secondary-color text-white text-sm font-normal px-2 lg:px-3 py-1 rounded-md">
                {filteredDoctors.length}
              </span>
            </h5>
            <div className="flex items-center gap-3">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-3 py-3 rounded border-0 ring-0 focus:outline-none font-jost font-normal bg-slate-50"
              >
                <option value="default">Default</option>
                <option value="name-asc" className="text-M-heading-color">
                  Name (A-Z)
                </option>
                <option value="name-desc" className="text-M-heading-color">
                  Name (Z-A)
                </option>
                <option value="experience-asc" className="text-M-heading-color">
                  Experience (Low to High)
                </option>
                <option
                  value="experience-desc"
                  className="text-M-heading-color"
                >
                  Experience (High to Low)
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
                <Icon icon="tdesign:menu-application" width="24" height="24" />
              </button>
            </div>
          </div>
          {/* Doctor filter end */}
          {/* Doctors List/Grid */}
          {filteredDoctors.length === 0 ? (
            <div className="mt-8 text-center">
                <p className="text-slate-500">No doctors found for {departmentName}.</p>
            </div>
            ) : (
            <>
                {isGridView ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
                    {paginatedDoctors.map((doctor) => (
                    <DoctorsCardGrid key={doctor.id} doctor={doctor} />
                    ))}
                </div>
                ) : (
                <div>
                    {paginatedDoctors.map((doctor) => (
                    <DoctorsCardList key={doctor.id} doctor={doctor} />
                    ))}
                </div>
                )}
            </>
            )}

          {/* 🔹 Pagination */}
          {doctors.length > itemsPerPage && (
            <ul className="mt-10 px-5 py-3 flex items-center shadow shadow-M-primary-color/10 gap-2">
              {/* Left Arrow */}
              <li
                onClick={() =>
                  handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                }
                disabled={currentPage === 1}
                className={`size-11 inline-flex items-center justify-center bg-M-primary-color/10 rounded-full text-M-primary-color font-jost font-bold hover:bg-M-primary-color hover:text-white transition-all duration-300 ${
                  currentPage === 1
                    ? "pointer-events-none opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <Icon
                  icon="material-symbols-light:keyboard-arrow-left"
                  width="24"
                />
              </li>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`size-11 inline-flex items-center justify-center cursor-pointer  rounded-full  font-jost font-bold hover:bg-M-primary-color hover:text-white transition-all duration-300 ${
                    currentPage === index + 1
                      ? "bg-M-primary-color text-white"
                      : "text-M-primary-color bg-M-primary-color/10"
                  }`}
                >
                  {index + 1}
                </li>
              ))}

              {/* Right Arrow */}
              <li
                onClick={() =>
                  handlePageChange(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                disabled={currentPage === totalPages}
                className={`size-11 inline-flex items-center justify-center bg-M-primary-color/10 rounded-full text-M-primary-color font-jost font-bold hover:bg-M-primary-color hover:text-white transition-all duration-300 ${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <Icon
                  icon="material-symbols-light:keyboard-arrow-right"
                  width="24"
                />
              </li>
            </ul>
          )}
        </div>
        {/* Subscribe Form */}
        <div className="col-span-1 space-y-6 my-6">
           {/* CTA Start */}
           <div className="bg-M-heading-color px-8 py-7 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-2">
                Can't find what are you looking for?
              </h3>
              <h5 className="text-base font-normal text-slate-200 mb-6">
                Fill this form for callback from us.
              </h5>
              <form action="#" className="grid grid-cols-1 md:grid-cols-3 items-start gap-5">
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
                <button className="font-bold font-jost text-base md:text-xs xl:text-lg text-white py-[10px] px-3 md:px-3 lg:px-8 w-full bg-M-primary-color flex items-center justify-center gap-2 rounded-md uppercase transition-all duration-300 hover:bg-M-secondary-color">
                  {" "}
                  <Icon icon="solar:call-medicine-linear" width="24" /> Request
                  callback
                </button>
                <div className="relative">
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
                      className="cursor-pointer font-jost font-normal text-[14px] text-slate-200 relative z-10 pl-6"
                    >
                      Get updated on whatsapp & accept T&C
                    </label>
                </div>
                </div>
              </form>
            </div>
            {/* CTA End */}
        </div>
        {/* Blog Data */}
          <div className="jodit-description"
            dangerouslySetInnerHTML={{
            __html: departmentTranslations.description || "",
            }}
        />
        </div>
      </div>
  );
};

export default SingleTreatment;