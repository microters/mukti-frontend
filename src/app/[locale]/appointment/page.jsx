"use client";
import CommonHero from "@/app/Component/UI/CommonHero";
import { Icon } from "@iconify/react";
import { useState } from "react";

import verified from "@/assets/images/badge.png";
import Image from "next/image";
import Link from "next/link";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Appointment = () => {
  const [isValid, setIsValid] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [value, onChange] = useState(new Date());

  // Step labels array
  const stepLabels = [
    "Specialty",
    "Date & Time",
    "Patient Info",
    "Confirmation",
  ];
  const steps = Array.from(
    { length: stepLabels.length },
    (_, index) => index + 1
  );
  // Handle next step
  const nextStep = () => {
    if (currentStep < stepLabels.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const doctorData = [
    { day: "Sunday", dayNumber: 0, startTime: "10:00", endTime: "16:00" },
    { day: "Monday", dayNumber: 1, startTime: "Closed", endTime: "17:00" },
    { day: "Tuesday", dayNumber: 2, startTime: "10:00", endTime: "16:00" },
    { day: "Wednesday", dayNumber: 3, startTime: "08:30", endTime: "15:30" },
    { day: "Thursday", dayNumber: 4, startTime: "N/A", endTime: "N/A" },
    { day: "Friday", dayNumber: 5, startTime: "09:00", endTime: "14:00" },
    { day: "Saturday", dayNumber: 6, startTime: "10:00", endTime: "13:00" },
  ];

  const disabledDays = doctorData
    .filter((item) => item.startTime === "Closed" || item.startTime === "N/A")
    .map((item) => item.dayNumber);

  // Phone Number Validate
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });

  // Handle input change for all form fields
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "mobile") {
      // Ensure mobile number starts with "88"
      if (!value.startsWith("88")) {
        value = "88" + value.replace(/^88/, ""); // If the user does not enter "88", automatically add it
      }

      // Allow only numeric values
      value = value.replace(/\D/g, ""); // Remove any non-numeric characters

      // Limit length to 13 digits (format: 8801XXXXXXXX)
      if (value.length > 13) {
        value = value.slice(0, 13); // Restrict the mobile number length to 13 digits
      }

      // Validation: Check if the phone number is complete (13 digits including 88 prefix)
      const isValidPhoneNumber = value.length === 13;
      setIsValid(isValidPhoneNumber);
    }

    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <CommonHero pageName="Appointment" />
      {/* Step From */}
      <form className="container mx-auto px-4 md:px-0 my-24">
        <div className="bg-slate-100 p-5 md:p-10 mt-10 rounded-xl border border-M-text-color/20">
          {/* new one */}
          <div className="flex flex-wrap justify-between items-center gap-2  mb-10 relative">
            {steps.map((step) => (
              <div
                className={`flex flex-col items-center relative lg:before:w-16 xl:before:w-24 before:h-[1px] before:absolute before:border before:border-dashed before:top-1/2 before:-translate-y-1/2 lg:before:-right-24 xl:before:-right-48 last:before:hidden ${step < currentStep ? "before:bg-M-text-color" : "before:bg-M-text-color/10"}`}
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
                  className={`mt-2 text-base font-jost font-medium  ${
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 items-center md:flex-row gap-6 bg-white px-4 md:px-7 py-6 rounded-md">
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
                  <div className="md:col-span-2">
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
                    <h3 className="text-[#323290] text-lg font-jost font-bold mb-4">
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
                  <div className="text-left sm:text-center flex gap-3 justify-between sm:block sm:space-y-2">
                    <div>
                      <Icon
                        icon="lucide:alarm-clock"
                        width="24"
                        height="24"
                        className="text-M-primary-color sm:mx-auto"
                      />
                      <h4 className="text-[#323290] text-base sm:text-lg font-jost font-bold mb-2">
                        Available
                      </h4>
                    </div>
                    <p className="font-jost text-sm sm:text-base text-M-text-color">
                      <strong>Friday - Monday</strong> <br /> 12:00 AM - 03:00
                      PM
                    </p>
                  </div>

                  {/* Consultation Fee */}
                  <div className="text-left sm:text-center flex gap-3 justify-between sm:block sm:space-y-2">
                    <div>
                      <Icon
                        icon="majesticons:bookmark-plus"
                        width="24"
                        height="24"
                        className="sm:mx-auto text-M-primary-color"
                      />
                      <h4 className="text-[#323290] text-base sm:text-lg font-jost font-bold mb-2">
                        {" "}
                        Consultation Fee
                      </h4>
                    </div>
                    <div>
                      <p className="font-jost text-sm sm:text-base text-M-text-color">
                        Regular Fee: 1000TK
                      </p>
                      <p className="font-jost text-sm sm:text-base text-M-text-color">
                        Follow Up Fee: 800TK
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="mb-10">
                <div className="rounded-md bg-white">
                  <h3 className="border-b border-M-text-color/20 p-7 pb-5 text-xl">
                    Select Date & Time {steps[1]}
                  </h3>
                  <div className="p-7 block lg:flex gap-7 space-y-5 lg:space-y-5 ">
                    <div className="shrink-0">
                      <Calendar
                        onChange={onChange}
                        value={value}
                        minDate={new Date()}
                        tileDisabled={
                          ({ date, view }) =>
                            view === "month" &&
                            disabledDays.includes(date.getDay()) // Disable unavailable days
                        }
                      />
                    </div>
                    <div className="w-full rounded-md border border-M-text-color/20 p-5">
                      <h3 className="text-M-heading-color text-xl font-semibold text-center mb-4">
                        Available For Appointment
                      </h3>
                      <div>
                        <ul className="grid grid-cols-2 gap-3">
                          {doctorData.map((item, index) => {
                            // Convert time to 12-hour format with AM/PM
                            const convertTo12HourFormat = (time) => {
                              // Check if the time follows the HH:MM format using a regex
                              const isValidTime =
                                /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);

                              if (!isValidTime) {
                                return time; // Return the input string if it's not a valid time
                              }

                              return new Date(
                                `2025-01-01T${time}:00`
                              ).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              });
                            };

                            // Convert the day to short form (e.g., "Wednesday" to "Wed")
                            const dayShortForm = {
                              Sunday: "Sun",
                              Monday: "Mon",
                              Tuesday: "Tue",
                              Wednesday: "Wed",
                              Thursday: "Thu",
                              Friday: "Fri",
                              Saturday: "Sat",
                            };
                            const shortDay = dayShortForm[item.day] || item.day;

                            // Function to check if time is valid
                            const isValidTime = (time) =>
                              /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
                            // Determine if startTime and endTime are valid
                            const startTimeValid = isValidTime(item.startTime);
                            const endTimeValid = isValidTime(item.endTime);
                            return (
                              <li
                                key={index}
                                className={`text-sm md:text-base p-3 border border-M-heading-color/20 inline-flex flex-wrap justify-center gap-2 rounded font-jost w-full text-center uppercase ${startTimeValid && endTimeValid ? "bg-M-text-color/10" : " border-red-500 bg-M-secondary-color text-white"}`}
                              >
                                <strong>{shortDay}: </strong>
                                {startTimeValid && endTimeValid
                                  ? `${convertTo12HourFormat(item.startTime)} - ${convertTo12HourFormat(item.endTime)}`
                                  : convertTo12HourFormat(item.startTime) ||
                                    convertTo12HourFormat(item.endTime)}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="mb-10">
                <div className="rounded-md bg-white">
                  <h3 className="border-b border-M-text-color/20 p-7 pb-5 text-xl">
                    Patient Info {steps[2]}
                  </h3>
                  <div className="p-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-3 mb-7">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="font-jost font-medium text-base text-M-text-color mb-1 block"
                        >
                          Patient's Name{" "}
                          <span className="text-M-secondary-color">*</span>
                        </label>
                        <input type="text" id="name" className="inputField" />
                      </div>
                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="mobile"
                          className="font-jost font-medium text-base text-M-text-color mb-1 block"
                        >
                          Phone{" "}
                          <span className="text-M-secondary-color">*</span>
                        </label>
                        <div className="mt-1 relative flex items-center">
                          <div className="absolute left-3 top-[14px]  flex items-center space-x-1">
                            <Icon
                              icon="twemoji:flag-bangladesh"
                              width="18"
                              height="18"
                            />
                            <span className="text-black font-medium relative -top-[1px]">
                              +
                            </span>
                          </div>
                          <input
                            type="tel"
                            name="mobile"
                            id="mobile"
                            autoComplete="tel"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                            placeholder="8801XXXXXXXX"
                            className={`h-[48px] border w-full rounded-md focus:outline-none border-M-text-color/20 text-black transition-all duration-300 ring-0 ring-M-primary-color focus:ring-1 px-3 py-2 pl-12 `}
                            maxLength="13"
                          />
                        </div>
                      </div>
                      {/* Weight */}
                      <div>
                        <label
                          htmlFor="weight"
                          className="font-jost font-medium text-base text-M-text-color mb-1 block"
                        >
                          Weight
                        </label>
                        <input type="text" id="weight" className="inputField" />
                      </div>
                      {/* Age */}
                      <div>
                        <label
                          htmlFor="age"
                          className="font-jost font-medium text-base text-M-text-color mb-1 block"
                        >
                          Age
                        </label>
                        <input type="text" id="age" className="inputField" />
                      </div>
                      {/* Address */}
                      <div>
                        <label
                          htmlFor="address"
                          className="font-jost font-medium text-base text-M-text-color mb-1 block"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          className="inputField"
                        />
                      </div>
                      {/* Reason */}
                      <div className="md:col-span-2">
                        <label
                          htmlFor="reason"
                          className="font-jost font-medium text-base text-M-text-color mb-1 block"
                        >
                          Write Reason for Visit
                        </label>
                        <textarea
                          name="reason"
                          id="reason"
                          rows={5}
                          className="textAreaFiled"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 4 && (
              <div className="mb-10">
                <div className="rounded-md bg-white">
                  <h3 className="border-b border-M-text-color/20 p-7 pb-5 text-xl ">
                    Confirmation {steps[3]}
                  </h3>
                  <div className="p-7 ">
                    <div className="max-w-[720px] mx-auto w-full">
                      <div className="border border-M-text-color/20 rounded-md">
                        <div className="px-5 py-3 border-b border-M-text-color/20">
                          <h4 className="text-lg text-M-heading-color mb-2">
                            Booking Info
                          </h4>
                          <p className="font-jost">
                            Your Booking has been Confirmed with{" "}
                            <span className="text-M-heading-color">
                              Dr. Michael Brown
                            </span>{" "}
                            be on time before{" "}
                            <span className="text-M-heading-color">
                              15 Mins
                            </span>{" "}
                            From the appointment Time.
                          </p>
                        </div>
                        <div className="px-5 py-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                          <div>
                            <h5 className="text-M-heading-color text-lg font-bold font-jost">
                              Patient Name
                            </h5>
                            <p className="text-M-text-color text-base font-jost">
                              Mr. Asad
                            </p>
                          </div>
                          <div>
                            <h5 className="text-M-heading-color text-lg font-bold font-jost">
                              Age
                            </h5>
                            <p className="text-M-text-color text-base font-jost">
                              35
                            </p>
                          </div>
                          <div>
                            <h5 className="text-M-heading-color text-lg font-bold font-jost">
                              Phone Number
                            </h5>
                            <p className="text-M-text-color text-base font-jost">
                              01735456462
                            </p>
                          </div>
                          <div>
                            <h5 className="text-M-heading-color text-lg font-bold font-jost">
                              Treatments
                            </h5>
                            <p className="text-M-text-color text-base font-jost">
                              Heart Catheterization
                            </p>
                          </div>
                          <div>
                            <h5 className="text-M-heading-color text-lg font-bold font-jost">
                              Address
                            </h5>
                            <p className="text-M-text-color text-base font-jost">
                              Cumilla. Bangladesh.
                            </p>
                          </div>
                          <div>
                            <h5 className="text-M-heading-color text-lg font-bold font-jost">
                              Reason
                            </h5>
                            <p className="text-M-text-color text-base font-jost">
                              Heart Catheterization problem With 2 yaers.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between border-t border-M-text-color/10 pt-8">
            {currentStep > 1 && (
              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 bg-M-heading-color text-white rounded hover:bg-M-heading-color font-jost font-medium text-base min-w-24 uppercase "
                onClick={prevStep}
              >
                <Icon icon="mynaui:chevron-left" width="24" height="24" />
                Previous
              </button>
            )}
            {currentStep < stepLabels.length ? (
              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 bg-M-primary-color text-white rounded hover:bg-M-primary-color font-jost font-medium text-base min-w-24 uppercase"
                onClick={nextStep}
              >
                Next
                <Icon icon="mynaui:chevron-right" width="24" height="24" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-3 bg-M-primary-color text-white rounded hover:bg-M-primary-color font-jost font-medium text-base min-w-24 uppercase"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Appointment;
