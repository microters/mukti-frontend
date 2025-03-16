
"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgImage from "@/assets/images/authBG.png";
import Image from "next/image";
import { loginUser, sendOtp } from "../utils/api";

const Login = () => {
  const [mobile, setMobile] = useState("88");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    console.log("✅ Send OTP button clicked!");  // Check if function is triggered
    console.log("Mobile Number:", mobile);      // Check mobile number format

    if (mobile.length !== 13) {
      toast.error("Enter a valid mobile number (8801XXXXXXXX)");
      return;
    }

    setLoading(true);
    try {
      console.log("🚀 Sending request to API...");
      const response = await sendOtp(mobile);
      console.log("✅ OTP API Response:", response);  // Log API response

      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (error) {
      console.error("❌ Error Sending OTP:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Failed to send OTP. Try again.");
    }
    setLoading(false);
};

const handleLogin = async (e) => {
  e.preventDefault();

  if (otp.length !== 6) {
    toast.error("Enter a valid OTP");
    return;
  }

  setLoading(true);
  try {
    const response = await loginUser({ mobile, otp });
    if (response.token) {
      localStorage.setItem("authToken", response.token);
      toast.success("Login successful!");

      // environment অনুযায়ী URL নির্ধারণ
      const redirectUrl = window.location.hostname === "localhost" 
        ? "http://localhost:3001" 
        : "https://dashboar-muktidigital.netlify.app";

      window.location.href = `${redirectUrl}?token=${response.token}`;
    } else {
      toast.error("Login failed. No token received.");
    }
  } catch (error) {
    toast.error("Login failed");
  } finally {
    setLoading(false);
  }
};

  

  return (
    <div className="w-full h-screen overflow-auto grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex justify-center items-center p-8">
        <Image className="mx-auto hidden md:block" src={bgImage} alt="Login Background" />
      </div>

      <div className="max-w-[500px] px-5 py-8 flex flex-col justify-center mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Login</h2>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter Mobile Number" className="w-full p-3 border rounded-lg" required />
            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" className="w-full p-3 border rounded-lg" required />
            <button type="submit" className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
