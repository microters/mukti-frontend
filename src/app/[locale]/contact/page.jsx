"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CommonHero from "@/app/Component/UI/CommonHero";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";

import mapIcon from "@/assets/images/3dMap.png";
import clockIcon from "@/assets/images/3dClock.png";
import msgIcon from "@/assets/images/3dMsg.png";
import shapeimg from "@/assets/images/wwShape.png";
import wwImage from "@/assets/images/dentist.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL; // Replace with your actual API key
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Replace with your actual API key

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY, // Sending the API key in the request header
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMessage("Your message has been sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setResponseMessage(result.message || "Failed to send the message");
      }
    } catch (error) {
      setResponseMessage("Error sending the message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CommonHero pageName="Contact Us" />

      {/* Contact Card */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-md text-center border border-M-text-color/20 hover:border-M-primary-color/80 transition-all duration-300 group">
            <div className="size-20 flex items-center justify-center bg-M-section-bg rounded-full mx-auto mb-4">
              <Image src={mapIcon} alt="Map Icon" className="group-hover:animate-shake" />
            </div>
            <h3 className="text-2xl sm:text-3xl text-black mb-2">Location</h3>
            <p className="text-base text-M-text-color font-jost font-normal hover:text-M-primary-color">
              3400 Cottage Way, Ste G2 #16117, Sacramento, California 95825 USA
            </p>
          </div>
          <div className="bg-white p-6 rounded-md text-center border border-M-text-color/20 hover:border-M-primary-color/80 transition-all duration-300 group">
            <div className="size-20 flex items-center justify-center bg-M-section-bg rounded-full mx-auto mb-4">
              <Image src={msgIcon} alt="Message Icon" className="group-hover:animate-shake" />
            </div>
            <h3 className="text-2xl sm:text-3xl text-black mb-2">Email Address</h3>
            <Link href="mailto:info@muktihospital.com" className="text-base text-M-text-color font-jost font-normal hover:text-M-primary-color">
              info@muktihospital.com
            </Link>
          </div>
          <div className="bg-white p-6 rounded-md text-center border border-M-text-color/20 hover:border-M-primary-color/80 transition-all duration-300 group">
            <div className="size-20 flex items-center justify-center bg-M-section-bg rounded-full mx-auto mb-4">
              <Image src={clockIcon} alt="Clock Icon" className="group-hover:animate-shake" />
            </div>
            <h3 className="text-2xl sm:text-3xl text-black mb-2">Opening Hours</h3>
            <p className="text-base text-M-text-color font-jost font-normal">
              Saturday - Thursday <br /> 09:00 AM - 05:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="container py-16">
        <div className="grid grid-cols-1 items-center lg:grid-cols-5 gap-y-8 lg:gap-10">
          <div className="relative bg-M-heading-color rounded-lg px-10 pt-14 box-border lg:col-span-2">
            <Image src={wwImage} alt="wwImage" className="z-10 mx-auto" />
            <Image src={shapeimg} alt="Shape Image" className="absolute left-0 bottom-0 z-0" />
          </div>
          <div className="col-span-3">
            <SectionHeading subtitle="Help You 24/7 With Experts" heading="Get in Touch" align="left" />
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="px-4 py-2 h-[65px] border w-full rounded-md focus:outline-none bg-M-section-bg transition-all duration-300 border-M-text-color/20 focus:border-M-primary-color ring-0 focus:ring-0"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="px-4 py-2 h-[65px] border w-full rounded-md focus:outline-none bg-M-section-bg transition-all duration-300 border-M-text-color/20 focus:border-M-primary-color ring-0 focus:ring-0"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="px-4 py-2 h-[65px] border w-full rounded-md focus:outline-none bg-M-section-bg transition-all duration-300 border-M-text-color/20 focus:border-M-primary-color ring-0 focus:ring-0"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="px-4 py-2 h-[65px] border w-full rounded-md focus:outline-none bg-M-section-bg transition-all duration-300 border-M-text-color/20 focus:border-M-primary-color ring-0 focus:ring-0"
                  />
                </div>
                <div className="sm:col-span-2">
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="px-4 py-2 border w-full rounded-md focus:outline-none bg-M-section-bg transition-all duration-300 border-M-text-color/20 focus:border-M-primary-color ring-0 focus:ring-0"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-M-primary-color rounded-md py-4 px-6 mt-5 text-white font-medium text-xl font-jost border-2 border-M-primary-color hover:bg-white hover:text-M-primary-color transition-all duration-300 group"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Now"}
              </button>
            </form>
            {responseMessage && (
              <div className="mt-4 text-center text-xl font-semibold">
                {responseMessage}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="container pt-10 pb-24 h-[400px] lg:h-[800px]">
        <iframe
          className="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4341.297409567763!2d91.1663045753272!3d23.46614927886534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37547ed6b4ea44f7%3A0x6295ef461f485724!2z4Kau4KeB4KaV4KeN4Kak4Ka_IOCmueCmvuCmuOCmquCmvuCmpOCmvuCmsiDgpofgpq7gpr7gprDgp43gppzgp4fgpqjgp43gprjgpr8!5e1!3m2!1sen!2sbd!4v1741599583103!5m2!1sen!2sbd"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
