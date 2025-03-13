"use client";
import React, { useState } from "react";

import logo from "@/assets/images/logo-black.png";
import Image from "next/image";
import Link from "next/link";

const AuthModal = () => {
  const [activeTab, setActiveTab] = useState("signIn"); // Track the active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Set active tab
  };

  return (
    <div className="bg-black/20 w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center">
      <div className="max-w-96 w-full p-8 bg-white rounded-lg">
        <Link href="/">
          <Image src={logo} alt="logo" width={200} className="mx-auto" />
        </Link>

        {/* Tab Navigation */}
        <ul className="grid grid-cols-2 border-b border-gray-200 mt-4 font-jost font-medium text-lg text-M-text-color">
          <li
            onClick={() => handleTabClick("signIn")}
            className={`cursor-pointer py-2 px-4 text-center ${
              activeTab === "signIn"
                ? "border-b-4 border-M-primary-color text-M-primary-color font-medium rounded-t-md rounded-l-md"
                : "text-gray-500 hover:text-M-primary-color"
            }`}
          >
            Sign In
          </li>
          <li
            onClick={() => handleTabClick("signUp")}
            className={`cursor-pointer py-2 px-4 text-center ${
              activeTab === "signUp"
                ? "border-b-4 border-M-primary-color text-M-primary-color font-medium rounded-t-md rounded-l-md"
                : "text-gray-500 hover:text-M-primary-color"
            }`}
          >
            Sign Up
          </li>
        </ul>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "signIn" ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
              <p className="text-gray-700 mb-4">
                Enter your credentials to sign in.
              </p>
              {/* Add your Sign In form here */}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
              <p className="text-gray-700 mb-4">
                Create an account to sign up.
              </p>
              {/* Add your Sign Up form here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
