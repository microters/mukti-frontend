"use client"; 

import { useState } from "react";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import DoctorsCard from "@/app/Component/Shared/DoctorsCard/DoctorsCard";

const BestDoctorsClient = ({ doctors, departments }) => {
  // State to store the selected department
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);

  // Filter doctors dynamically based on the selected department
  const filteredDoctors = doctors.filter(
    (doctor) => doctor?.translations?.en?.department === selectedDepartment
  );

  return (
    <div className="py-[100px]">
      <div className="container">
        <SectionHeading heading="Top Rated Specialists" subtitle="MEET OUR PROFESSIONALS" align="center" />

        <div className="p-4 mx-auto mt-8">
          {/* Department Tabs */}
          <div className="flex justify-center space-x-2 py-4 px-7 bg-M-heading-color rounded-md">
            {departments.map((department) => (
              <button
                key={department}
                onClick={() => setSelectedDepartment(department)}
                className={`px-4 py-2 rounded-md min-w-24 font-semibold font-jost text-base uppercase hover:bg-white hover:text-M-heading-color transition-all duration-500 ${
                  selectedDepartment === department ? "bg-white text-M-heading-color" : "text-white"
                }`}
              >
                {department}
              </button>
            ))}
          </div>

          {/* Dynamic Doctors List Based on Selected Department */}
          <div className="mt-4">
            {filteredDoctors.length > 0 ? (
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
