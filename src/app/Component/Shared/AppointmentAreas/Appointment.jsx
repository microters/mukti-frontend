import Image from "next/image";
import React from "react";
import Link from "next/link";

// Assets
import mobileApp from "@/assets/images/about-form.png";
import shape4 from "@/assets/images/shape4.png";
import shape5 from "@/assets/images/shape5.png";
import FormButton from "../Buttons/FormButton";

const Appointment = () => {
  return (
    <div className="bg-[#323290] py-24 px-2 relative">
      <Image
        src={shape4}
        alt="shape4"
        className="absolute right-0 top-0 z-0 hidden md:block"
      />
      <div className="container relative ">
        <div className="grid grid-cols-1 items-center lg:grid-cols-3 space-y-5">
          <div className="relative px-0 md:px-20 col-span-2">
            <Image
              src={mobileApp}
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
            <div className="bg-white p-6 rounded-md">
              <h3 className="text-M-heading-color text-2xl capitalize">
                Request a Callback
              </h3>
              <form className="space-y-5 mt-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  className="AboutInputField"
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  required
                  className="AboutInputField"
                />
                <input
                  type="tel"
                  placeholder="Phone *"
                  required
                  className="AboutInputField"
                />
                <input
                  type="file"
                  className="AboutInputField"
                />
                <textarea
                  rows="5"
                  name="textarea"
                  placeholder="Your Message"
                  className="AboutInputField"
                />
                <FormButton
                  buttonText="Send Message"
                  buttonColor="bg-M-heading-color"
                  textColor="text-white"
                  borderColor="border-M-heading-color"
                  padding="py-3 px-8"
                  fontSize="text-xs sm:text-lg"
                  alignment="text-center"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
