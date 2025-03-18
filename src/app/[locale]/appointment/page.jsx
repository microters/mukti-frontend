"use client";
import CommonHero from "@/app/Component/UI/CommonHero";
import { Icon } from "@iconify/react";
import { useState } from "react";

import verified from "@/assets/images/badge.png";
import Image from "next/image";
import Link from "next/link";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Appointment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [value, onChange] = useState(new Date());

  // Handle next step
  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Step labels array
  const stepLabels = [
    "Specialty",
    "Date & Time",
    "Submit Number",
    "Confirmation",
    "Final Confirmation",
  ];

  return (
    <div>
      <CommonHero pageName="Appointment" />
      {/* Step From */}
      <div className="container mx-auto px-4 md:px-0 my-24">
        <div className="bg-slate-100 p-10 mt-10 rounded-xl border border-M-text-color/20">
          {/* new one */}
          <div className="flex justify-between items-center mb-10 relative">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                className={`flex flex-col items-center relative lg:before:w-16 xl:before:w-24 before:h-[1px] before:absolute before:border before:border-dashed before:top-1/2 before:-translate-y-1/2 lg:before:-right-24 xl:before:-right-36 last:before:hidden ${step < currentStep ? "before:bg-M-text-color" : "before:bg-M-text-color/10"}`}
                key={step}
              >
                {/* Step Circles */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-jost font-bold text-lg ${
                    step === currentStep
                      ? "bg-M-primary-color text-white"
                      : step < currentStep
                        ? "bg-M-primary-color text-white"
                        : "bg-slate-300 text-white"
                  }`}
                >
                  {step}
                </div>
                {/* Step Label */}
                <div
                  className={`mt-2 text-base font-jost  ${
                    step === currentStep
                      ? "text-M-heading-color"
                      : step < currentStep
                        ? "text-M-heading-color"
                        : "text-slate-300"
                  }`}
                >
                  {stepLabels[step - 1]}
                </div>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div>
            {currentStep === 1 && (
              <div>
                <div className="flex flex-col justify-between items-center md:flex-row gap-6 bg-white px-4 md:px-7 py-6 rounded-md">
                  <div className="w-full h-32 max-w-32 rounded-full border-2 border-M-primary-color overflow-hidden">
                    <Image
                      src="/_next/image/?url=https%3A%2F%2Fapi.muktihospital.com%2Fuploads%2Fdoctor-placeholder-1.png&w=128&q=75"
                      width={100}
                      height={100}
                      alt="dr image"
                      className="w-full"
                    />
                  </div>
                  {/* Doctor Info */}
                  <div className="">
                    <ul className="flex flex-wrap items-center gap-4 mb-5">
                      {/* Department */}
                      <li className="border-2 border-[#00224F50] inline-block w-auto rounded-md py-2 px-4 text-M-primary-color text-base font-jost font-normal">
                        Neonatology
                      </li>

                      {/* Reviews */}
                      <li className="bg-[#323290] inline-flex items-center gap-1 rounded-md py-2 px-4 font-jost font-normal text-base text-white">
                        <Icon
                          icon="icon-park-outline:hospital-three"
                          width="16"
                          height="16"
                          className="text-white"
                        />
                        4 Years
                      </li>
                    </ul>

                    {/* Doctor Name */}
                    <h3 className="text-[#323290] text-xl font-jost font-bold mb-4">
                      <Link
                        href={"#"}
                        prefetch={true}
                        className="hover:text-M-primary-color transition-all duration-300 capitalize"
                      >
                        Dr. Nahidul Islam
                      </Link>
                    </h3>

                    {/* Academic Qualification */}
                    <p className="text-M-text-color text-base font-normal font-jost flex items-start gap-2">
                      <Icon
                        icon="oui:index-open"
                        width="24"
                        className="text-M-heading-color shrink-0 relative top-[2px]"
                      />
                      BDS, MDS - Oral & Maxillofacial Surgery
                    </p>

                    {/* Location */}
                    <p className="text-M-text-color text-base font-normal font-jost flex items-center gap-2 mt-2 capitalize">
                      <Icon
                        icon="mdi:location-on-outline"
                        width="24"
                        className="text-M-heading-color"
                      />{" "}
                      Mukti Hospital
                    </p>
                  </div>

                  {/* Available Time */}
                  <div className="text-center space-y-2">
                    <h4 className="flex items-center gap-2 text-[#323290] text-xl font-jost font-bold mb-4"><Icon icon="lucide:alarm-clock" width="24" height="24" className="text-M-primary-color" /> Availabe</h4>
                    <p className="font-jost text-base text-M-text-color"><strong>Friday-Monday:</strong> <br /> 12:AM - 03 PM</p>
                  </div>
                  
                  {/* Available Time */}
                  <div className="text-center space-y-2">
                    <Icon icon="majesticons:bookmark-plus" width="24" height="24" className="mx-auto text-M-primary-color" />  
                    <h4 className="text-[#323290] text-xl font-jost font-bold mb-4"> Doctor Fee :</h4>
                    <p className="font-jost text-base text-M-text-color">$100 - $200</p>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 2 && <div className="mb-10">
                <div className="rounded-md bg-white">
                  <h3 className="border-b border-M-text-color/20 p-7 pb-5 ">Select Date & Time</h3>
                  <div className="p-7">
                    <Calendar onChange={onChange} value={value} />
                  </div>
                </div>

            </div>}
            {currentStep === 3 && <div>Step 3: Submit Number</div>}
            {currentStep === 4 && <div>Step 4: Confirmation</div>}
            {currentStep === 5 && <div>Step 5: Final Confirmation</div>}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between border-t border-M-text-color/10 pt-8">
            {currentStep > 1 && (
              <button
                className="flex items-center justify-center px-4 py-3 bg-M-heading-color text-white rounded hover:bg-M-heading-color font-jost font-medium text-base min-w-24 uppercase "
                onClick={prevStep}
              >
                <Icon icon="mynaui:chevron-left" width="24" height="24" />
                Previous
              </button>
            )}
            {currentStep < 5 ? (
              <button
                className="flex items-center justify-center px-4 py-3 bg-M-primary-color text-white rounded hover:bg-M-primary-color font-jost font-medium text-base min-w-24 uppercase"
                onClick={nextStep}
              >
                Next
                <Icon icon="mynaui:chevron-right" width="24" height="24" />
              </button>
            ) : (
              <button
                className="px-4 py-3 bg-M-primary-color text-white rounded hover:bg-M-primary-color font-jost font-medium text-base min-w-24 uppercase"
                onClick={() => alert("Form Submitted!")}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;