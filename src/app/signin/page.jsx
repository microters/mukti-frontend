"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import logo from "../../../public/assets/logo-black.png";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    email: false,
    phone: false,
    password: false,
  });

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if all fields are valid
  const isFormValid =
    !Object.values(errors).includes(true) &&
    Object.values(formData).every((value) => value.trim() !== "");

  // Handle input change with validation
  const handleChange = (e) => {
    const { id, value } = e.target;
    const newValue = id === "phone" ? value.replace(/[^0-9+]/g, "") : value;
    setFormData((prev) => ({ ...prev, [id]: newValue }));

    // Validate fields
    setErrors((prev) => ({
      ...prev,
      [id]: id === "email" ? !emailRegex.test(value) : value.trim() === "",
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: !emailRegex.test(formData.email),
      phone: formData.phone.trim() === "",
      password: formData.password.trim() === "",
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).includes(true)) {
      console.log("Form Submitted:", formData);
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="w-full h-screen overflow-auto grid grid-cols-1 md:grid-cols-2">
      {/* Left Side with Background Image */}
      <div
        className="hidden md:flex justify-center items-center bg-cover bg-no-repeat bg-right-top"
        style={{ backgroundImage: "url('/assets/2.jpg')" }}
      >
        <Image className="mx-auto hidden md:block" src={logo} alt="Logo" />
      </div>

      {/* Right Side (Form) */}
      <div className="max-w-[500px] px-5 py-8 flex flex-col justify-center mx-auto">
        <div className="text-center space-y-3">
          <Image className="block mx-auto md:hidden" src={logo} alt="Logo" />
          <h1 className="text-4xl text-black font-jost font-bold">
            {showForgotPassword ? "Reset Password" : "Sign In"}
          </h1>
          <p className="text-base text-slate-400 font-poppins">
            {showForgotPassword
              ? "Enter your email to receive a password reset link"
              : "Sign in to start using Mukti Hospital's services"}
          </p>
        </div>

        {showForgotPassword ? (
          // Forgot Password Form
          <form className="mt-8 space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="reset-email"
                className="text-slate-800 mb-2 font-jost font-medium text-base block"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="reset-email"
                  placeholder="Enter Your Email"
                  className={`px-4 py-2 h-[48px] border w-full rounded-md focus:outline-none transition-all duration-300 border-slate-500`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-M-primary-color text-white hover:bg-M-secondary-color transition-all duration-300"
            >
              Send Reset Link
            </button>

            {/* Back to Sign In Button */}
            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="w-full py-2 text-base text-slate-600 font-jost font-normal hover:text-slate-950 transition-all duration-300"
            >
              Back to Sign In
            </button>
          </form>
        ) : (
          // Sign-In Form
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="text-slate-800 mb-2 font-jost font-medium text-base block">
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
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="text-slate-800 mb-2 font-jost font-medium text-base block">
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
                <div
                  className="flex text-xl absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon icon={showPassword ? "mdi:eye" : "mdi:eye-off"} width="24" />
                </div>
              </div>
            </div>

            {/* Forgot Password Button */}
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-base text-slate-600 font-jost font-normal hover:text-slate-950 transition-all duration-300"
            >
              Forgot Password?
            </button>

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
              Sign In
            </button>
          </form>
        )}

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
