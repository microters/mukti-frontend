'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import Button from "@/app/Component/Shared/Buttons/Button";

const BestDoctors = ({ doctors }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";

  const [activeDepartment, setActiveDepartment] = useState("all");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  // Departments including translated "All"
  const departments = [
    "all",
    ...new Set(
      doctors.slice(0,6).map(
        (doc) =>
          doc.translations?.[currentLanguage]?.department ||
          doc.translations?.en?.department ||
          ""
      )
    ),
  ];

  useEffect(() => {
    if (activeDepartment === "all") {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(
        (doc) =>
          doc.translations?.[currentLanguage]?.department === activeDepartment
      );
      setFilteredDoctors(filtered);
    }
  }, [activeDepartment, doctors, currentLanguage]);

  const displayedDoctors =
    activeDepartment === "all" ? filteredDoctors.slice(0, 6) : filteredDoctors;

  return (
    <div className="py-12 lg:py-[100px]">
      <div className="container">
        <SectionHeading
          heading={t("doctors.topRated")}
          subtitle={t("doctors.meetProfessionals")}
          align="center"
        />

        {/* Tabs */}
        <div className="p-4 mx-auto mt-8">
          <div className="flex-col sm:flex-row flex-wrap flex justify-center space-y-0 md:space-x-6 lg:space-x-12 py-4 px-3 md:px-7 bg-M-heading-color rounded-md">
            {departments.length > 0 ? (
              departments.map((department, index) => {
                const isAll = department === "all";
                const displayLabel = isAll ? t("doctors.all") : department;

                return (
                  <button
                    key={index}
                    onClick={() => setActiveDepartment(department)}
                    className={`px-4 py-2 rounded-md min-w-24 font-semibold font-jost text-base uppercase hover:bg-white hover:text-M-heading-color transition-all duration-500 relative before:w-[1px] before:h-1/2 before:bg-white before:absolute before:top-1/2 before:-right-3 lg:before:-right-6 before:-translate-y-1/2 last:before:hidden md:before:block before:hidden ${
                      activeDepartment === department
                        ? "bg-white text-M-heading-color"
                        : "text-white"
                    }`}
                  >
                    {displayLabel}
                  </button>
                );
              })
            ) : (
              <Skeleton width={150} height={40} count={5} />
            )}
          </div>

          {/* Doctor Grid */}
          <div className="mt-4">
            {displayedDoctors.length === 0 ? (
              <p className="text-center text-lg font-bold">
                {t("doctors.noDoctorsAvailable", {
                  department: activeDepartment,
                })}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedDoctors.map((doctor) => {
                  const data = doctor.translations?.[currentLanguage] || {};
                  const doctorImage = doctor.icon
                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${doctor.icon}`
                    : "/default-profile-photo.png";
                  const profileLink = doctor.slug ? `/doctor/${doctor.slug}` : "#";
                  const appointmentLink = doctor.id ? `/book-appointment/${doctor.id}` : "#";

                  return (
                    <div
                      key={doctor.id}
                      className="border-2 rounded-md overflow-hidden transition-all duration-300 group hover:border-M-primary-color flex flex-col justify-between"
                    >
                      <div className="flex flex-col md:flex-row py-7 px-6 gap-7">
                        <div className="border-2 border-transparent w-24 h-24 rounded-full overflow-hidden transition-all duration-300 group-hover:border-M-primary-color shrink-0">
                          <Image
                            src={doctorImage}
                            alt={data.name || "Doctor"}
                            width={96}
                            height={96}
                            className="w-full rounded-full object-cover"
                            priority
                          />
                        </div>

                        <div className="flex-1">
                          <ul className="flex flex-wrap items-center gap-4 mb-5">
                            <li className="border-2 border-[#00224F50] inline-block w-auto rounded-md py-2 px-4 text-M-primary-color text-base font-jost font-normal">
                              {data.department || t("doctors.unknownDepartment")}
                            </li>
                            <li className="bg-[#323290] inline-flex items-center gap-1 rounded-md py-2 px-4 font-jost font-normal text-base text-white">
                              <Icon icon="material-symbols-light:star" width="24" height="24" className="text-[#F1E132]" />
                              ({doctor.reviews || 0})
                            </li>
                          </ul>

                          <h3 className="text-[#323290] text-xl font-jost font-bold mb-4">
                            <Link href={profileLink} prefetch className="hover:text-M-primary-color transition-all duration-300 capitalize">
                              {data.name || t("doctors.noNameAvailable")}
                            </Link>
                          </h3>

                          <p className="text-M-text-color text-base font-normal font-jost flex items-start gap-2">
                            <Icon icon="oui:index-open" width="24" className="text-M-heading-color shrink-0 relative top-[2px]" />
                            {data.academicQualification || t("doctors.noQualification")}
                          </p>

                          <p className="text-M-text-color text-base font-normal font-jost flex items-center gap-2 mt-2 capitalize">
                            <Icon icon="mdi:location-on-outline" width="24" className="text-M-heading-color" />
                            Mukti Hospital
                          </p>
                        </div>
                      </div>

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

            {/* Show More Button (for All only if more than 6 doctors) */}
            {activeDepartment === "all" && doctors.length > 6 && (
              <div className="flex justify-center mt-8">
                <Button
                  linkHref="/doctor"
                  buttonText={t("doctors.showMore")}
                  buttonColor="bg-M-secondary-color"
                  textColor="text-white"
                  borderColor="border-M-secondary-color"
                  padding="py-3 px-8"
                  fontSize="text-lg"
                  icons="iconamoon:arrow-right-2-light"
                  alignment="text-center"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestDoctors;
