"use client";
import React, { useEffect, useState } from "react";
import logo from "@/assets/images/logo-black.png";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser, sendOtp, loginUser } from "@/app/[locale]/utils/api";
import { useAuth } from "@/app/[locale]/utils/AuthContext";

const AuthModal = ({ showModal, setShowModal }) => {
  const { login } = useAuth(); // Get login function from AuthContext
  const [activeTab, setActiveTab] = useState("signIn");
  const [isValid, setIsValid] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    otp: "",
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setOtpSent(false); // Reset OTP state when switching tabs
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Controlling body overflow when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  if (!showModal) {
    return null;
  }

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
      // Check if the user exists first (only for signup tab)
      if (activeTab === "signUp") {
        try {
          // Make an API call to check if user exists
          const response = await fetch(`https://api.muktihospital.com/api/auth/check-user?mobile=${mobileNumber}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          const data = await response.json();
          
          // If user exists, show warning and don't send OTP
          if (response.ok && data.exists) {
       
            toast.info("This number is already registered. Redirecting to sign in.");

          setActiveTab("signIn");
            setLoading(false);
            return;
          }
        } catch (error) {
          console.log("Error checking user existence:", error);
          // Continue with OTP sending even if check fails
        }
      }

      // Send OTP
      await sendOtp(mobileNumber);
      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (error) {
      // Check for specific error messages from the server about existing users
      if (
        error.response?.data?.message?.toLowerCase().includes("already exists") ||
        error.response?.data?.error?.toLowerCase().includes("already exists") ||
        error.response?.status === 409 // Conflict status often used for "already exists"
      ) {
        toast.warning("This number is already registered. Please use sign in instead.");
      } else {
        toast.error("Failed to send OTP. Try again.");
      }
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
        login(response.token);
        window.location.href = `https://dashboard-muktidigital.netlify.app?token=${response.token}`;
        toast.success("Logged in successfully!");
        // Close modal
        setShowModal(false);
      } else {
        throw new Error("No authentication token received");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
      console.error("Login error:", error);
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
      // Mobile number already has 88 prefix in formData
      const mobileNumber = formData.mobile;

      console.log("Attempting to register with:", {
        name: formData.name, 
        mobile: mobileNumber,
        otpLength: formData.otp.length
      });

      // First check if we can log in directly (user might already exist)
      try {
        const loginResponse = await loginUser({
          mobile: mobileNumber,
          otp: formData.otp,
        });
        
        if (loginResponse && loginResponse.token) {
          // User already exists and login successful
          login(loginResponse.token);
          window.location.href = `https://dashboard-muktidigital.netlify.app?token=${response.token}`;
          toast.success("Login successful!");
          setShowModal(false);
          return; // Exit the function
        }
      } catch (loginError) {
        console.log("Login before registration failed, continuing with registration");
      }

      // TEMPORARY SOLUTION WHILE SERVER IS HAVING ISSUES
      // Instead of actual registration, show a registration error
      try {
        const registerResponse = await registerUser({
          name: formData.name,
          mobile: mobileNumber,
          otp: formData.otp,
        });
        
        console.log("Registration response:", registerResponse);
        
        // If registration somehow succeeds, attempt login
        const loginResponse = await loginUser({
          mobile: mobileNumber,
          otp: formData.otp,
        });
        
        if (loginResponse && loginResponse.token) {
          login(loginResponse.token);
          toast.success("Registration and login successful!");
          setShowModal(false);
        }
      } catch (registerError) {
        console.error("Registration error:", registerError);
        
        // HERE IS THE TEMPORARY FIX FOR SERVER ERRORS
        // Check if this is a 500 server error
        if (registerError.response && registerError.response.status === 500) {
          // Try to login anyway - the user might already exist despite the 500 error
          try {
            const loginResponse = await loginUser({
              mobile: mobileNumber,
              otp: formData.otp,
            });
            
            if (loginResponse && loginResponse.token) {
              login(loginResponse.token);
              toast.success("Login successful!");
              setShowModal(false);
              return; // Exit early if login works
            }
          } catch (finalLoginError) {
            // If all attempts fail, show specific error message
            toast.error("Registration failed. Please try again later or contact support.");
            console.error("All authentication attempts failed");
          }
        } else {
          // For other error types, show the specific error
          const errorMessage = 
            registerError.response?.data?.message || 
            registerError.response?.data?.error || 
            registerError.message || 
            "Registration failed";
          
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-black/50 backdrop-blur-md w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center px-2">
      <div className="max-w-96 w-full p-6 md:p-8 bg-white rounded-lg overflow-y-auto">
        <div className="relative">
          <Link href="/">
            <Image src={logo} alt="logo" width={200} className="mx-auto" />
          </Link>
          <button onClick={handleCloseModal} className="absolute top-0 right-0">
            <Icon icon="material-symbols-light:close" width="24" height="24" />
          </button>
        </div>

        {/* Tab Navigation - Hide when OTP verification is active */}
        {!otpSent && (
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
                Enter the OTP sent to your{" "}
                {activeTab === "signUp" ? "email" : "phone"}.
              </p>
              <form
                onSubmit={activeTab === "signUp" ? handleRegister : handleLogin}
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
                  {loading
                    ? "Verifying..."
                    : activeTab === "signUp"
                      ? "Verify & Register"
                      : "Verify & Login"}
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
          ) : activeTab === "signUp" ? (
            // Sign Up Tab
            <div>
              <form onSubmit={handleSendOtp} className="space-y-4">
                {/* Name */}
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
                <p
                  onClick={() => handleTabClick("signIn")}
                  className="text-base text-M-heading-color font-jost font-medium cursor-pointer inline-block"
                >
                  Back to Sign In
                </p>
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