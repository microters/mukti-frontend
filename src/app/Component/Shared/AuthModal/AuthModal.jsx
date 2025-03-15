"use client";
import React, { useState } from "react";

import logo from "@/assets/images/logo-black.png";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

const AuthModal = () => {
  const [activeTab, setActiveTab] = useState("signIn"); // Track the active tab
  const [showModal, setShowModal] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("+880 ");
  const [isValid, setIsValid] = useState(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Set active tab
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  if (!showModal) {
    return null; // If modal is closed, don't render the component
  }

  const handlePhoneChange = (e) => {
    let inputValue = e.target.value;

    // Check if the value starts with +880 and prevent deletion of it
    if (inputValue.startsWith("+880")) {
      // Allow only numeric characters after +880
      inputValue = "+880 " + inputValue.slice(5).replace(/\D/g, "");

      // Limit to 10 digits after +880
      if (inputValue.length > 14) {
        inputValue = inputValue.slice(0, 14);
      }
    } else {
      // If the user tries to delete or modify +880, prevent the change
      inputValue = "+880 ";
    }

    setPhoneNumber(inputValue);

    // Validation: Check if the number of digits after +880 is exactly 10
    const isValidPhoneNumber = inputValue.length === 14; // +880 (4 chars) + 10 digits = 14 chars
    setIsValid(isValidPhoneNumber); // Set the validity state
  };

  return (
    <div className="bg-black/50 backdrop-blur-md w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center px-2">
      <div className="max-w-96 w-full p-6 md:p-8 bg-white rounded-lg overflow-y-auto">
        <div className="relative">
          <Link href="/">
            <Image src={logo} alt="logo" width={200} className="mx-auto" />
          </Link>
          {/* Close Button */}
          <button onClick={handleCloseModal} className="absolute top-0 right-0">
            <Icon icon="material-symbols-light:close" width="24" height="24" />
          </button>
        </div>

        {/* Tab Navigation */}
        <ul className="grid grid-cols-2 border-b border-gray-200 mt-4 font-jost font-medium text-lg text-M-text-color">
          <li
            onClick={() => handleTabClick("signIn")}
            className={`cursor-pointer py-2 px-4 text-center ${
              activeTab === "signIn"
                ? "border-b-4 border-M-primary-color text-M-primary-color font-medium"
                : "text-gray-500 hover:text-M-primary-color"
            }`}
          >
            Sign In
          </li>
          <li
            onClick={() => handleTabClick("signUp")}
            className={`cursor-pointer py-2 px-4 text-center ${
              activeTab === "signUp"
                ? "border-b-4 border-M-primary-color text-M-primary-color font-medium"
                : "text-gray-500 hover:text-M-primary-color"
            }`}
          >
            Sign Up
          </li>
        </ul>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "signUp" ? (
            // Sign Up Tab
            <div>
              <form action="#" className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="fName"
                    className="block font-jost text-base font-medium text-gray-700"
                  >
                    Full Name{" "}
                    <span className="text-M-secondary-color text-lg">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="fName"
                      id="fName"
                      required
                      placeholder="Your Name"
                      className="border border-M-text-color outline-none focus:ring-1 focus:ring-M-primary-color/80 focus:border-M-primary-color transition-all duration-300 block w-full px-3 py-2 rounded-md"
                    />
                  </div>
                </div>
                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-base font-medium text-gray-700"
                  >
                    Phone Number{" "}
                    <span className="text-M-secondary-color text-lg">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      autoComplete="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      required
                      className={`border ${isValid ? "focus:border-M-primary-color focus:ring-M-primary-color/80" : "focus:border-M-secondary-color focus:ring-M-secondary-color/80"} outline-none ring-offset-1 focus:ring-2 transition-all duration-300 block w-full px-3 py-2 pl-10 rounded-md`}
                    />
                    <Icon
                      icon="twemoji:flag-bangladesh"
                      width="24"
                      height="24"
                      className="top-1/2 -translate-y-1/2 absolute left-2"
                    />
                  </div>
                </div>
                <p
                  onClick={() => handleTabClick("signIn")}
                  className="text-base text-M-heading-color font-jost font-medium cursor-pointer inline-block"
                >
                  Back to Sign In
                </p>
                <button
                  type="submit"
                  className="bg-M-primary-color text-base text-white font-jost font-medium w-full py-3 px-4 mt-5 rounded-md hover:bg-M-heading-color transition-all duration-300"
                >
                  SEND CODE
                </button>
              </form>
              <p className="font-jost font-normal text-base text-M-text-color text-center mt-4">
                By continuing, you agree to Mukti Hospital's{" "}
                <Link href={"#"} className="text-M-heading-color">
                  Conditions of Use
                </Link>{" "}
                and{" "}
                <Link href={"#"} className="text-M-heading-color">
                  Privacy Policy.
                </Link>
              </p>
            </div>
          ) : (
            // Sign In Tab
            <div>
              <form action="#" className="space-y-4">
                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-base font-medium text-gray-700"
                  >
                    Phone Number{" "}
                    <span className="text-M-secondary-color text-lg">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      autoComplete="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      required
                      className={`border ${isValid ? "focus:border-M-primary-color focus:ring-M-primary-color/80" : "focus:border-M-secondary-color focus:ring-M-secondary-color/80"} outline-none ring-offset-1 focus:ring-2 transition-all duration-300 block w-full px-3 py-2 pl-10 rounded-md`}
                    />
                    <Icon
                      icon="twemoji:flag-bangladesh"
                      width="24"
                      height="24"
                      className="top-1/2 -translate-y-1/2 absolute left-2"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-M-primary-color text-base text-white font-jost font-medium w-full py-3 px-4 mt-5 rounded-md hover:bg-M-heading-color transition-all duration-300"
                >
                  SEND CODE
                </button>
              </form>
              <p className="font-jost font-normal text-base text-M-text-color text-center mt-4">
                Don’t have an account?
              </p>
              <button
                onClick={() => handleTabClick("signUp")}
                type="button"
                className="bg-M-primary-color text-base text-white font-jost font-medium w-full py-3 px-4 mt-5 rounded-md hover:bg-M-heading-color transition-all duration-300 uppercase"
              >
                Create A New Account
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
