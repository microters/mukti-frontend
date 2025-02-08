"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";
import logo from "../../../public/assets/logo-black.png";

// Function to toggle between Sign-In and Forgot Password form
const toggleForm = (showForgotPassword) => {
  document.getElementById("signInForm").style.display = showForgotPassword ? "none" : "block";
  document.getElementById("forgotPasswordForm").style.display = showForgotPassword ? "block" : "none";
};

const Signin = () => {
  return (
    <div className="w-full h-screen overflow-auto grid grid-cols-1 md:grid-cols-2">
      {/* Left Side with Background Image */}
      <div
        className="hidden md:flex justify-center items-center bg-cover bg-no-repeat bg-right-top"
        style={{ backgroundImage: "url('/assets/2.jpg')" }}
      >
        <Image className="mx-auto hidden md:block" src={logo} alt="Logo" />
      </div>

      {/* Right Side (Form Container) */}
      <div className="max-w-[500px] px-5 py-8 flex flex-col justify-center mx-auto">
        <div className="text-center space-y-3">
          <Image className="block mx-auto md:hidden" src={logo} alt="Logo" />
          <h1 id="formTitle" className="text-4xl text-black font-jost font-bold">Sign In</h1>
          <p id="formDesc" className="text-base text-slate-400 font-poppins">
            Sign in to start using Mukti Hospital's services
          </p>
        </div>

        {/* Sign-In Form */}
        <form id="signInForm" className="mt-8 space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="text-slate-800 mb-2 font-jost font-medium text-base block">
              Email
            </label>
            <div className="relative">
              <input type="email" id="email" placeholder="Enter Your Email" className="px-4 py-2 h-[48px] border w-full rounded-md border-slate-500" />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="text-slate-800 mb-2 font-jost font-medium text-base block">
              Password
            </label>
            <div className="relative">
              <input type="password" id="password" placeholder="Enter Your Password" className="px-4 py-2 h-[48px] border w-full rounded-md border-slate-500" />
            </div>
          </div>

          {/* Forgot Password Button */}
          <button type="button" onClick={() => toggleForm(true)} className="text-base text-slate-600 font-jost font-normal hover:text-slate-950 transition-all duration-300">
            Forgot Password?
          </button>

          {/* Submit Button */}
          <button type="submit" className="w-full py-2 rounded-md bg-M-primary-color text-white hover:bg-M-secondary-color transition-all duration-300">
            Sign In
          </button>
        </form>

        {/* Forgot Password Form (Hidden Initially) */}
        <form id="forgotPasswordForm" className="mt-8 space-y-4 hidden">
          {/* Email Input */}
          <div>
            <label htmlFor="reset-email" className="text-slate-800 mb-2 font-jost font-medium text-base block">
              Email
            </label>
            <div className="relative">
              <input type="email" id="reset-email" placeholder="Enter Your Email" className="px-4 py-2 h-[48px] border w-full rounded-md border-slate-500" />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full py-2 rounded-md bg-M-primary-color text-white hover:bg-M-secondary-color transition-all duration-300">
            Send Reset Link
          </button>

          {/* Back to Sign In Button */}
          <button type="button" onClick={() => toggleForm(false)} className="w-full py-2 text-base text-slate-600 font-jost font-normal hover:text-slate-950 transition-all duration-300">
            Back to Sign In
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center font-jost font-normal text-base text-M-text-color mt-4 uppercase">
          Not Registered Yet?{" "}
          <Link href={"#"} className="text-M-heading-color font-medium hover:underline">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
