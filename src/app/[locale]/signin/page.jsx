"use client";
import React, { useEffect, useState } from "react";
import logo from "@/assets/images/logo-black.png";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendOtp, loginUser } from "@/app/[locale]/utils/api";
import { useAuth } from "@/app/[locale]/utils/AuthContext";
import { useRouter } from "next/navigation";

// Loading Component
const LoadingOverlay = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
    <div className="flex flex-col items-center">
      <div className="animate-spin">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="50" 
          height="50" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="text-M-primary-color"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
      </div>
      <p className="mt-4 text-M-primary-color font-medium">
        Redirecting to Dashboard...
      </p>
    </div>
  </div>
);

const Signin = () => {
  const router = useRouter(); // Initialize router
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState("signIn");
  const [isValid, setIsValid] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Show loading overlay
      setIsRedirecting(true);
      
      // Redirect to dashboard after a short delay to show loading
      setTimeout(() => {
        window.location.href = "https://dashboard-muktidigital.netlify.app";
      }, 1000);
    }
  }, []);

  const [formData, setFormData] = useState({
    mobile: "",
    otp: "",
  });

  // Handle input change for all form fields
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "mobile") {
      // Ensure mobile number starts with "88"
      if (!value.startsWith("88")) {
        value = "88" + value.replace(/^88/, ""); // If the user does not enter "88", automatically add it
      }

      // Allow only numeric values
      value = value.replace(/\D/g, ""); // Remove any non-numeric characters

      // Limit length to 13 digits (format: 8801XXXXXXXX)
      if (value.length > 13) {
        value = value.slice(0, 13); // Restrict the mobile number length to 13 digits
      }

      // Validation: Check if the phone number is complete (13 digits including 88 prefix)
      const isValidPhoneNumber = value.length === 13;
      setIsValid(isValidPhoneNumber);
    }

    setFormData({ ...formData, [name]: value });
  };

  // Handle Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (formData.mobile.length < 10) {
      toast.error("Enter a valid mobile number");
      return;
    }

    // Mobile number already has 88 prefix in formData
    const mobileNumber = formData.mobile;

    setLoading(true);
    try {
      await sendOtp(mobileNumber);
      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (error) {
      toast.error("Failed to send OTP. Try again.");
    }
    setLoading(false);
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (formData.otp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      // Get token from login API
      const response = await loginUser({
        mobile: formData.mobile,
        otp: formData.otp,
      });

      // Check if response contains token
      if (response && response.token) {
        // Use login function from AuthContext to update the global auth state
        localStorage.setItem("authToken", response.token); // Token save localStorage-এ
        login(response.token);
        toast.success("Logged in successfully!");
        
        // Show loading overlay and redirect
        setIsRedirecting(true);
        setTimeout(() => {
          window.location.href = `https://dashboard-muktidigital.netlify.app?token=${response.token}`;
        }, 1000);
      } else {
        throw new Error("No authentication token received");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
      console.error("Login error:", error);
    }
    setLoading(false);
  };

  // If redirecting, show loading overlay
  if (isRedirecting) {
    return <LoadingOverlay />;
  }

  return (
    <div className="block w-full py-10 md:py-24 px-2">
      <div className="max-w-96 mx-auto w-full p-6 md:p-8 bg-white rounded-lg overflow-y-auto shadow border border-M-primary-color/10">
        <div className="relative">
          <Link href="/">
            <Image src={logo} alt="logo" width={200} className="mx-auto" />
          </Link>
        </div>

        {/* Tab Navigation - Hide when OTP verification is active */}
        {!otpSent && (
          <ul className="grid grid-cols-2 border-b border-gray-200 mt-4 font-jost font-medium text-lg text-M-text-color">
            <li>
              <Link
                href={"/signin"}
                className=" w-full block cursor-pointer py-2 px-4 text-center border-b-4 border-M-primary-color text-M-primary-color font-medium"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                href={"/register"}
                className=" w-full block cursor-pointer py-2 px-4 text-center"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        )}

        {/* Tab Content */}
        <div className="mt-4">
          {/* OTP Verification Screen (Shows for both sign in and sign up) */}
          {otpSent ? (
            <div>
              <h2 className="text-2xl text-center font-jost font-bold mb-4">
                Verify OTP
              </h2>
              <p className="text-center text-slate-400 mb-4">
                Enter the OTP sent to your phone.
              </p>
              <form
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-M-primary-color/80 focus:border-M-primary-color"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-M-primary-color text-white p-3 rounded-md hover:bg-M-heading-color transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify & Login"}
                </button>
              </form>
              {/* Resend OTP */}
              <p className="text-center mt-4 text-sm">
                Didn't receive OTP?{" "}
                <button
                  onClick={handleSendOtp}
                  className="text-M-primary-color hover:underline"
                >
                  Resend OTP
                </button>
              </p>
            </div>
          ) : (
            // Sign In Tab
            <div>
              <form onSubmit={handleSendOtp} className="space-y-4">
                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-base font-medium text-gray-700"
                  >
                    Phone Number{" "}
                    <span className="text-M-secondary-color text-lg">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                      <Icon
                        icon="twemoji:flag-bangladesh"
                        width="18"
                        height="18"
                      />
                      <span className="text-black font-medium">+</span>
                    </div>
                    <input
                      type="tel"
                      name="mobile"
                      id="mobile"
                      autoComplete="tel"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      placeholder="8801XXXXXXXX"
                      className={`border ${isValid ? "focus:border-M-primary-color focus:ring-M-primary-color/80" : "focus:border-M-secondary-color focus:ring-M-secondary-color/80"} outline-none ring-offset-1 focus:ring-2 transition-all duration-300 block w-full px-3 py-2 pl-12 rounded-md`}
                      maxLength="13"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-M-primary-color text-base text-white font-jost font-medium w-full py-3 px-4 mt-5 rounded-md hover:bg-M-heading-color transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "SEND CODE"}
                </button>
              </form>
              <p className="font-jost font-normal text-base text-M-text-color text-center mt-4">
                Don't have an account?
              </p>
              <Link
                href={"/register"}
                type="button"
                className="bg-M-primary-color block text-center text-base text-white font-jost font-medium w-full py-3 px-4 mt-5 rounded-md hover:bg-M-heading-color transition-all duration-300 uppercase"
              >
                Create A New Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;