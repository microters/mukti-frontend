import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import Image from "next/image";
import React from "react";

// Assets
import Aicon1 from "@/assets/images/ap1.png";
import Aicon2 from "@/assets/images/ap2.png";
import Aicon3 from "@/assets/images/ap3.png";
import shape from "@/assets/images/arrow.png";

const features = [
  {
    id: 1,
    icon: Aicon1,
    title: "Search Best Online Professional",
  },
  {
    id: 2,
    icon: Aicon2,
    title: "View Professional Profile",
  },
  {
    id: 3,
    icon: Aicon3,
    title: "Get Instant Doctor Appointment",
  },
];

const AppointmentProcess = () => {
  return (
    <div className="py-24 bg-M-section-bg">
      <div className="container">
        <SectionHeading
          heading="Appointment Process"
          align="center"
          subtitle="How we works?"
        />
        <div className="relative">
          <Image
            src={shape}
            alt="shape"
            className="absolute left-1/2 top-[15%] -translate-x-1/2 z-0 w-[60%] hidden md:block"
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 z-10 relative">
            {features.map((feature) => (
              <div key={feature.id} className="text-center">
                <div className="w-60 h-48 flex items-center justify-center bg-white mx-auto rounded-3xl mb-10">
                  <Image
                    src={feature.icon}
                    width={150}
                    alt={`icon${feature.id}`}
                  />
                </div>
                <h3 className="font-bold text-lg sm:text-xl text-M-heading-color max-w-48 mx-auto">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentProcess;
