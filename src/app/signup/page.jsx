"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Image from "next/image";
import logo from "../../assets/images/logo-black.png";
import Link from "next/link";

import bgImage from "@/assets/images/authBG.png";

const Register = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(""); // Store OTP entered by the user
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // For password visibility toggle
  const [agreeTerms, setAgreeTerms] = useState(false); // For Terms & Conditions checkbox
  const [error, setError] = useState(""); // Store error messages
  const router = useRouter();

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  // Validation Errors
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phoneNumber: false,
    password: false,
    otp: false,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isFormValid =
    Object.values(errors).every((err) => err === false) && agreeTerms;

  // Handle Input Change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Validation
    setErrors({
      ...errors,
      [id]: id === "email" ? !emailRegex.test(value) : value.trim() === "",
    });
  };

  // 🔹 **Register User and Send OTP**
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );

      if (response.status === 200) {
        setShowOtp(true);
        localStorage.setItem("otp", response.data.otp); // Store OTP temporarily for debugging
        localStorage.setItem("email", formData.email);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration error.");
    }
    setLoading(false);
  };

  // 🔹 **Verify OTP and Complete Registration**
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const storedEmail = localStorage.getItem("email");
    if (!storedEmail || !otp) {
      setError("Missing OTP or Email. Please register again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/verify-otp",
        {
          email: storedEmail,
          otp,
        }
      );

      if (response.status === 200) {
        alert("OTP verified successfully! Redirecting...");
        localStorage.removeItem("otp");
        localStorage.removeItem("email");
        router.push("/signin");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid OTP. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-screen overflow-auto grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex justify-center items-center p-8">
        {/* <Image className="mx-auto hidden md:block" src={logo} alt="Logo" /> */}
        <Image className="mx-auto hidden md:block" src={bgImage} alt="Logo" />
      </div>
      <div className="max-w-[500px] w-full px-5 py-8 flex flex-col justify-center mx-auto">
        <div className="text-center space-y-3">
          <Link href="/"><Image className="mx-auto mb-10" src={logo} alt="Logo" /></Link>
          <h1 className="text-4xl text-black font-jost font-bold">
            {showOtp ? "Verify OTP" : "Sign Up"}
          </h1>
          <p className="text-base text-slate-400 font-poppins">
            {showOtp
              ? "Enter the OTP sent to your email."
              : "Create an account to get started."}
          </p>
          {error && <p className="text-red-500">{error}</p>}
        </div>

        {showOtp ? (
          // ✅ OTP Form
          <form className="mt-8 space-y-4" onSubmit={handleOtpSubmit}>
            <div>
              <label className="text-slate-800 mb-2 font-jost font-medium text-base block">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter Your OTP"
                className={`px-4 py-2 h-[48px] border w-full rounded-md focus:outline-none transition-all duration-300 ${
                  errors.otp ? "border-red-500" : "border-slate-500"
                }`}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-M-primary-color text-white hover:bg-M-heading-color transition-all duration-300"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              onClick={() => setShowOtp(false)}
              className="w-full py-2 text-base text-slate-600 font-jost font-normal hover:text-slate-950 transition-all duration-300"
            >
              Back to Sign Up
            </button>
          </form>
        ) : (
          // ✅ Registration Form
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label className="text-slate-800 mb-2 font-jost font-medium text-base block">
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
              <label className="text-slate-800 mb-2 font-jost font-medium text-base block">
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
              <label className="text-slate-800 mb-2 font-jost font-medium text-base block">
                Phone
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Enter Your Phone Number"
                  className={`px-4 py-2 h-[48px] border w-full rounded-md focus:outline-none transition-all duration-300 ${
                    errors.phoneNumber ? "border-red-500" : "border-slate-500"
                  }`}
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && (
                  <div className="flex text-xl absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
                    <Icon icon="proicons:alert-circle" width="20" />
                  </div>
                )}
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-2">
                  Phone number is required
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="text-slate-800 mb-2 font-jost font-medium text-base block">
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
                {errors.password ? (
                  <div className="flex text-xl absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
                    <Icon icon="proicons:alert-circle" width="20" />
                  </div>
                ) : (
                  <div
                    className="flex text-xl absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon
                      icon={showPassword ? "mdi:eye" : "mdi:eye-off"}
                      width="24"
                    />
                  </div>
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  Password is required
                </p>
              )}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className=" relative">
              <input
                type="checkbox"
                id="agreement"
                className="hidden peer"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
              />
              <span className="h-4 w-4 border flex-none border-slate-100 rounded inline-flex items-center justify-center ltr:mr-3 rtl:ml-3 transition-all duration-150 bg-slate-100 peer-checked:bg-M-primary-color peer-checked:ring-1 peer-checked:ring-M-primary-color peer-checked:ring-offset-1 absolute top-[6px] left-0 z-0">
                <Icon
                  icon="mynaui:check"
                  width="24"
                  className="text-slate-100"
                />
              </span>
              <label
                htmlFor="agreement"
                className="cursor-pointer font-jost font-normal text-base text-slate-400 relative z-10 pl-6"
              >
                You accept our{" "}
                <Link href={"#"} className="text-M-heading-color">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link href={"#"} className="text-M-heading-color">
                  Privacy Policy
                </Link>
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
              {loading ? "Processing..." : "Sign Up"}
            </button>
          </form>
        )}

        <p className="text-center font-jost font-normal text-base text-M-text-color mt-4 uppercase">
          Already Registered?{" "}
          <Link
            href="signin"
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
