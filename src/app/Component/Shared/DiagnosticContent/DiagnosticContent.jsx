"use client"
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

import heroImag from "@/assets/images/diagonosticDoctor.png";
import WhyChooseUs from "@/app/Component/UI/HomePage/WhyChooseUs/WhyChooseUs";
import { useState } from "react";
import { useAuth } from "@/app/[locale]/utils/AuthContext";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import TestCategoryAccordion from "../../TestCategoryAccordion";
import { testGroups } from "@/app/data/diagnosticTestData";

const DiagnosticContent = ({ whyChooseUsSection}) => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth() || {};

  const [formData, setFormData] = useState({
     patientName: "",
     phone: "",
   });
  const [agreementChecked, setAgreementChecked] = useState(false);

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
  const handleCheckboxChange = (e) => setAgreementChecked(e.target.checked);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.patientName || !formData.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!agreementChecked) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await fetch(`https://api.muktihospital.com/api/callback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Appointment request submitted successfully!");
        setFormData({ patientName: user?.name || "", phone: user?.mobile || "" });
        setAgreementChecked(false);
      } else {
        toast.error(result?.message || "Failed to submit the appointment request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting appointment request:", error);
      toast.error("An error occurred while submitting the request. Please try again.");
    }
  };

  const [activeTab, setActiveTab] = useState(
        testGroups.length > 0 ? testGroups[0].id : null
    );

  return (
    <div>
      {/* Hero Area */}
      <div className="bg-[url(../../public/assets/diagnosticHeroBg.png)] bg-cover bg-top">
        <div className="pt-16 bg-gradient-to-t from-[#009650be] to-[#323290be] relative">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <div>
                <h1 className="text-white text-4xl md:text-[60px] mb-3">
                  {t("diagnostic.heroTitle")}
                </h1>
                <p className="text-white text-base font-jost">
                  {t("diagnostic.heroDesc")}
                </p>
                <div className="flex flex-wrap gap-4 mt-7">
                  <Link
                    href="/contact"
                    className="bg-M-heading-color font-jost font-medium uppercase text-white text-base hover:text-M-heading-color border-M-heading-color hover:bg-white hover:border-white py-3 px-6 inline-flex gap-2 items-center justify-center border rounded-md transition-all duration-300"
                  >
                    <Icon
                      icon="streamline:customer-support-1-solid"
                      width="20"
                    />{" "}
                    {t("diagnostic.callUsNow")}
                  </Link>
                  <Link
                    href="#all-tests"
                    className="bg-white font-jost font-medium uppercase text-M-text-color text-base hover:text-white border-white hover:bg-M-heading-color hover:border-M-heading-color py-3 px-6 inline-flex gap-2 items-center justify-center border rounded-md transition-all duration-300"
                  >
                    <Icon
                      icon="streamline:shopping-cart-1-solid"
                      width="20"
                      className="text-M-secondary-color"
                    />{" "}
                    {t("diagnostic.viewOffers")}
                  </Link>
                </div>
              </div>
              <div>
                <Image
                  src={heroImag}
                  alt="Hero Image"
                  className="w-full max-w-[500px] lg:ml-auto mx-auto lg:mr-0 "
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call Area */}
      <div className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-7 lg:gap-20 items-center">
              <div className="max-w-[400px] mx-auto lg:ml-4 w-full relative before:w-full before:h-full before:border before:border-M-primary-color before:-left-[20px] before:-top-[20px] before:absolute before:z-[0] before:rounded-[40px] before:hidden md:before:block">
              <div className="w-full relative z-10 bg-M-heading-color py-8 px-4 md:p-8 rounded-lg md:rounded-[40px] shadow-lg">
                <h2 className="text-2xl font-semibold text-white mb-2 text-center">
                  {t("diagnostic.callAreaTitle")}
                </h2>
                <p className="font-jost font-normal text-base text-white text-center mb-6">
                  {t("diagnostic.callAreaSubtitle")}
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
                        className="cursor-pointer font-jost font-normal text-base text-white relative z-10 pl-6"
                      >
                        {t("diagnostic.checkboxText")}
                      </label>
                    </div>
                  </div>
    
                  <button className="font-bold font-jost text-base md:text-xs xl:text-lg text-white py-3 px-3 md:px-3 lg:px-8 w-full bg-M-primary-color flex items-center justify-center gap-2 rounded-md uppercase transition-all duration-300 hover:bg-M-secondary-color">
                    <Icon icon="solar:call-medicine-linear" width="24" /> {t("diagnostic.requestCallback")}
                  </button>
                </form>
              </div>
            </div>
            <div className="col-span-2 bg-M-section-bg py-6 px-4 md:p-12 rounded-md">
              <h2 className="text-2xl md:text-3xl lg:text-5xl text-M-heading-color">
                  {t("diagnostic.rightCareTitle")}
              </h2>
              <p className="font-jost font-normal text-base text-M-text-color mt-4">
                  {t("diagnostic.rightCareDesc")}
              </p>

              <h3 className="text-2xl text-M-heading-color mt-8 mb-4">
                  {t("diagnostic.whyChooseTitle")}
              </h3>
              <ul className="list-disc list-inside space-y-3 font-jost font-normal text-base text-M-text-color ml-4">
                  <li>
                      <span className="font-bold">{t("diagnostic.emergencyCare")}:</span> {t("diagnostic.emergencyCareDesc")}
                  </li>
                  <li>
                      <span className="font-bold">{t("diagnostic.expertDoctors")}:</span> {t("diagnostic.expertDoctorsDesc")}
                  </li>
                  <li>
                      <span className="font-bold">{t("diagnostic.advancedImaging")}:</span> {t("diagnostic.advancedImagingDesc")}
                  </li>
                  <li>
                      <span className="font-bold">{t("diagnostic.hassleFreeBooking")}:</span> {t("diagnostic.hassleFreeBookingDesc")}
                  </li>
              </ul>
              <div className="mt-5 py-5 border-t border-M-heading-color/20">
                  <h4 className="text-xl text-M-heading-color">
                      {t("diagnostic.emergencyCall")}
                  </h4>
                  <div className="flex gap-4 mt-4">
                      <div className="size-12 bg-M-primary-color rounded-full p-3 text-white">
                          <Icon
                              icon="line-md:phone-call-loop"
                              width="24"
                              height="24"
                          />
                      </div>
                      <div>
                          <h6 className="text-M-text-color text-lg font-jost">
                              Telephone
                          </h6>
                          <Link
                              href="tel:+880 1601 666-893"
                              className="font-jost font-bold text-base text-M-heading-color hover:text-M-primary-color transition-all duration-300"
                          >
                              +880 1601 666-893
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
          </div>
        </div>
      </div>
      {/* Diagnostic plans */}
      <section id="all-tests" className="py-12 md:py-20 bg-M-section-bg">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-3xl md:text-4xl text-M-heading-color font-bold text-center">
                    {t("diagnostic.listTitle")}
                </h2>
                <p className="text-center text-M-text-color mb-10">
                    {t("diagnostic.listSubtitle")}
                </p>

                {/* --- TAB NAVIGATION --- */}
                <div className="flex flex-wrap justify-center border-b border-M-heading-color/20 mb-8">
                    {testGroups.map((group) => (
                        <button
                            key={group.id}
                            onClick={() => setActiveTab(group.id)}
                            className={`py-3 px-6 text-lg font-semibold transition-colors duration-300
                                ${activeTab === group.id
                                    ? 'text-M-primary-color border-b-2 border-M-primary-color'
                                    : 'text-M-text-color hover:text-M-primary-color/80'
                                }
                            `}
                        >
                            {group.groupName}
                        </button>
                    ))}
                </div>
                {/* --- TAB CONTENT AREA --- */}
                <div className="space-y-4">
                    {/* Filter and display the categories of the currently active tab */}
                    {testGroups.find(group => group.id === activeTab)?.categories.map((category, index) => (
                        <TestCategoryAccordion 
                            key={index}
                            categoryName={category.categoryName}
                            tests={category.tests}
                        />
                    ))}
                    {testGroups.find(group => group.id === activeTab)?.categories.length === 0 && (
                        <p className="text-center text-M-text-color mt-8">এই বিভাগে বর্তমানে কোনো পরীক্ষা উপলব্ধ নেই।</p>
                    )}
                </div>
            </div>
        </section>

      {/* Why Choose Us */}
      <WhyChooseUs whyChooseUsSection={whyChooseUsSection}/>
    </div>
  );
};

export default DiagnosticContent;
