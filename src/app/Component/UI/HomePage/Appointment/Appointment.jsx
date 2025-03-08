import React from "react";
import appointment from "@/assets/images/appointment.png";
import Image from "next/image";

// Assets
import waveShape2 from "@/assets/images/waveShape2.png";
import waveShape3 from "@/assets/images/waveShape3.png";
import halfCircle from "@/assets/images/half-circle.png";
import AppointmentForm from "@/app/Component/Shared/AppointmentForm/AppointmentForm";

const Appointment = () => {
  return (
    <div className="bg-[url('../../public/assets/section-bg.png')] bg-left-bottom md:rounded-[40px] relative">
      <Image src={waveShape2} alt="shape1" className="absolute right-0 top-[10%] animate-bounce hidden lg:block" />
      <Image src={waveShape3} alt="shape1" className="absolute left-0 bottom-[30%] animate-pulse hidden lg:block" />
      <Image src={halfCircle} alt="shape1" className="absolute right-[5%] bottom-[15%] animate-spin hidden lg:block" />
      <div className="container flex justify-between items-center gap-20 py-24">
        <div className="max-w-[400px] mx-auto lg:ml-4 w-full relative before:w-full before:h-full before:border before:border-M-primary-color before:-left-[20px] before:-top-[20px] before:absolute before:z-[0] before:rounded-[40px] before:hidden md:before:block">
          <div className="w-full relative z-10 bg-white py-8 px-4 md:p-8 rounded-lg md:rounded-[40px] shadow-lg">
            <h2 className="text-2xl font-semibold text-[#24285B] mb-6 text-center">
              Book Appointment
            </h2>
              <AppointmentForm buttonColors="bg-M-primary-color" />
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
