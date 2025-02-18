import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/Component/Shared/Buttons/Button";
import { Icon } from "@iconify/react";

// Assets
import shape from "@/assets/images/features-shape3.png";
import defaultIcon from "@/assets/images/Cardiologist.png";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// ✅ Function to fetch departments from the API (Runs on Server)
async function getDepartments() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const response = await fetch(`${BACKEND_URL}/api/department`, {
      headers: { "x-api-key": apiKey },
      cache: "no-store", // Ensures fresh data on every request
    });

    if (!response.ok) {
      throw new Error("Failed to fetch department data");
    }

    const data = await response.json();

    // Map data to add full URL for icons
    return data.map((department) => ({
      ...department,
      icon: department.icon
        ? `${BACKEND_URL}${department.icon}`
        : defaultIcon, // Use fallback if no icon
    }));
  } catch (error) {
    console.error("Error fetching department data:", error);
    return [];
  }
}

export default async function Category() {
  const departments = await getDepartments();

  return (
    <div className="bg-[#E6F5F3] py-[100px] px-[10px]">
      <div className="container">
        <SectionHeading align="center" heading="Browse by Specialist" subtitle="Category" />

        {/* Show departments */}
        {departments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-10 mb-10">
            {departments.map((department) => (
              <div key={department.id} className="bg-white group text-center py-8 px-6 rounded-lg overflow-hidden relative">
                {/* Background shape image */}
                <Image
                  src={shape}
                  alt="Shape"
                  className="absolute -left-3 top-0 max-w-36 opacity-0 group-hover:opacity-100 group-hover:left-0 transition-all duration-300"
                />

                {/* Department Icon */}
                <div className="flex items-center justify-center size-20 mx-auto mb-3">
                  <Image 
                    src={department.icon} 
                    alt={department.translations.en.name} 
                    width={80} 
                    height={80} 
                    className="rounded-full object-cover" 
                    unoptimized // Ensures compatibility with external images
                  />
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
            ))}
          </div>
        ) : (
          <p className="text-center text-lg font-bold">No categories available.</p>
        )}

        {/* Button to view all services */}
        <Button
          linkHref="/"
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
}
