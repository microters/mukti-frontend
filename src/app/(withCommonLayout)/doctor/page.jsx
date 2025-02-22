"use client";
import FormButton from "@/app/Component/Shared/Buttons/FormButton";
import HeroInnerPage from "@/app/Component/UI/HeroInnerPage";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

import dermatology from "@/assets/images/dermatology-icon.png";
import cardiology from "@/assets/images/cardiologyIcon.png";
import gastrology from "@/assets/images/gastrologyIcon.png";
import male from "@/assets/images/male.png";
import female from "@/assets/images/female.png";
import Button from "@/app/Component/Shared/Buttons/Button";

const Doctor = () => {
    const [selectedSpecialties, setSelectedSpecialties] = useState({});
    const [selectedGenders, setSelectedGenders] = useState({});
    const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(true);
    const [isGendersOpen, setIsGendersOpen] = useState(true);

  const specialtyItems = [
    { id: 1, title: "Dermatology", image: dermatology },
    { id: 2, title: "Gastrology", image: gastrology },
    { id: 3, title: "Cardiology", image: cardiology },
    { id: 4, title: "Cardiology", image: cardiology },
    { id: 5, title: "Cardiology", image: cardiology },
  ];

  const genders = [
    { id: 1, title: "Male", image: male },
    { id: 2, title: "Female", image: female },
  ];
  


  const toggleSpecialty = (id) => {
    setSelectedSpecialties((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleGender = (id) => {
    setSelectedGenders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetSelections = () => {
    setSelectedSpecialties({});
    setSelectedGenders({});
  };

  return (
    <div>
      <HeroInnerPage />
      <div className="container py-24">
        <div className="grid grid-cols-3 gap-8">
          <div className="space-y-8">
            <div className="bg-M-heading-color px-5 py-7 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-2">
                Can't find what are you looking for?
              </h3>
              <h5 className="text-base font-normal text-slate-200 mb-6">
                Fill this form for callback from us.
              </h5>
              <form action="#" className="flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Your Name*"
                  required
                  className="block w-full px-5 py-3 ring-0 focus:outline-none rounded-md font-jost "
                />
                <input
                  type="tel"
                  placeholder="Enter your Number"
                  className="block w-full px-5 py-3 ring-0 focus:outline-none rounded-md font-jost"
                />
                <div>
                  <div className=" relative">
                    <input
                      type="checkbox"
                      id="agreement"
                      className="hidden peer"
                    />
                    <span className="h-4 w-4 border flex-none border-slate-100 rounded inline-flex items-center justify-center ltr:mr-3 rtl:ml-3 transition-all duration-150 bg-slate-100 peer-checked:bg-M-primary-color peer-checked:ring-1 peer-checked:ring-M-primary-color peer-checked:ring-offset-1 absolute top-[6px] left-0 z-0">
                      <Icon
                        icon="mynaui:check"
                        width="24"
                        className="text-slate-100"
                      />
                    </span>
                    <label
                      htmlFor="agreement"
                      className="cursor-pointer font-jost font-normal text-base text-slate-200 relative z-10 pl-6"
                    >
                      Get updateds on whatsapp & accept T&C
                    </label>
                  </div>
                </div>
                <button className="font-bold font-jost text-lg text-white py-3 px-8 w-full bg-M-primary-color flex items-center justify-center gap-2 rounded-md uppercase transition-all duration-300 hover:bg-M-secondary-color">
                  {" "}
                  <Icon icon="solar:call-medicine-linear" width="24" /> Request
                  callback
                </button>
              </form>
            </div>
            <div className="border border-M-primary-color/5 rounded-md overflow-hidden">
              <h3 onClick={() => setIsSpecialtiesOpen(!isSpecialtiesOpen)}
               className="text-xl text-white bg-M-primary-color px-5 py-4 flex items-center justify-between gap-5 w-full cursor-pointer">
                Specialty{" "}
                <span>
                  <Icon icon="solar:alt-arrow-down-linear" width="24" />
                </span>
              </h3>
              <ul className={`px-4 transition-all duration-300 overflow-hidden ${isSpecialtiesOpen ? "h-full" : "h-0"}`}>
                {specialtyItems.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => toggleSpecialty(item.id)}
                    className={`flex justify-between items-center gap-3 cursor-pointer py-4 border-b border-M-primary-color/10 last:border-0 transition-all duration-300 ${selectedSpecialties[item.id] ? "text-slate-900" : "text-slate-400"}`}
                  >
                    <span className="flex gap-3 items-cente font-jost font-normalr">
                      <Image src={item.image} alt={item.title} />
                      {item.title}
                    </span>
                    {selectedSpecialties[item.id] ? (
                      <Icon
                        icon="material-symbols-light:check-box-outline-rounded"
                        width="24"
                        className="text-M-primary-color"
                      />
                    ) : (
                      <Icon
                        icon="material-symbols-light:square-outline-rounded"
                        width="24"
                        className="text-slate-400"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-M-primary-color/5 rounded-md overflow-hidden">
              <h3 onClick={() => setIsGendersOpen(!isGendersOpen)} 
              className="text-xl text-white bg-M-primary-color px-5 py-4 flex items-center justify-between gap-5 w-full">
                Gender{" "}
                <span>
                  <Icon icon="solar:alt-arrow-down-linear" width="24" />
                </span>
              </h3>
              <ul className={`px-4 transition-all duration-300 overflow-hidden ${isGendersOpen ? "h-auto" : "h-0"}`}>
                {genders.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => toggleGender(item.id)}
                    className={`flex justify-between items-center gap-3 cursor-pointer py-4 border-b border-M-primary-color/10 last:border-0 transition-all duration-300 ${selectedGenders[item.id] ? "text-slate-900" : "text-slate-400"}`}
                  >
                    <span className="flex gap-3 items-center font-jost font-normal">
                      <Image src={item.image} alt={item.title} />
                      {item.title}
                    </span>
                    {selectedGenders[item.id] ? (
                      <Icon
                        icon="material-symbols-light:check-box-outline-rounded"
                        width="24"
                        className="text-M-primary-color"
                      />
                    ) : (
                      <Icon
                        icon="material-symbols-light:square-outline-rounded"
                        width="24"
                        className="text-slate-400"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={resetSelections} className="font-jost font-normal text-base text-white uppercase px-3 py-3 rounded-md w-full bg-M-secondary-color  transition-all duration-300 hover:bg-M-primary-color">Clear Filters</button>
          </div>
          <div className="col-span-2">
            <div className="border border-slate-900/30 flex items-center justify-between px-5 py-3 ">
                <h5 className="text-xl text-M-heading-color font-jost font-bold">Showing Doctors For You : <span className="bg-M-secondary-color text-white px-3 py-1 rounded-md">50</span></h5>
                <div>
                    <select name="sortFilter" id="sortFilter" className="px-3 py-2 rounded border-0 ring-0 focus:outline-none font-jost font-normal bg-slate-50">
                        <option value="name" className="cursor-pointer">Sort by Name</option>
                        <option value="experience" className="cursor-pointer">Sort by Experience</option>
                        <option value="rating" className="cursor-pointer">Sort by Rating</option>
                    </select>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
