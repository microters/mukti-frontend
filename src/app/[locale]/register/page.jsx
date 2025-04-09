"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head"; // Import Head for client-side meta tag management
import logo from "@/assets/images/logo-black.png";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser, sendOtp, loginUser } from "@/app/[locale]/utils/api";
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

const Register = () => {
  const router = useRouter(); // Initialize router
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState("signUp");
  const [isValid, setIsValid] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Dynamic URL construction on the client side
  const siteUrl = typeof window !== "undefined" ? `${window.location.protocol}//${window.location.host}/register` : "https://www.muktihospital.com/register";
  const ogImage = `${siteUrl.replace("/register", "")}/og-image-register.jpg`; // Adjust path as needed

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsRedirecting(true);
      setTimeout(() => {
        window.location.href = "https://dashboard-muktidigital.netlify.app";
      }, 1000);
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    otp: "",
  });

  // Handle input change for all form fields
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "mobile") {
      if (!value.startsWith("88")) {
        value = "88" + value.replace(/^88/, "");
      }
      value = value.replace(/\D/g, "");
      if (value.length > 13) {
        value = value.slice(0, 13);
      }
      const isValidPhoneNumber = value.length === 13;
      setIsValid(isValidPhoneNumber);
    }

    setFormData({ ...formData, [name]: value });
  };

  // Handle Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (formData.mobile.length < 10) {
      toast.error("Enter a valid mobile number");
      return;
    }

    const mobileNumber = formData.mobile;

    setLoading(true);
    try {
      const response = await fetch(`https://api.muktihospital.com/api/auth/check-user?mobile=${mobileNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.exists) {
        toast.warning("This number is already registered. Redirecting to sign in.");
        setTimeout(() => {
          router.push('/signin');
        }, 1500);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log("Error checking user existence:", error);
    }

    try {
      await sendOtp(mobileNumber);
      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (error) {
      if (
        error.response?.data?.message?.toLowerCase().includes("already registered") ||
        error.response?.data?.error?.toLowerCase().includes("already exists") ||
        error.response?.status === 409
      ) {
        toast.warning("This number is already registered. Redirecting to sign in.");
        setTimeout(() => {
          router.push('/signin');
        }, 1500);
      } else {
        toast.error("Failed to send OTP. Try again.");
      }
    }
    setLoading(false);
  };

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.otp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const mobileNumber = formData.mobile;
      const response = await registerUser({
        name: formData.name,
        mobile: mobileNumber,
        otp: formData.otp,
      });

      if (response && response.token) {
        localStorage.setItem("authToken", response.token);
        login(response.token);
        toast.success("Registered and logged in successfully!");
        setIsRedirecting(true);
        setTimeout(() => {
          window.location.href = `https://dashboard-muktidigital.netlify.app?token=${response.token}`;
        }, 1000);
      } else {
        try {
          const loginResponse = await loginUser({
            mobile: mobileNumber,
            otp: formData.otp
          });
          
          if (loginResponse && loginResponse.token) {
            localStorage.setItem("authToken", loginResponse.token);
            login(loginResponse.token);
            toast.success("Registered and logged in successfully!");
            setIsRedirecting(true);
            setTimeout(() => {
              window.location.href = `https://dashboard-muktidigital.netlify.app?token=${loginResponse.token}`;
            }, 1000);
          } else {
            toast.success("Registered successfully! Please sign in now.");
            setTimeout(() => {
              router.push('/signin');
            }, 1500);
          }
        } catch (loginError) {
          console.error("Auto-login error:", loginError);
          toast.success("Registered successfully! Please sign in now.");
          setTimeout(() => {
            router.push('/signin');
          }, 1500);
        }
      }
    } catch (error) {
      if (
        error.response?.data?.error?.toLowerCase().includes("already registered") ||
        error.response?.status === 409
      ) {
        toast.warning("This number is already registered. Redirecting to sign in.");
        setTimeout(() => {
          router.push('/signin');
        }, 1500);
      } else {
        toast.error(error.response?.data?.error || "Registration failed");
        console.error("Registration error:", error);
      }
    }
    setLoading(false);
  };

  if (isRedirecting) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Register - Mukti Hospital</title>
        <meta name="description" content="Sign up for Mukti Hospital to book appointments and manage your healthcare needs." />
        <meta name="keywords" content="register, sign up, Mukti Hospital, healthcare, patient registration" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="Register - Mukti Hospital" />
        <meta property="og:description" content="Sign up for Mukti Hospital to book appointments and manage your healthcare needs." />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Mukti Hospital Registration" />
        <meta property="og:site_name" content="Mukti Hospital" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content="Register - Mukti Hospital" />
        <meta name="twitter:description" content="Sign up for Mukti Hospital to book appointments and manage your healthcare needs." />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="Mukti Hospital Registration" />
        <meta name="twitter:site" content="@MuktiHospital" />
      </Head>
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
                  className="w-full block cursor-pointer py-2 px-4 text-center"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href={"/register"}
                  className="w-full block cursor-pointer py-2 px-4 text-center border-b-4 border-M-primary-color text-M-primary-color font-medium"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          )}

          {/* Tab Content */}
          <div className="mt-4">
            {otpSent ? (
              <div>
                <h2 className="text-2xl text-center font-jost font-bold mb-4">
                  Verify OTP
                </h2>
                <p className="text-center text-slate-400 mb-4">
                  Enter the OTP sent to your phone.
                </p>
                <form onSubmit={handleRegister} className="space-y-4">
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
                    {loading ? "Verifying..." : "Verify & Register"}
                  </button>
                </form>
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
              <div>
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-jost text-base font-medium text-gray-700"
                    >
                      Full Name{" "}
                      <span className="text-M-secondary-color text-lg">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border border-M-text-color outline-none focus:ring-1 focus:ring-M-primary-color/80 focus:border-M-primary-color transition-all duration-300 block w-full px-3 py-2 rounded-md"
                      />
                    </div>
                  </div>
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
                  <Link
                    href={"/signin"}
                    className="text-base text-M-heading-color font-jost font-medium cursor-pointer inline-block"
                  >
                    Back to Sign In
                  </Link>
                  <button
                    type="submit"
                    className="bg-M-primary-color text-base text-white font-jost font-medium w-full py-3 px-4 mt-5 rounded-md hover:bg-M-heading-color transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "SEND CODE"}
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;