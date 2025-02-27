"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import logo from "@/assets/images/logo-black.png";
import backgroundImage from "@/assets/images/authBG.png";
import Header from "../Component/Header";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setOtp] = useState(false);
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
  });

  // Email validation regex (basic validation for standard email formats)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Derived state: Check if all fields are valid
  const isFormValid = !Object.values(errors).includes(true);

  // Handle input change with validation
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Validate fields
    setErrors((prev) => ({
      ...prev,
      [id]: id === "email" ? !emailRegex.test(value) : value.trim() === "",
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation before submission
    const newErrors = {
      name: formData.name.trim() === "",
      email: !emailRegex.test(formData.email),
      phone: formData.phone.trim() === "",
      password: formData.password.trim() === "",
    };

    setErrors(newErrors);

    // If form is valid, submit
    if (!Object.values(newErrors).includes(true)) {
      setOtp(true);
      console.log("Form Submitted:", formData);
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="w-full h-screen overflow-auto grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex justify-center items-center p-8">
        {/* <Image className="mx-auto hidden md:block" src={logo} alt="Logo" /> */}
        <Image
          className="mx-auto hidden md:block"
          src={backgroundImage}
          alt="Logo"
        />
      </div>
      <div className="max-w-[500px] w-full px-5 py-8 flex flex-col justify-center mx-auto">
        <div className="text-center space-y-3">
          <Image className="block mx-auto md:hidden" src={logo} alt="Logo" />
          <h1 className="text-4xl text-black font-jost font-bold">
            {showOtp ? "OTP" : "Sign Up"}
          </h1>
          <p className="text-base text-slate-400 font-poppins">
            {showOtp
              ? "Check your Email for OTP"
              : "Create an account to start using Mukti Hospital's services"}
          </p>
        </div>

        {showOtp ? (
          // OTP Form
          <form className="mt-8 space-y-4">
            {/* OTP Input */}
            <div>
              <label
                htmlFor="otp"
                className="text-slate-800 mb-2 font-jost font-medium text-base block"
              >
                OTP
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter Your OTP"
                  className={`px-4 py-2 h-[48px] border w-full rounded-md focus:outline-none transition-all duration-300 border-slate-500`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-M-primary-color text-white hover:bg-M-heading-color transition-all duration-300"
            >
              Submit
            </button>

            {/* Back to Sign In Button */}
            <button
              type="button"
              onClick={() => setOtp(false)}
              className="w-full py-2 text-base text-slate-600 font-jost font-normal hover:text-slate-950 transition-all duration-300"
            >
              Back to Sign Up
            </button>
          </form>
        ) : (
          // Registration Form
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="text-slate-800 mb-2 font-jost font-medium text-base block"
              >
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Your Name"
                  className={`px-4 py-2 h-[48px] border w-full rounded-md focus:outline-none transition-all duration-300 ${
                    errors.name ? "border-red-500" : "border-slate-500"
                  }`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className="flex text-xl absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
                    <Icon icon="proicons:alert-circle" width="20" />
                  </div>
                )}
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">Name is required</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="text-slate-800 mb-2 font-jost font-medium text-base block"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Your Email"
                  className={`px-4 py-2 h-[48px] border w-full rounded-md focus:outline-none transition-all duration-300 ${
                    errors.email ? "border-red-500" : "border-slate-500"
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="flex text-xl absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
                    <Icon icon="proicons:alert-circle" width="20" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  Enter a valid email address
                </p>
              )}
            </div>

            {/* Phone Input */}
            <div>
              <label
                htmlFor="phone"
                className="text-slate-800 mb-2 font-jost font-medium text-base block"
              >
                Phone
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter Your Phone Number"
                  className={`px-4 py-2 h-[48px] border w-full rounded-md focus:outline-none transition-all duration-300 ${
                    errors.phone ? "border-red-500" : "border-slate-500"
                  }`}
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <div className="flex text-xl absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
                    <Icon icon="proicons:alert-circle" width="20" />
                  </div>
                )}
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-2">
                  Phone number is required
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="text-slate-800 mb-2 font-jost font-medium text-base block"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter Your Password"
                  className={`px-4 py-2 h-[48px] border w-full rounded-md focus:outline-none transition-all duration-300 ${
                    errors.password ? "border-red-500" : "border-slate-500"
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="flex text-xl absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
                    <Icon icon="proicons:alert-circle" width="20" />
                  </div>
                )}
                <div
                  className="flex text-xl absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    icon={showPassword ? "mdi:eye" : "mdi:eye-off"}
                    width="24"
                  />
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  Password is required
                </p>
              )}
            </div>

            {/* Checkbox Input */}
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="agreement" className="hidden peer" />
              <span className="h-4 w-4 border flex-none border-slate-100 rounded inline-flex items-center justify-center ltr:mr-3 rtl:ml-3 relative transition-all duration-150 bg-slate-100 peer-checked:bg-M-primary-color peer-checked:ring-1 peer-checked:ring-M-primary-color peer-checked:ring-offset-1">
                <Icon
                  icon="mynaui:check"
                  width="24"
                  className="text-slate-100"
                />
              </span>
              <label
                htmlFor="agreement"
                className=" cursor-pointer font-jost font-normal text-base text-slate-400"
              >
                You accept our Terms and Conditions and Privacy Policy
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-2 rounded-md transition-all duration-300 ${
                isFormValid
                  ? "bg-M-primary-color text-white hover:bg-M-heading-color"
                  : "bg-M-primary-color/50 text-white cursor-not-allowed"
              }`}
            >
              Sign Up
            </button>
          </form>
        )}

        <p className="text-center mt-4 font-jost font-normal text-base text-M-text-color uppercase">
          Already Registered?{" "}
          <Link
            href={"#"}
            className="text-M-heading-color font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
