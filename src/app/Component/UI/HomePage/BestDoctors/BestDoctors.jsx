"use client";
import React, { useEffect, useState } from "react";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import DoctorsCard from "@/app/Component/Shared/DoctorsCard/DoctorsCard";
import axios from "axios";

const BestDoctors = () => {
  const [activeTab, setActiveTab] = useState("Cardiology");
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDoctorsData = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        const response = await axios.get("http://localhost:5000/api/doctor", {
          headers: { "x-api-key": apiKey },
        });

        console.log("Fetched Doctors Data:", response.data);

        const uniqueDepartments = [...new Set(response.data.map((doctor) => doctor?.translations?.en?.department || "Unknown"))];

        setDepartments(uniqueDepartments);
        setDoctorsList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors data:", error);
        setLoading(false);
      }
    };

    fetchDoctorsData();
  }, []);

  // Filter doctors based on active tab
  const filteredDoctors = doctorsList.filter(
    (doctor) => doctor?.translations?.en?.department === activeTab && doctor?.id
  );
  
  return (
    <div className="py-[100px]">
      <div className="container">
        <SectionHeading heading="Top Rated Specialists" subtitle="MEET OUR PROFESSIONALS" align="center" />

        <div className="p-4 mx-auto mt-8">
          {/* Tab Buttons */}
          <div className="flex justify-between space-x-2 py-4 px-7 bg-M-heading-color rounded-md">
            {departments.map((department) => (
              <button
                key={department}
                onClick={() => setActiveTab(department)}
                className={`px-4 py-2 rounded-md min-w-24 font-semibold font-jost text-base uppercase hover:bg-white hover:text-M-heading-color transition-all duration-500 relative before:absolute before:-right-[24px] before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-1/2 before:bg-white last:before:hidden ${
                  activeTab === department ? "text-M-heading-color bg-white" : "text-white"
                }`}
              >
                {department}
              </button>
            ))}
          </div>

          {/* Dynamic Tab Content */}
          <div className="mt-4">
            {filteredDoctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor) => (
                  <DoctorsCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <p className="text-center text-lg font-bold">No doctors available for this department.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestDoctors;
