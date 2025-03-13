"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser, sendOtp } from "../utils/api";
import Link from "next/link";
import logo from "@/assets/images/logo-black.png";
import backgroundImage from "@/assets/images/authBG.png";
import Image from "next/image";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Handle Input Change
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
    }

    // Update the state with the new value
    setFormData({ ...formData, [name]: value });
};


  // ✅ Handle Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (formData.mobile.length < 10) {
      toast.error("Enter a valid mobile number");
      return;
    }

    setLoading(true);
    try {
      await sendOtp(formData.mobile);
      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (error) {
      toast.error("Failed to send OTP. Try again.");
    }
    setLoading(false);
  };

  // ✅ Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.otp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        name: formData.name,
        mobile: formData.mobile,
        otp: formData.otp,
      });
      toast.success("Registered successfully! You can now log in.");
      window.location.href = "/login";
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    }
    setLoading(false);
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
        <Image className="block mx-auto md:hidden" src={logo} alt="Logo" />
        <div className="text-center space-y-3">
          <h1 className="text-4xl text-black font-jost font-bold">
            {otpSent ? "Verify OTP" : "Sign Up"}
          </h1>
          <p className="text-base text-slate-400 font-poppins">
            {otpSent
              ? "Enter the OTP sent to your email."
              : "Create an account to get started."}
          </p>
        </div>
        {/* OTP Form */}
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <label
              htmlFor="name"
              className="text-slate-800 font-jost font-medium text-base block"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
            <label
              htmlFor="phone"
              className="text-slate-800  font-jost font-medium text-base block"
            >
              Phone
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="8801XXXXXXXX"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              maxLength="13"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify & Register"}
            </button>
          </form>
        )}
        <p className="text-center mt-4 font-jost font-normal text-base text-M-text-color uppercase">
          Already Registered?{" "}
          <Link
            href={"/signin"}
            className="text-M-heading-color font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
        {/* Resend OTP */}
        {otpSent && (
          <p className="text-center mt-4 text-sm">
            Didn't receive OTP?{" "}
            <button
              onClick={handleSendOtp}
              className="text-blue-500 hover:underline"
            >
              Resend OTP
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
