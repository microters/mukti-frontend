import React from "react";
import { Icon } from "@iconify/react";

const AppointmentForm = () => {
  return (
    <div>
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
        <button
          type="submit"
          className="inline-flex justify-center gap-4 bg-M-primary-color w-full rounded-md py-4 px-6 text-white font-medium text-xl font-jost border-2 border-M-primary-color hover:bg-white hover:text-M-primary-color  transition-all duration-300 group"
        >
          Appointment Now
          <span className="bg-white text-M-heading-color rounded inline-flex items-center group-hover:bg-M-primary-color group-hover:text-white transition-all duration-300">
            <Icon icon="iconamoon:arrow-right-2-thin" width="24" height="24" />
          </span>
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
