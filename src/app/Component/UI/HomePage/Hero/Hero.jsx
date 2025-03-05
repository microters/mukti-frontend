import React from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import FormButton from "@/app/Component/Shared/Buttons/FormButton";
import searchIcon from "@/assets/images/search.png";
import departmentIcon from "@/assets/images/department.png";
import doctorIcon from "@/assets/images/doctor.png";
import waveImag from "@/assets/images/heroWaveShape.png";
import tabletIcon from "@/assets/images/tablet.png";
import injectionIcon from "@/assets/images/injection.png";
import penToolIcon from "@/assets/images/pen-tool.png";
import crossShapeIcon from "@/assets/images/cross-shape.png";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="bg-[url(@/assets/images/heroBG.png)] bg-cover bg-top">
      <div className="pt-[60px] lg:pt-[180px] pb-20 md:pb-32 lg:pb-[300px] px-3 bg-gradient-to-t from-[#009650be] to-[#323290be] relative">
        {/* Shapes */}
        <Image
          src={tabletIcon}
          alt="shape"
          className="left-[10%] top-[10%] absolute animate-spin hidden lg:block"
        />
        <Image
          src={injectionIcon}
          alt="shape"
          className="left-[3%] bottom-[30%] absolute animate-pulse hidden lg:block"
        />
        <Image
          src={penToolIcon}
          alt="shape"
          className="right-[10%] bottom-[30%] absolute animate-pulse hidden lg:block"
        />
        <Image
          src={crossShapeIcon}
          alt="shape"
          className="right-[5%] top-[20%] absolute animate-spin hidden lg:block"
        />
        <Image
          src={waveImag}
          alt="wavwe Shape"
          className="absolute -bottom-1 left-0  w-full"
        />
        <div className="container mx-auto text-center">
          <span className="font-jost font-medium leading-4 tracking-wider text-base text-white mb-4 block uppercase">
            Welcome to Mukti Hospital
          </span>
          <h1 className="font-jost font-bold !leading-[1.4] text-3xl md:text-6xl text-white max-w-[724px] mx-auto tracking-[4px] ">
            We Take Care Of Your Healthy Health.
          </h1>
          <form className="mt-8 bg-white/10 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-between items-center bg-white px-8 py-7 lg:py-3 rounded-md">
              <div className="flex items-center gap-2 relative before:hidden lg:before:block before:absolute before:w-[1px] before:h-full before:bg-slate-300 before:-right-[15px]">
                <Image src={searchIcon} alt="searchIcon" className="w-6" />
                <input
                  type="text"
                  placeholder="Search Specialties..."
                  className="font-jost font-normal text-base outline-none ring-0 w-full"
                />
              </div>
              <div className="flex items-center gap-2 relative before:hidden lg:before:block before:absolute before:w-[1px] before:h-full before:bg-slate-300 before:-right-[15px]">
                <Image src={departmentIcon} alt="searchIcon" className="w-6" />
                <select
                  name="department"
                  id="department"
                  className="w-full outline-none ring-0 py-2 cursor-pointer text-M-text-color"
                >
                  <option >Select a Department</option>
                  <option value="cardiology" className="text-M-heading-color">Cardiology</option>
                  <option value="neurology" className="text-M-heading-color">Neurology</option>
                  <option value="orthopedics" className="text-M-heading-color">Orthopedics</option>
                  <option value="pediatrics" className="text-M-heading-color">Pediatrics</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Image src={doctorIcon} alt="searchIcon" className="w-6" />
                <select
                  name="department"
                  id="department"
                  className="w-full outline-none ring-0 py-2 cursor-pointer text-M-text-color"
                >
                  <option >Select Doctor.... </option>
                  <option value="cardiology" className="text-M-heading-color">Cardiology</option>
                  <option value="neurology" className="text-M-heading-color">Neurology</option>
                  <option value="orthopedics" className="text-M-heading-color">Orthopedics</option>
                  <option value="pediatrics" className="text-M-heading-color">Pediatrics</option>
                </select>
              </div>
              <FormButton
                buttonText="Submit"
                buttonColor="bg-M-secondary-color"
                textColor="text-white"
                borderColor="bg-M-secondary-color"
                padding="py-3 px-8 lg:w-auto"
                fontSize="text-lg"
                alignment="text-center md:text-right"
              />
            </div>
          </form>
          <div className="flex flex-wrap gap-5 items-center justify-center mt-8">
            <h6 className="uppercase font-jost font-medium text-base text-white ">
              Popular Search:
            </h6>
            <div className="flex flex-wrap gap-4">
              <Link href={'#'} className="inline-block text-white text-base font-jost font-normal border border-white py-2 px-4 leading-4 hover:bg-M-primary-color transition-all duration-300">
                Psychiatry
              </Link>
              <Link href={'#'} className="inline-block text-white text-base font-jost font-normal border border-white py-2 px-4 leading-4 hover:bg-M-primary-color transition-all duration-300">
                Pharmacy
              </Link>
              <Link href={'#'} className="inline-block text-white text-base font-jost font-normal border border-white py-2 px-4 leading-4 hover:bg-M-primary-color transition-all duration-300">
                Diagnostics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
