import React from 'react';
import appointment from "@/assets/images/appointment.png";
import Image from 'next/image';

const Appointment = () => {
    return (
           <div className="container flex justify-between items-center gap-32 py-24">
            {/* Left Section: Appointment Form */}
            <div className="w-full lg:w-1/2 bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-[#24285B] mb-6">Book Appointment</h2>
                <form>
                    <div className="mb-4">
                        <select className="mt-2 w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option>Select Department</option>
                            <option>Cardiology</option>
                            <option>Dermatology</option>
                            <option>Neurology</option>
                            {/* Add more options */}
                        </select>
                    </div>
                    <div className="mb-4">
                        <select className="mt-2 w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option>Select Doctor</option>
                            <option>Dr. Nahidul Islam</option>
                            <option>Dr. Sarah Khan</option>
                            <option>Dr. Emily Clark</option>
                            {/* Add more options */}
                        </select>
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="mt-2 w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="tel"
                            placeholder="Phone Numbers"
                            className="mt-2 w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="date"
                            placeholder="mm/dd/yyyy"
                            className="mt-2 w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-[#2E2E88] text-white rounded-md hover:bg-blue-600 transition-all"
                    >
                        Appointment Now
                    </button>
                </form>
            </div>

            <div className="hidden lg:block w-1/2">
               <Image
                    src={appointment}
                    alt="appointment"
                />
            </div>
        </div>
    );
};

export default Appointment;
