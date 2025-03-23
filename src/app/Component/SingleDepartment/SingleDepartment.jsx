'use client'
import AppointmentForm from "@/app/Component/Shared/AppointmentForm/AppointmentForm";
import Button from "@/app/Component/Shared/Buttons/Button";
import CommonHero from "@/app/Component/UI/CommonHero";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const SingleTreatment = ({department, doctors}) => {

    const { i18n } = useTranslation();
    const currentLanguage = i18n.language || "en";
    const departmentTranslations = department?.translations?.[currentLanguage] 
      || department?.translations?.en 
      || {};

    const departmentName = departmentTranslations.name || "Fallback Dept";
    const filteredDoctors = (doctors || []).filter((doctor) => {
      const docTranslations = doctor.translations[currentLanguage] 
        || doctor.translations.en 
        || {};

      return docTranslations.department?.toLowerCase() === departmentName.toLowerCase();
    });

  return (
    <div>
      <CommonHero pageName={departmentTranslations.name || "Fallback Title"} />
      <div className="container grid grid-cols-1 lg:grid-cols-3 pb-24 gap-y-10 lg:gap-10 relative -mt-10 md:-mt-20 ">
        <div className="col-span-2 shadow-md bg-white py-8 px-4 md:px-8 rounded-md">
          <h3 className="text-2xl mb-3">
            Cardiologist Services at Mukti Hospital
          </h3>
          <div className="jodit-description"
            dangerouslySetInnerHTML={{
            __html: departmentTranslations.description || "",
            }}
        />
        </div>
        {/* Sidebar */}
        <div className="col-span-1 space-y-6">
          {/* Appointment Forms */}
          {/* <div className="bg-M-heading-color px-5 py-8 rounded-md">
            <h3 className="text-2xl mb-4 text-white text-center">
              Request for Appointment
            </h3>
            <AppointmentForm />
          </div> */}
           {/* CTA Start */}
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
                      Get updated on whatsapp & accept T&C
                    </label>
                  </div>
                </div>
                <button className="font-bold font-jost text-base md:text-xs xl:text-lg text-white py-3 px-3 md:px-3 lg:px-8 w-full bg-M-primary-color flex items-center justify-center gap-2 rounded-md uppercase transition-all duration-300 hover:bg-M-secondary-color">
                  {" "}
                  <Icon icon="solar:call-medicine-linear" width="24" /> Request
                  callback
                </button>
              </form>
            </div>
            {/* CTA End */}
          {/* Relative Doctors */}
          <div className="border border-M-text-color/20 rounded-md p-5">
            <h3 className="text-2xl mb-6 text-center border-b border-M-text-color/20 pb-3">
              Best {departmentName}
            </h3>
            <div className="grid grid-cols-1 gap-6">
            {filteredDoctors.length === 0 && (
                <p className="text-center text-slate-500">
                  No doctors found for {departmentName}.
                </p>
              )}
              {filteredDoctors.map((doc) => {
                const docData = doc.translations[currentLanguage] 
                  || doc.translations.en 
                  || {};
                const doctorImage = doc.icon
                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${doc.icon}`
                  : "/default-profile-photo.png";
                return (
                    <div className="bg-white shadow-md rounded-md p-5 text-center border border-M-text-color/20">
                    <div className="size-20 overflow-hidden rounded-full mx-auto border-2 border-M-primary-color mb-5">
                      <Image src={doctorImage}  alt={docData.name || "Doctor Image"}  width={80} height={80}/>
                    </div>
                    <h4>
                      <Link
                        href="#"
                        className="text-lg font-semibold font-jost text-black"
                      >
                        {docData.name || "Doctor Name"}
                      </Link>
                    </h4>
                    <h6 className="border border-M-primary-color rounded-md py-1 px-3 inline-flex font-jost fold-bold text-base text-M-text-color my-2">
                      {docData.department || "Department"}
                    </h6>
                    <p className="text-M-text-color text-base text-left font-normal font-jost flex items-start gap-2 md:basis-80 mb-5">
                      <Icon
                        icon="oui:index-open"
                        width="24"
                        className="text-M-heading-color shrink-0 relative top-1"
                      />
                      <span>{docData.academicQualification || "Academic Qualification"}</span>
                    </p>
                    <Link
                      href="#"
                      passHref
                      className="bg-[#E8EEF4] block w-full py-3 px-3 font-jost font-bold text-M-heading-color rounded-md transition-all duration-300 hover:bg-M-primary-color hover:text-white"
                    >
                      Book An Appointment
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTreatment;