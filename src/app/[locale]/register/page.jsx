// "use client";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { registerUser, sendOtp } from "../utils/api";
// import Link from "next/link";
// import logo from "@/assets/images/logo-black.png";
// import backgroundImage from "@/assets/images/authBG.png";
// import Image from "next/image";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     otp: "",
//   });

//   const [otpSent, setOtpSent] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ✅ Handle Input Change
//   const handleChange = (e) => {
//     let { name, value } = e.target;

//     if (name === "mobile") {
//         // Ensure mobile number starts with "88"
//         if (!value.startsWith("88")) {
//             value = "88" + value.replace(/^88/, ""); // If the user does not enter "88", automatically add it
//         }

//         // Allow only numeric values
//         value = value.replace(/\D/g, ""); // Remove any non-numeric characters

//         // Limit length to 13 digits (format: 8801XXXXXXXX)
//         if (value.length > 13) {
//             value = value.slice(0, 13); // Restrict the mobile number length to 13 digits
//         }
//     }

//     // Update the state with the new value
//     setFormData({ ...formData, [name]: value });
// };


//   // ✅ Handle Send OTP
//   const handleSendOtp = async (e) => {
//     e.preventDefault();

//     if (formData.mobile.length < 10) {
//       toast.error("Enter a valid mobile number");
//       return;
//     }

//     setLoading(true);
//     try {
//       await sendOtp(formData.mobile);
//       setOtpSent(true);
//       toast.success("OTP sent successfully!");
//     } catch (error) {
//       toast.error("Failed to send OTP. Try again.");
//     }
//     setLoading(false);
//   };

//   // ✅ Handle Registration
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (formData.otp.length !== 6) {
//       toast.error("Enter a valid 6-digit OTP");
//       return;
//     }

//     setLoading(true);
//     try {
//       await registerUser({
//         name: formData.name,
//         mobile: formData.mobile,
//         otp: formData.otp,
//       });
//       toast.success("Registered successfully! You can now log in.");
//       window.location.href = "/login";
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Registration failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="w-full h-screen overflow-auto grid grid-cols-1 md:grid-cols-2">
//       <div className="hidden md:flex justify-center items-center p-8">
//         {/* <Image className="mx-auto hidden md:block" src={logo} alt="Logo" /> */}
//         <Image
//           className="mx-auto hidden md:block"
//           src={backgroundImage}
//           alt="Logo"
//         />
//       </div>
//       <div className="max-w-[500px] w-full px-5 py-8 flex flex-col justify-center mx-auto">
//         <Image className="block mx-auto md:hidden" src={logo} alt="Logo" />
//         <div className="text-center space-y-3">
//           <h1 className="text-4xl text-black font-jost font-bold">
//             {otpSent ? "Verify OTP" : "Sign Up"}
//           </h1>
//           <p className="text-base text-slate-400 font-poppins">
//             {otpSent
//               ? "Enter the OTP sent to your email."
//               : "Create an account to get started."}
//           </p>
//         </div>
//         {/* OTP Form */}
//         {!otpSent ? (
//           <form onSubmit={handleSendOtp} className="space-y-4">
//             <label
//               htmlFor="name"
//               className="text-slate-800 font-jost font-medium text-base block"
//             >
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Full Name"
//               className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
//               required
//             />
//             <label
//               htmlFor="phone"
//               className="text-slate-800  font-jost font-medium text-base block"
//             >
//               Phone
//             </label>
//             <input
//               type="tel"
//               name="mobile"
//               value={formData.mobile}
//               onChange={handleChange}
//               placeholder="8801XXXXXXXX"
//               className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
//               maxLength="13"
//               required
//             />

//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
//               disabled={loading}
//             >
//               {loading ? "Sending..." : "Send OTP"}
//             </button>
//           </form>
//         ) : (
//           <form onSubmit={handleRegister} className="space-y-4">
//             <input
//               type="text"
//               name="otp"
//               value={formData.otp}
//               onChange={handleChange}
//               placeholder="Enter OTP"
//               className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
//               disabled={loading}
//             >
//               {loading ? "Verifying..." : "Verify & Register"}
//             </button>
//           </form>
//         )}
//         <p className="text-center mt-4 font-jost font-normal text-base text-M-text-color uppercase">
//           Already Registered?{" "}
//           <Link
//             href={"/signin"}
//             className="text-M-heading-color font-medium hover:underline"
//           >
//             Sign In
//           </Link>
//         </p>
//         {/* Resend OTP */}
//         {otpSent && (
//           <p className="text-center mt-4 text-sm">
//             Didn't receive OTP?{" "}
//             <button
//               onClick={handleSendOtp}
//               className="text-blue-500 hover:underline"
//             >
//               Resend OTP
//             </button>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Register;


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

const Register = () => {
  const { login } = useAuth();
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
        login(response.token);
        toast.success("Logged in successfully!");
        // Close modal
        setShowModal(false);
        window.location.href = "/";
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

      // Register user and get response with token
      const response = await registerUser({
        name: formData.name,
        mobile: mobileNumber,
        otp: formData.otp,
      });

      // Check if registration returns a token
      if (response && response.token) {
        // Use login function from AuthContext to update the global auth state
        login(response.token);
        toast.success("Registered and logged in successfully!");
        window.location.href = "/";
        // Close modal
        setShowModal(false);
      } else {
        // If registration doesn't return a token, switch to sign in tab
        toast.success("Registered successfully! Please sign in now.");
        setOtpSent(false);
        setActiveTab("signIn");
        // Reset form data
        setFormData({
          name: "",
          mobile: "",
          otp: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
      console.error("Registration error:", error);
    }
    setLoading(false);
  };

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
                className=" w-full block cursor-pointer py-2 px-4 text-center"
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                href={"/register"}
                className=" w-full block cursor-pointer py-2 px-4 text-center border-b-4 border-M-primary-color text-M-primary-color font-medium"
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
          ) : (
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
                <Link href={'/signin'}
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
  );
};

export default Register;
