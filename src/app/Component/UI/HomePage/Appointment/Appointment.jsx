import React from "react";
import appointment from "@/assets/images/appointment.png";
import Image from "next/image";
import FormButton from "@/app/Component/Shared/Buttons/FormButton";

const Appointment = () => {
  return (
    <div className="bg-[url('@/assets/images/section-bg.png')] rounded-lg">
      <div className="container flex justify-between items-center gap-20 py-24">
        <div className="max-w-[480px] w-full relative before:w-full before:h-full before:border before:border-M-primary-color before:-left-[20px] before:-top-[20px] before:absolute before:z-[0] before:rounded-[40px] before:hidden md:before:block">
          <div className="w-full relative z-10 bg-white p-8 rounded-[40px] shadow-lg">
            <h2 className="text-2xl font-semibold text-[#24285B] mb-6 text-center">
              Book Appointment
            </h2>
            <form className="space-y-5">
              <div>
                <select className="appointment-input-field">
                  <option>Select Department</option>
                  <option>Cardiology</option>
                  <option>Dermatology</option>
                  <option>Neurology</option>
                </select>
              </div>
              <div>
                <select className="appointment-input-field">
                  <option>Select Doctor</option>
                  <option>Dr. Nahidul Islam</option>
                  <option>Dr. Sarah Khan</option>
                  <option>Dr. Emily Clark</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="appointment-input-field"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Numbers"
                  className="appointment-input-field"
                />
              </div>
              <div>
                <input
                  type="date"
                  placeholder="mm/dd/yyyy"
                  className="appointment-input-field"
                />
              </div>
              <FormButton
                buttonText="Appointment Now"
                buttonColor="bg-M-heading-color"
                textColor="text-white"
                borderColor="border-M-heading-color"
                padding="py-3 px-8"
                fontSize="text-lg"
                icons="iconamoon:arrow-right-2-light"
                alignment="text-center"
              />
            </form>
          </div>
        </div>

        <div className="hidden lg:block w-1/2">
          <Image src={appointment} alt="appointment" />
        </div>
      </div>
    </div>
  );
};

export default Appointment;
