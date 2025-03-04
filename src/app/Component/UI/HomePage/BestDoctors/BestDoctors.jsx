'use client';
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";

const BestDoctors = ({ doctors = [], doctorDepartments = { en: [], bn: [] } }) => {
  console.log(doctors)
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";
   // Ensure translations are ready before rendering
   const [isMounted, setIsMounted] = useState(false);
   useEffect(() => {
     setIsMounted(true);
   }, []);

  // Ensure doctorDepartments is always an array
  const departments = doctorDepartments[currentLanguage] || [];

  // State to store the selected department
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0] || "");

  useEffect(() => {
    if (departments.length > 0) {
      setSelectedDepartment(departments[0]);
    }
  }, [currentLanguage, departments]);

  // Filter doctors based on the selected department & current language
  const filteredDoctors = doctors
    .filter((doctor) => {
      const doctorDept = doctor?.translations?.[currentLanguage]?.department;
      return doctorDept && doctorDept === selectedDepartment;
    })
    .slice(0, 6);
    
    if (!isMounted) {
      return <div className="min-h-[200px] bg-gray-100 animate-pulse"></div>;
    }
  return (
    <div className="py-[100px]">
      <div className="container">
        <SectionHeading heading={t("doctors.topRated")} subtitle={t("doctors.meetProfessionals")} align="center" />

        <div className="p-4 mx-auto mt-8">
          {/* ✅ Department Tabs */}
          <div className="flex-col sm:flex-row flex-wrap flex justify-center space-y-0 md:space-x-6 lg:space-x-12 py-4 px-3 md:px-7 bg-M-heading-color rounded-md">
            {departments.length > 0 ? (
              departments.map((department) => (
                <button
                  key={department}
                  onClick={() => setSelectedDepartment(department)}
                  className={`px-4 py-2 rounded-md min-w-24 font-semibold font-jost text-base uppercase hover:bg-white hover:text-M-heading-color transition-all duration-500 relative before:w-[1px] before:h-1/2 before:bg-white before:absolute before:top-1/2 before:-right-3 lg:before:-right-6 before:-translate-y-1/2 last:before:hidden md:before:block before:hidden ${
                    selectedDepartment === department ? "bg-white text-M-heading-color" : "text-white"
                  }`}
                >
                  {department}
                </button>
              ))
            ) : (
              <Skeleton width={150} height={40} count={5} />
            )}
          </div>

          {/* Dynamic Doctors List Based on Selected Department */}
          <div className="mt-4">
            {filteredDoctors.length === 0 ? (
              <p className="text-center text-lg font-bold">{t("doctors.noDoctorsAvailable", { department: selectedDepartment })}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor) => {
                  const doctorData = doctor.translations?.[currentLanguage] || {};
                  const profileLink = doctor.id ? `/doctor/${doctor.id}` : "#";
                  const appointmentLink = doctor.id ? `/book-appointment/${doctor.id}` : "#";

                  return (
                    <div key={doctor.id} className="border-2 rounded-md overflow-hidden transition-all duration-300 group hover:border-M-primary-color flex flex-col justify-between">
                      <div className="flex py-7 px-6 gap-7">
                        {/* Doctor Image */}
                        <div className="border-2 border-transparent size-24 rounded-full overflow-hidden transition-all duration-300 group-hover:border-M-primary-color shrink-0">
                          <Image
                            src={doctor.icon || "/default-profile-photo.png"}
                            alt={doctorData.name || "Doctor"}
                            width={96}
                            height={96}
                            className="w-full rounded-full object-cover"
                            priority
                          />
                        </div>

                        {/* Doctor Info */}
                        <div className="flex-1">
                          <ul className="flex flex-wrap items-center gap-4 mb-5">
                            {/* Department */}
                            <li className="border-2 border-[#00224F50] inline-block w-auto rounded-md py-2 px-4 text-M-primary-color text-base font-jost font-normal">
                              {doctorData.department || t("doctors.unknownDepartment")}
                            </li>

                            {/* Reviews */}
                            <li className="bg-[#323290] inline-flex items-center gap-1 rounded-md py-2 px-4 font-jost font-normal text-base text-white">
                              <Icon icon="material-symbols-light:star" width="24" height="24" className="text-[#F1E132]" />
                              ({doctor.reviews || 0})
                            </li>
                          </ul>

                          {/* Doctor Name */}
                          <h3 className="text-[#323290] text-xl font-jost font-bold mb-4">
                            <Link href={profileLink} className="hover:text-M-primary-color transition-all duration-300 capitalize">
                              {doctorData.name || t("doctors.noNameAvailable")}
                            </Link>
                          </h3>

                          {/* Academic Qualification */}
                          <p className="text-M-text-color text-base font-normal font-jost flex items-center gap-2">
                            <Icon icon="oui:index-open" width="24" className="text-M-heading-color" />
                            {doctorData.academicQualification || t("doctors.noQualification")}
                          </p>

                          {/* Location */}
                          <p className="text-M-text-color text-base font-normal font-jost flex items-center gap-2 mt-2 capitalize">
                            <Icon icon="mdi:location-on-outline" width="24" className="text-M-heading-color" /> Mukti Hospital
                          </p>
                        </div>
                      </div>

                      {/* Appointment Button */}
                      <Link
                        href={appointmentLink}
                        className="bg-[#E8EEF4] text-[#00224F] text-lg w-full py-3 px-3 block text-center font-bold font-jost hover:bg-M-primary-color hover:text-white transition-all duration-300"
                      >
                        {t("doctors.bookAppointment")}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestDoctors;
