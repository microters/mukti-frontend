"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import logo from "../../assets/images/logo-black.png";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const router = useRouter();

  const isFormValid = !Object.values(errors).includes(true);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Validate fields
    setErrors((prev) => ({
      ...prev,
      [id]: id === "email" ? !emailRegex.test(value) : value.trim() === "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({
      email: !emailRegex.test(formData.email),
      password: formData.password.trim() === "",
    });

    if (!Object.values(errors).includes(true)) {
      try {
        // Send the login request
        const response = await axios.post("http://localhost:5000/api/login", formData);

        if (response.status === 200) {
          // Save the token in localStorage for future authentication
          localStorage.setItem("token", response.data.token);
          router.push("/dashboard"); // Redirect to dashboard or main page
        }
      } catch (error) {
        alert(error.response?.data?.message || "Login error.");
      }
    }
    setLoading(false);
  };

  const handleForgotPassword = () => {
    // Trigger forgot password screen
    setShowForgotPassword(true);
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = formData.email;
    try {
      const response = await axios.post("http://localhost:5000/api/forgot-password", { email });

      if (response.status === 200) {
        alert("Password reset link sent to your email.");
        setShowForgotPassword(false); // Go back to login
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error in sending reset password link.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-screen overflow-auto grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex justify-center items-center bg-cover bg-no-repeat bg-right-top" style={{ backgroundImage: "url('/assets/2.jpg')" }}>
        <Image className="mx-auto hidden md:block" src={logo} alt="Logo" />
      </div>

      <div className="max-w-[500px] px-5 py-8 flex flex-col justify-center mx-auto">
        <div className="text-center space-y-3">
          <Image className="block mx-auto md:hidden" src={logo} alt="Logo" />
          <h1 className="text-4xl text-black font-jost font-bold">{showForgotPassword ? "Reset Password" : "Sign In"}</h1>
          <p className="text-base text-slate-400 font-poppins">{showForgotPassword ? "Enter your email to receive a password reset link" : "Sign in to start using Mukti Hospital's services"}</p>
        </div>

        {showForgotPassword ? (
          // Forgot Password Form
          <form className="mt-8 space-y-4" onSubmit={handleResetPasswordSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="text-slate-800 mb-2 font-jost font-medium text-base block">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Your Email"
                  className="px-4 py-2 h-[48px] border w-full rounded-md focus:outline-none transition-all duration-300 border-slate-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className="w-full py-2 rounded-md bg-M-primary-color text-white hover:bg-M-secondary-color transition-all duration-300">
              Send Reset Link
            </button>
            <button type="button" onClick={() => setShowForgotPassword(false)} className="w-full py-2 text-base text-slate-600 font-jost font-normal hover:text-slate-950 transition-all duration-300">
              Back to Sign In
            </button>
          </form>
        ) : (
          // Sign In Form
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="text-slate-800 mb-2 font-jost font-medium text-base block">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Your Email"
                  className={`px-4 py-2 h-[48px] border w-full rounded-md focus:outline-none transition-all duration-300 ${errors.email ? "border-red-500" : "border-slate-500"}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="flex text-xl absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
                    <Icon icon="proicons:alert-circle" width="20" />
                  </div>
                )}
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-2">Enter a valid email address</p>}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="text-slate-800 mb-2 font-jost font-medium text-base block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter Your Password"
                  className={`px-4 py-2 h-[48px] border w-full rounded-md focus:outline-none transition-all duration-300 ${errors.password ? "border-red-500" : "border-slate-500"}`}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="flex text-xl absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
                    <Icon icon="proicons:alert-circle" width="20" />
                  </div>
                )}
                {!errors.password && (
                  <div className="flex text-xl absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    <Icon icon={showPassword ? "mdi:eye" : "mdi:eye-off"} width="24" />
                  </div>
                )}
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-2">Password is required</p>}
            </div>

            {/* Forgot Password Link */}
            <button type="button" onClick={handleForgotPassword} className="text-base text-slate-600 font-jost font-normal hover:text-slate-950 transition-all duration-300">
              Forgot Password?
            </button>

            {/* Submit Button */}
            <button type="submit" disabled={!isFormValid} className={`w-full py-2 rounded-md transition-all duration-300 ${isFormValid ? "bg-M-primary-color text-white hover:bg-M-secondary-color" : "bg-M-primary-color/50 text-white cursor-not-allowed"}`}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        )}

        {/* Register Link */}
        <p className="text-center font-jost font-normal text-base text-M-text-color mt-4 uppercase">
          Not Registered Yet?{" "}
          <Link href="signup" className="text-M-heading-color font-medium hover:underline">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
