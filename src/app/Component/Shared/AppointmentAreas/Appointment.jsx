// 'use client'
// import Image from "next/image";
// import React from "react";

// // Assets
// import shape4 from "@/assets/images/shape4.png";
// import shape5 from "@/assets/images/shape5.png";
// import FormButton from "../Buttons/FormButton";
// import { useTranslation } from "react-i18next";

// const Appointment = ({aboutPage}) => {
//   console.log(aboutPage);
  
//   const { i18n } = useTranslation();
//   const currentLanguage = i18n.language || "en";
//   const { callbackImage } = aboutPage?.data?.translations[currentLanguage] || {};
//   console.log(callbackImage);
  
//   const mobileAppImage = `https://api.muktihospital.com/${callbackImage}`;
//   console.log(mobileAppImage + " Mobile app image");
  
//   return (
//     <div className="bg-[#323290] py-24 px-2 relative">
//       <Image
//         src={shape4}
//         alt="shape4"
//         className="absolute right-0 top-0 z-0 hidden md:block"
//       />
//       <div className="container relative ">
//         <div className="grid grid-cols-1 items-center lg:grid-cols-3 space-y-5">
//           <div className="relative px-0 md:px-20 col-span-2">
//             <Image
//               src={mobileAppImage}
//               width={600}
//               height={600}
//               alt="mobileApp"
//               className="mx-auto relative z-10"
//             />
//             <Image
//               src={shape5}
//               alt="shape5"
//               className="absolute left-0 top-[10%] z-0 animate-pulse hidden md:block"
//             />
//           </div>
//           <div>
//             <div className="bg-white p-6 rounded-md">
//               <h3 className="text-M-heading-color text-2xl capitalize">
//                 Request a Callback
//               </h3>
//               <form className="space-y-5 mt-4">
//                 <input
//                   type="text"
//                   placeholder="Your Name *"
//                   required
//                   className="AboutInputField"
//                 />
//                 <input
//                   type="email"
//                   placeholder="Your Email *"
//                   required
//                   className="AboutInputField"
//                 />
//                 <input
//                   type="tel"
//                   placeholder="Phone *"
//                   required
//                   className="AboutInputField"
//                 />
//                 <input
//                   type="file"
//                   className="AboutInputField"
//                 />
//                 <textarea
//                   rows="5"
//                   name="textarea"
//                   placeholder="Your Message"
//                   className="AboutInputField"
//                 />
//                 <FormButton
//                   buttonText="Send Message"
//                   buttonColor="bg-M-heading-color"
//                   textColor="text-white"
//                   borderColor="border-M-heading-color"
//                   padding="py-3 px-8"
//                   fontSize="text-xs sm:text-lg"
//                   alignment="text-center"
//                 />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Appointment;

'use client'
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/app/[locale]/utils/AuthContext";
import { Icon } from "@iconify/react";
import { toast, ToastContainer } from "react-toastify";
import shape4 from "@/assets/images/shape4.png";
import shape5 from "@/assets/images/shape5.png";

const Appointment = ({ aboutPage }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";
  const { user } = useAuth() || {};
  const { callbackImage } = aboutPage?.data?.translations[currentLanguage] || {};
  const mobileAppImage = callbackImage ? `https://api.muktihospital.com/${callbackImage}` : "/assets/appointment-fallback.png";

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

  return (
    <div className="bg-[#323290] py-24 px-2 relative">
      <Image
        src={shape4}
        alt="shape4"
        className="absolute right-0 top-0 z-0 hidden md:block"
      />
      <div className="container relative">
        <div className="grid grid-cols-1 items-center lg:grid-cols-3 space-y-5">
          <div className="relative px-0 md:px-20 col-span-2">
            <Image
              src={mobileAppImage}
              width={600}
              height={600}
              alt="mobileApp"
              className="mx-auto relative z-10"
            />
            <Image
              src={shape5}
              alt="shape5"
              className="absolute left-0 top-[10%] z-0 animate-pulse hidden md:block"
            />
          </div>
          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;

