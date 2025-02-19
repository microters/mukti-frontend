"use client";

import { useState, useEffect } from "react";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import DoctorsCard from "@/app/Component/Shared/DoctorsCard/DoctorsCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; 
import waveShape from "@/assets/images/waveShape.png";
import Image from "next/image";

const BestDoctorsClient = ({ doctors, departments }) => {
  // State to store the selected department
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Effect to filter doctors when department changes
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setFilteredDoctors(
        doctors
          .filter((doctor) => doctor?.translations?.en?.department === selectedDepartment)
          .slice(0, 6) // ✅ Show only first 6 doctors per department
      );
      setLoading(false);
    }, 500); // Simulated delay for skeleton loading
  }, [selectedDepartment]);

  return (
    <div className="py-[100px] relative">
      <Image src={waveShape} alt="wave Shape" className="absolute left-[10%]  top-[11%] animate-pulse"  />
      <div className="container">
        <SectionHeading heading="Top Rated Specialists" subtitle="MEET OUR PROFESSIONALS" align="center" />

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

          {/* ✅ Dynamic Doctors List Based on Selected Department */}
          <div className="mt-4">
            {loading ? (
              // ✅ Skeleton Loader while fetching doctors
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="border-2 rounded-md p-4">
                    <Skeleton circle={true} height={96} width={96} className="mb-4" />
                    <Skeleton height={20} width={`80%`} />
                    <Skeleton height={15} width={`60%`} />
                    <Skeleton height={15} width={`70%`} />
                    <Skeleton height={40} width={`100%`} />
                  </div>
                ))}
              </div>
            ) : filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor) => (
                  <DoctorsCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <p className="text-center text-lg font-bold">No doctors available for {selectedDepartment}.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestDoctorsClient;
