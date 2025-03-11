import React from "react";
import Image from "next/image";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";
import Button from "@/app/Component/Shared/Buttons/Button";

// Assets
import icon1 from "@/assets/images/ambulance.png";
import icon2 from "@/assets/images/bed.png";
import icon3 from "@/assets/images/blood.png";
import icon4 from "@/assets/images/syring.png";
import aboutimage1 from "@/assets/images/aboutimage1.png";
import aboutimage2 from "@/assets/images/aboutimage2.png";
import aboutimage3 from "@/assets/images/aboutimage3.png";
import aboutObject from "@/assets/images/about_object.png";
import aboutShape1 from "@/assets/images/aboutShape1.png";
import aboutShape2 from "@/assets/images/aboutShape2.png";

const About = () => {
  return (
    <div className="container py-[100px] flex flex-wrap lg:flex-nowrap gap-10 items-center relative">
      <Image src={aboutObject} alt="about" className="hidden xl:block absolute right-0 bottom-[10%] -z-10 animate-spin" />
      <div className="w-full max-w-[500px] mx-auto lg:w-5/12 space-y-6 relative before:size-8 before:bg-M-secondary-color before:rounded-md before:rotate-45 before:absolute before:top-[52%] before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:z-[-1]">
        <Image src={aboutShape2} alt="about" className="absolute left-0 top-6 -z-10 animate-spin hidden md:inline-block" />
        <Image src={aboutShape1} alt="about" className="absolute left-0 bottom-[7%] -z-10 hidden md:inline-block" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-baseline">
          <Image src={aboutimage1} alt="about" className="pt-10 pl-10" />
          <Image src={aboutimage2} alt="about" className="h-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start px-5">
          <Image src={aboutimage3} alt="about3" className="pb-10 pl-5" />
          <div className="border border-M-primary-color h-[calc(100%-20px)] flex items-center justify-center rounded-3xl rounded-br-none relative before:w-full before:h-full before:absolute before:bg-[#E6F5F3] before:-top-[10px] before:-left-[10px] before:rounded-3xl before:rounded-br-none before:-z-10 ml-3 mt-2"> 
            <div className="text-center relative py-20">
              <h4 className="font-semibold font-poppins text-6xl text-[#39CABB]">10+</h4>
              <p className="font-jost font-bold text-xl">Year Experience</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  lg:w-7/12 space-y-6">
        <SectionHeading
          subtitle={"About Us"}
          heading={"The Great Place Of Medical Hospital Center."}
        />
        <p>
          We provide the special tips and advice’s of heath care treatment and
          high level of best technology involve in the our hospital. We provide
          the special tips and advice’s of heath care treatment. We provide the
          special tips and advice’s of heath care treatment and high level of
          best technology involve in the our hospital. We provide the special
          tips and advice’s of heath care treatment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2 max-w-[600px]">
          <div className="border border-[#323290] rounded-md flex items-center gap-4 overflow-hidden group">
            <div className="w-20 h-16 bg-[#323290]/10 flex items-center justify-center rounded-s-md rounded-r-[30px]">
              <Image src={icon1} width={36} alt="icon" className="group-hover:animate-shake" />
            </div>
            <h4 className="text-base text-M-heading-color">Emergency Help</h4>
          </div>
          <div className="border border-[#B2FDCD] rounded-md flex items-center gap-4 overflow-hidden group">
            <div className="w-20 h-16 bg-[#B2FDCD]/10 flex items-center justify-center rounded-s-md rounded-r-[30px]">
              <Image src={icon2} width={36} alt="icon" className="group-hover:animate-shake" />
            </div>
            <h4 className="text-base text-M-heading-color">
              Qualified Doctors
            </h4>
          </div>
          <div className="border border-[#FFBDBC] rounded-md flex items-center gap-4 overflow-hidden group">
            <div className="w-20 h-16 bg-[#FFBDBC]/10 flex items-center justify-center rounded-s-md rounded-r-[30px]">
              <Image src={icon3} width={36} alt="icon" className="group-hover:animate-shake" />
            </div>
            <h4 className="text-base text-M-heading-color">
              Best Professionals
            </h4>
          </div>
          <div className="border border-[#E2C4FF] rounded-md flex items-center gap-4 overflow-hidden group">
            <div className="w-20 h-16 bg-[#E2C4FF]/10 flex items-center justify-center rounded-s-md rounded-r-[30px]">
              <Image src={icon4} width={36} alt="icon" className="group-hover:animate-shake" />
            </div>
            <h4 className="text-base text-M-heading-color">
              Medical Treatment
            </h4>
          </div>
        </div>

        <Button
          linkHref="https://example.com"
          buttonText="Learn More"
          buttonColor="bg-M-secondary-color"
          textColor="text-white"
          borderColor="border-M-secondary-color"
          padding="py-3 px-8"
          fontSize="text-lg"
          icons="iconamoon:arrow-right-2-light"
        />
      </div>
    </div>
  );
};

export default About;
