"use client";

import { useEffect, useState } from "react";
import DoctorsCardGrid from "@/app/Component/Shared/DoctorsCard/DoctorsCardGrid";
import DoctorsCardList from "@/app/Component/Shared/DoctorsCard/DoctorsCardList";
import Image from "next/image";
import male from "@/assets/images/male.png";
import female from "@/assets/images/female.png";
import { Icon } from "@iconify/react";
import Link from "next/link";

const DoctorsList = ({ doctors }) => {
  const [isGridView, setIsGridView] = useState(true);
  const [selectedSpecialties, setSelectedSpecialties] = useState({});
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(true);
  const [selectedGenders, setSelectedGenders] = useState({});
  const [sortOption, setSortOption] = useState("default");
  const [isGendersOpen, setIsGendersOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const itemsPerPage = 4;

  // ✅ Extract unique specialties & genders from API data
  const specialtyOptions = [...new Set(doctors.map(d => d.translations.en.department))];
  const genderOptions = [...new Set(doctors.map(d => d.translations.en.gender))];

  const filteredDoctors = doctors.filter((doctor) => {
    const specialtyMatch =
      Object.keys(selectedSpecialties).length === 0 ||  // If no specialties selected, show all
      selectedSpecialties[doctor.translations.en.department];
  
    const genderMatch =
      Object.keys(selectedGenders).length === 0 || 
      selectedGenders[doctor.translations.en.gender]; // Otherwise, match selected gender
  
    return specialtyMatch && genderMatch; // Ensure both conditions work independently
  });
  

 // ✅ Sorting Logic (applies AFTER filtering)
 const sortedDoctors = [...filteredDoctors].sort((a, b) => {
  const nameA = a.translations.en.name.toLowerCase();
  const nameB = b.translations.en.name.toLowerCase();
  const experienceA = parseInt(a.translations.en.yearsOfExperience) || 0;
  const experienceB = parseInt(b.translations.en.yearsOfExperience) || 0;

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
}, [selectedSpecialties, selectedGenders, sortOption]);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle toggle between grid and list view
  const toggleLayout = () => {
    setIsGridView(!isGridView);
  };


    // ✅ Toggle filter selections
    const toggleSpecialty = (specialty) => {
      setSelectedSpecialties((prev) => ({
        ...prev,
        [specialty]: !prev[specialty],
      }));
      setCurrentPage(1); // Reset to page 1 when filtering
    };
  
    const toggleGender = (gender) => {
      setSelectedGenders((prev) => ({
        ...prev,
        [gender]: !prev[gender],
      }));
      setCurrentPage(1); // Reset to page 1 when filtering
    };

  const resetSelections = () => {
    setSelectedSpecialties({});
    setSelectedGenders({});
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
            {/* CTA Start */}
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
            {/* CTA End */}
              {/* Specialty Filter */}
              <div className="border border-M-primary-color/5 rounded-md overflow-hidden">
                <h3
                  onClick={() => setIsSpecialtiesOpen(!isSpecialtiesOpen)}
                  className="text-xl text-white bg-M-primary-color px-5 py-4 flex items-center justify-between gap-5 w-full cursor-pointer"
                >
                  Specialty
                  <span>
                    <Icon icon="solar:alt-arrow-down-linear" width="24" />
                  </span>
                </h3>
                <ul className="px-4 transition-all duration-300 overflow-hidden">
                  {specialtyOptions.map((item) => (
                    <li
                      key={item}
                      onClick={() => toggleSpecialty(item)}
                      className={`flex justify-between items-center gap-3 cursor-pointer py-4 border-b border-M-primary-color/10 last:border-0 transition-all duration-300 ${
                        selectedSpecialties[item] ? "text-slate-900" : "text-slate-400"
                      }`}
                    >
                      <span className="flex gap-3 items-center font-jost font-normal">{item}</span>
                      {selectedSpecialties[item] ? (
                        <Icon icon="material-symbols-light:check-box-outline-rounded" width="24" className="text-M-primary-color" />
                      ) : (
                        <Icon icon="material-symbols-light:square-outline-rounded" width="24" className="text-slate-400" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Gender Filter */}
              <div className="border border-M-primary-color/5 rounded-md overflow-hidden">
                <h3
                  onClick={() => setIsGendersOpen(!isGendersOpen)}
                  className="text-xl text-white bg-M-primary-color px-5 py-4 flex items-center justify-between gap-5 w-full"
                >
                  Gender
                  <span>
                    <Icon icon="solar:alt-arrow-down-linear" width="24" />
                  </span>
                </h3>
                <ul className={`px-4 transition-all duration-300 overflow-hidden ${isGendersOpen ? "h-auto" : "h-0"}`}>
                    {genderOptions.map((item) => (
                      <li
                        key={item}
                        onClick={() => toggleGender(item)}
                        className={`flex justify-between items-center gap-3 cursor-pointer py-4 border-b border-M-primary-color/10 last:border-0 transition-all duration-300 ${
                          selectedGenders[item] ? "text-slate-900" : "text-slate-400"
                        }`}
                      >
                        <span className="flex gap-3 items-center font-jost font-normal">
                          <Image src={item === "Male" ? male : female} alt={item} width={30} height={30} />
                          {item}
                        </span>
                        {selectedGenders[item] ? (
                          <Icon icon="material-symbols-light:check-box-outline-rounded" width="24" className="text-M-primary-color" />
                        ) : (
                          <Icon icon="material-symbols-light:square-outline-rounded" width="24" className="text-slate-400" />
                        )}
                      </li>
                    ))}
                  </ul>
              </div>
              {/* Clear Filter Start */}
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
              {/* Clear Filter End */}
          </div>
        )}
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
                            <option value="name-asc" className="text-M-heading-color">Name (A-Z)</option>
                            <option value="name-desc" className="text-M-heading-color">Name (Z-A)</option>
                            <option value="experience-asc" className="text-M-heading-color">Experience (Low to High)</option>
                            <option value="experience-desc" className="text-M-heading-color">Experience (High to Low)</option>
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
                    {/* Doctor filter end */}
              {/* 🔹 Doctors List/Grid */}
              {isGridView ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
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
                  <li key={index}
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
        </div>
    </div>
  );
};

export default DoctorsList;