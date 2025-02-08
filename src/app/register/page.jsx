"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import logo from "../../../public/assets/logo-black.png";
import backgroundImage from "@/../public/assets/banner.jpg";

const Register = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    name: true,
    email: true,
    phone: true,
    password: true,
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
      console.log("Form Submitted:", formData);
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="w-full h-screen overflow-auto grid grid-cols-1 md:grid-cols-2">
      <div className="bg-[url(@/../public/assets/2.jpg)] bg-cover bg-no-repeat bg-right-top md:flex justify-center items-center hidden">
        <Image className="mx-auto hidden md:block" src={logo} alt="Logo" />
      </div>
      <div className="max-w-[500px] px-5 py-8 flex flex-col justify-center mx-auto">
        <div className="text-center space-y-3">
          <Image className="block mx-auto md:hidden" src={logo} alt="Logo" />
          <h1 className="text-4xl text-black font-jost font-bold">Sign Up</h1>
          <p className="text-base text-slate-400 font-poppins">
            Create an account to start using Mukti Hospital's services
          </p>
        </div>
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
                type="password"
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
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">Password is required</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 rounded-md transition-all duration-300 ${
              isFormValid
                ? "bg-M-primary-color text-white hover:bg-M-secondary-color"
                : "bg-M-primary-color/50 text-white cursor-not-allowed"
            }`}
          >
            Sign Up
          </button>
        </form>
        <p className="text-center font-jost font-normal text-base text-M-text-color mt-4 uppercase">
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
