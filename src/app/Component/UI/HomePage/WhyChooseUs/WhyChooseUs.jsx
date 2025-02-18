import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import Image from "next/image";
import React from "react";

import iconImg from "@/assets/images/ww1.png";
import iconImg2 from "@/assets/images/ww2.png";
import iconImg3 from "@/assets/images/ww3.png";
import iconImg4 from "@/assets/images/ww4.png";
import shapeimg from "@/assets/images/wwShape.png";
import wwImage from "@/assets/images/wwImg.png";

const data = [
  {
    icon: iconImg,
    title: "Patient-Centered Care",
    description: "Emphasize your commitment to patient well-being",
  },
  {
    icon: iconImg2,
    title: "Emergency Support",
    description: "Emphasize your commitment to patient well-being",
  },
  {
    icon: iconImg3,
    title: "Expertise and Experience",
    description: "Emphasize your commitment to patient well-being",
  },
  {
    icon: iconImg4,
    title: "24/7 hour Emergency Call",
    description: "Emphasize your commitment to patient well-being",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="container py-24">
      <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-10">
        <div className="relative bg-M-heading-color rounded-lg px-10 pt-14 box-border">
            <Image src={wwImage} alt="wwImage" className="z-10 mx-auto" />
            <Image src={shapeimg} alt="wwImage" className="absolute left-0 bottom-0 z-0" />
        </div>
        <div>
          <SectionHeading
            subtitle="WHy Choose Us"
            heading="Why Our Patients Recommend Us"
            align="left"
          />
          <p className="text-M-text-color max-w-[525px] mt-4">
            We provide the special tips and advice’s of heath care treatment and high level of best technology involve in the our hospital.We provide the special tips and advice’s of heath care treatment.
          </p>

          <div className="max-w-[525px] space-y-6 mt-7">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 border border-[#615EFC]/20 p-5 rounded-lg hover:border-[#615EFC] transition-all duration-300"
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={50}
                  height={50} 
                  className="shrink-0"
                />
                <div>
                  <h4 className="font-bold font-jost text-xl text-M-heading-color">
                    {item.title}
                  </h4>
                  <p className="font-jost font-normal text-base text-M-text-color">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
