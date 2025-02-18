"use client";
import React, { useEffect, useState } from "react";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/Component/Shared/Buttons/Button";
import { Icon } from "@iconify/react";
import axios from "axios";

// Assets
import shape from "@/assets/images/features-shape3.png";
// import defaultIcon from "@/assets/images/default-category.png"; // Fallback image for missing icons

const BASE_URL = "http://localhost:3000/uploads"; // Your uploads folder

const Category = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch departments data from API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Ensure API key is in your .env file
        const response = await axios.get("http://localhost:5000/api/department", {
          headers: { "x-api-key": apiKey },
        });

        // Map data to add full URL for icons
        const formattedDepartments = response.data.map((department) => ({
          ...department,
          icon: department.icon && typeof department.icon === "string"
            ? `${BASE_URL}/${department.icon}` // Construct full URL only if valid
            : "defaultIcon", // Use fallback image if icon is null or invalid
        }));

        setDepartments(formattedDepartments); // Store formatted data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching department data:", error);
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="bg-[#E6F5F3] py-[100px] px-[10px]">
      <div className="container">
        <SectionHeading align="center" heading="Browse by Specialist" subtitle="Category" />

        {/* Show loading state while fetching data */}
        {loading ? (
          <p className="text-center text-lg font-bold">Loading categories...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-10 mb-10">
            {departments.length > 0 ? (
              departments.map((department) => (
                <div key={department.id} className="bg-white group text-center py-8 px-6 rounded-lg overflow-hidden relative">
                  {/* Background shape image */}
                  <Image
                    src={shape}
                    alt="Shape"
                    className="absolute -left-3 top-0 max-w-36 opacity-0 group-hover:opacity-100 group-hover:left-0 transition-all duration-300"
                  />

                  {/* Department Icon */}
                  <div className="flex items-center justify-center size-20 mx-auto mb-3">
                    {/* <Image 
                      src={department.icon} 
                      alt={department.translations.en.name} 
                      width={80} 
                      height={80} 
                      className="rounded-full object-cover" 
                    /> */}
                  </div>

                  {/* Department Name */}
                  <h3 className="text-xl text-M-heading-color font-bold font-jost">{department.translations.en.name}</h3>

                  {/* Link to Department Page */}
                  <Link
                    href={`/departments/${department.id}`}
                    className="size-14 inline-flex items-center justify-center bg-[#E6F5F3] text-M-primary-color rounded-full mt-5 origin-center transition-all duration-300 group-hover:bg-M-secondary-color group-hover:text-white"
                  >
                    <Icon icon="solar:arrow-right-linear" width="24" height="24" />
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center text-lg font-bold">No categories available.</p>
            )}
          </div>
        )}

        {/* Button to view all services */}
        <Button
          linkHref="/services"
          buttonText="All Services"
          buttonColor="bg-M-secondary-color"
          textColor="text-white"
          borderColor="border-M-secondary-color"
          padding="py-3 px-8"
          fontSize="text-lg"
          icons="iconamoon:arrow-right-2-light"
          alignment="text-center"
        />
      </div>
    </div>
  );
};

export default Category;
