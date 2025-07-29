"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useAuth } from "@/app/[locale]/utils/AuthContext";
import { Icon } from "@iconify/react";
import { toast, ToastContainer } from "react-toastify";
import waveShape2 from "@/assets/images/waveShape2.png";
import waveShape3 from "@/assets/images/waveShape3.png";
import halfCircle from "@/assets/images/half-circle.png";

const Appointment = ({ appointmentSection }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";

  const translations = appointmentSection?.translations?.[currentLanguage] || {};
  const { image } = translations;
  const appointmentImage = image
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${image.replace(/\\/g, "/")}`
    : appointment;

  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
  });

  const [agreementChecked, setAgreementChecked] = useState(false);
  const { user } = useAuth() || {};

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      patientName: prev.patientName || user?.name || "",
      phone: prev.phone || user?.mobile || "",
    }));
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (e) => {
    setAgreementChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.patientName || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!agreementChecked) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.muktihospital.com/api/callback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
  

      if (response.ok) {
        toast.success("Appointment request submitted successfully!");
        // Reset form after successful submission
        setFormData({ patientName: user?.name || "", phone: user?.mobile || "" });
        setAgreementChecked(false);
      } else {
        toast.error(
          result?.message || "Failed to submit the appointment request. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting appointment request:", error);
      toast.error("An error occurred while submitting the request. Please try again.");
    }
  };

  return (
    <div className="bg-[url('/assets/section-bg.png')] bg-left-bottom md:rounded-[40px] relative">
      <Image
        src={waveShape2}
        alt="wave shape"
        className="absolute right-0 top-[10%] animate-bounce hidden lg:block"
      />
      <Image
        src={waveShape3}
        alt="wave shape"
        className="absolute left-0 bottom-[30%] animate-pulse hidden lg:block"
      />
      <Image
        src={halfCircle}
        alt="half circle"
        className="absolute right-[5%] bottom-[15%] animate-spin hidden lg:block"
      />

      <div className="container flex justify-between items-center gap-20 py-12 lg:py-24">
        <div className="max-w-[400px] mx-auto lg:ml-4 w-full relative before:w-full before:h-full before:border before:border-M-primary-color before:-left-[20px] before:-top-[20px] before:absolute before:z-[0] before:rounded-[40px] before:hidden md:before:block">
          <div className="w-full relative z-10 bg-white py-8 px-4 md:p-8 rounded-lg md:rounded-[40px] shadow-lg">
            <h2 className="text-2xl font-semibold text-[#24285B] mb-2 text-center">
              Can't find what are you looking for?
            </h2>
            <p className="font-jost font-normal text-base text-M-text-color text-center mb-6">
              Fill this form for callback from us.
            </p>
            <ToastContainer />
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder={t("appointment.patientName")}
                  className="appointment-input-field"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("appointment.phoneNumber")}
                  className="appointment-input-field"
                  required
                />
              </div>

              <div>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={agreementChecked}
                    onChange={handleCheckboxChange}
                    className="hidden peer"
                  />
                  <span className="h-4 w-4 border flex-none border-M-text-color/50 rounded inline-flex items-center justify-center ltr:mr-3 rtl:ml-3 transition-all duration-150 bg-slate-100 peer-checked:bg-M-primary-color peer-checked:ring-1 peer-checked:ring-M-primary-color peer-checked:ring-offset-1 absolute top-[6px] left-0 z-0">
                    <Icon
                      icon="mynaui:check"
                      width="24"
                      className="text-slate-100"
                    />
                  </span>
                  <label
                    htmlFor="agreement"
                    className="cursor-pointer font-jost font-normal text-base text-M-text-color relative z-10 pl-6"
                  >
                    Get updated on whatsapp & accept T&C
                  </label>
                </div>
              </div>

              <button className="font-bold font-jost text-base md:text-xs xl:text-lg text-white py-3 px-3 md:px-3 lg:px-8 w-full bg-M-primary-color flex items-center justify-center gap-2 rounded-md uppercase transition-all duration-300 hover:bg-M-secondary-color">
                <Icon icon="solar:call-medicine-linear" width="24" /> Request
                callback
              </button>
            </form>
          </div>
        </div>

        <div className="hidden lg:block w-1/2">
          <Image
            src={appointmentImage}
            width={500}
            height={500}
            style={{ width: "100%" }}
            alt="appointment"
            unoptimized={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Appointment;