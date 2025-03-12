// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import React, { useState } from "react";
// import { Icon } from "@iconify/react";
// import logo from "../../assets/images/logo-black.png";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// import bgImage from "@/assets/images/authBG.png";

// const Signin = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({
//     email: false,
//     password: false,
//   });
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const router = useRouter();

//   const isFormValid = !Object.values(errors).includes(true);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));

//     // Validate fields
//     setErrors((prev) => ({
//       ...prev,
//       [id]: id === "email" ? !emailRegex.test(value) : value.trim() === "",
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrors({
//       email: !emailRegex.test(formData.email),
//       password: formData.password.trim() === "",
//     });

//     if (!Object.values(errors).includes(true)) {
//       try {
//         // Send the login request
//         const response = await axios.post(
//           "https://api.muktihospital.com/api/login",
//           formData
//         );

//         if (response.status === 200) {
//           // Save the token in localStorage for future authentication
//           localStorage.setItem("token", response.data.token);
//           router.push("/dashboard"); // Redirect to dashboard or main page
//         }
//       } catch (error) {
//         alert(error.response?.data?.message || "Login error.");
//       }
//     }
//     setLoading(false);
//   };

//   const handleForgotPassword = () => {
//     // Trigger forgot password screen
//     setShowForgotPassword(true);
//   };

//   const handleResetPasswordSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const email = formData.email;
//     try {
//       const response = await axios.post(
//         "https://api.muktihospital.com/api/forgot-password",
//         { email }
//       );

//       if (response.status === 200) {
//         alert("Password reset link sent to your email.");
//         setShowForgotPassword(false); // Go back to login
//       }
//     } catch (error) {
//       alert(
//         error.response?.data?.message || "Error in sending reset password link."
//       );
//     }
//     setLoading(false);
//   };

//   return (
    // <div className="w-full h-screen overflow-auto grid grid-cols-1 md:grid-cols-2">
    //   <div className="hidden md:flex justify-center items-center p-8">
    //     {/* <Image className="mx-auto hidden md:block" src={logo} alt="Logo" /> */}
    //     <Image className="mx-auto hidden md:block" src={bgImage} alt="Logo" />
    //   </div>

//       <div className="max-w-[500px] px-5 py-8 flex flex-col justify-center mx-auto">
//         <div className="text-center space-y-3">
//           <Image className="block mx-auto mb-10" src={logo} alt="Logo" />
//           <h1 className="text-4xl text-black font-jost font-bold">
//             {showForgotPassword ? "Reset Password" : "Sign In"}
//           </h1>
//           <p className="text-base text-slate-400 font-poppins">
//             {showForgotPassword
//               ? "Enter your email to receive a password reset link"
//               : "Sign in to start using Mukti Hospital's services"}
//           </p>
//         </div>

//         {showForgotPassword ? (
//           // Forgot Password Form
//           <form className="mt-8 space-y-4" onSubmit={handleResetPasswordSubmit}>
//             {/* Email Input */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="text-slate-800 mb-2 font-jost font-medium text-base block"
//               >
//                 Email
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="Enter Your Email"
//                   className="px-4 py-2 h-[48px] border w-full rounded-md focus:outline-none transition-all duration-300 border-slate-500"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="w-full py-2 rounded-md bg-M-primary-color text-white hover:bg-M-secondary-color transition-all duration-300"
//             >
//               Send Reset Link
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowForgotPassword(false)}
//               className="w-full py-2 text-base text-slate-600 font-jost font-normal hover:text-slate-950 transition-all duration-300"
//             >
//               Back to Sign In
//             </button>
//           </form>
//         ) : (
//           // Sign In Form
//           <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
//             {/* Email Input */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="text-slate-800 mb-2 font-jost font-medium text-base block"
//               >
//                 Email
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="Enter Your Email"
//                   className={`px-4 py-2 h-[48px] border w-full rounded-md focus:outline-none transition-all duration-300 ${errors.email ? "border-red-500" : "border-slate-500"}`}
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//                 {errors.email && (
//                   <div className="flex text-xl absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
//                     <Icon icon="proicons:alert-circle" width="20" />
//                   </div>
//                 )}
//               </div>
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-2">
//                   Enter a valid email address
//                 </p>
//               )}
//             </div>

//             {/* Password Input */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="text-slate-800 mb-2 font-jost font-medium text-base block"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   placeholder="Enter Your Password"
//                   className={`px-4 py-2 h-[48px] border w-full rounded-md focus:outline-none transition-all duration-300 ${errors.password ? "border-red-500" : "border-slate-500"}`}
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//                 {errors.password && (
//                   <div className="flex text-xl absolute right-2 top-1/2 -translate-y-1/2 text-red-500">
//                     <Icon icon="proicons:alert-circle" width="20" />
//                   </div>
//                 )}
//                 {!errors.password && (
//                   <div
//                     className="flex text-xl absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 cursor-pointer"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     <Icon
//                       icon={showPassword ? "mdi:eye" : "mdi:eye-off"}
//                       width="24"
//                     />
//                   </div>
//                 )}
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-2">
//                   Password is required
//                 </p>
//               )}
//             </div>

//             {/* Forgot Password Link */}
//             <button
//               type="button"
//               onClick={handleForgotPassword}
//               className="text-base text-slate-600 font-jost font-normal hover:text-slate-950 transition-all duration-300"
//             >
//               Forgot Password?
//             </button>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={!isFormValid}
//               className={`w-full py-2 rounded-md transition-all duration-300 ${isFormValid ? "bg-M-primary-color text-white hover:bg-M-secondary-color" : "bg-M-primary-color/50 text-white cursor-not-allowed"}`}
//             >
//               {loading ? "Signing In..." : "Sign In"}
//             </button>
//           </form>
//         )}

//         {/* Register Link */}
//         <p className="text-center font-jost font-normal mt-4 text-base text-M-text-color  uppercase">
//           Not Registered Yet?{" "}
//           <Link
//             href="signup"
//             className="text-M-heading-color font-medium hover:underline"
//           >
//             Register Now
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signin;
// "use client";
// import { useState } from "react";

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { loginUser, sendOtp } from "../utils/api";
// import logo from "../../assets/images/logo-black.png";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import bgImage from "@/assets/images/authBG.png";
// import Image from "next/image";
// const Login = () => {
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ✅ Handle Send OTP
//   const handleSendOtp = async (e) => {
//     e.preventDefault();

//     if (mobile.length < 10) {
//       toast.error("Enter a valid mobile number");
//       return;
//     }

//     setLoading(true);
//     try {
//       await sendOtp(mobile);
//       setOtpSent(true);
//       toast.success("OTP sent successfully!");
//     } catch (error) {
//       toast.error("Failed to send OTP. Try again.");
//     }
//     setLoading(false);
//   };

//   // ✅ Handle Login with OTP
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (otp.length !== 6) {
//       toast.error("Enter a valid 6-digit OTP");
//       return;
//     }

//     setLoading(true);
//     try {
//       await loginUser({ mobile, otp });
//       toast.success("Login successful!");
//       window.location.href = "/profile";
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Login failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="w-full h-screen overflow-auto grid grid-cols-1 md:grid-cols-2">
//     <div className="hidden md:flex justify-center items-center p-8">
//       {/* <Image className="mx-auto hidden md:block" src={logo} alt="Logo" /> */}
//       <Image className="mx-auto hidden md:block" src={bgImage} alt="Logo" />
//     </div>
//     <div className="max-w-[500px] px-5 py-8 flex flex-col justify-center mx-auto">
//         <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Login</h2>

//         {/* OTP Form */}
//         {!otpSent ? (
//           <form onSubmit={handleSendOtp} className="space-y-4">
//             <input
//               type="tel"
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//               placeholder="Enter Mobile Number"
//               className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
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
//           <form onSubmit={handleLogin} className="space-y-4">
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter OTP"
//               className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//         )}

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
//         </div>
//       </div>
    
//   );
// };

// export default Login;


// "use client";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import logo from "../../assets/images/logo-black.png";
// import bgImage from "@/assets/images/authBG.png";
// import Image from "next/image";
// import { loginUser, sendOtp } from "../utils/api";

// const Login = () => {
//   const [mobile, setMobile] = useState("88"); // Start with "88" for BD numbers
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ✅ Handle Mobile Number Input (Ensures BD Format)
//   const handleMobileChange = (e) => {
//     let value = e.target.value;

//     // Ensure it starts with "88"
//     if (!value.startsWith("88")) {
//       value = "88" + value.replace(/^88/, "");
//     }

//     // Allow only numeric values
//     value = value.replace(/\D/g, "");

//     // Limit length to 13 digits (8801XXXXXXXX)
//     if (value.length > 13) {
//       value = value.slice(0, 13);
//     }

//     setMobile(value);
//   };

//   // ✅ Handle Send OTP
//   const handleSendOtp = async (e) => {
//     e.preventDefault();

//     if (mobile.length !== 13) {
//       toast.error("Enter a valid mobile number (8801XXXXXXXX)");
//       return;
//     }

//     setLoading(true);
//     try {
//       await sendOtp(mobile);
//       setOtpSent(true);
//       toast.success("OTP sent successfully!");
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Failed to send OTP. Try again.");
//     }
//     setLoading(false);
//   };

//   // ✅ Handle Login with OTP
//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (otp.length !== 6) {
//       toast.error("Enter a valid 6-digit OTP");
//       return;
//     }

//     setLoading(true);
//     try {
//       await loginUser({ mobile, otp });
//       toast.success("Login successful!");
//       window.location.href = "http://localhost:3001"; 
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Login failed. Try again.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="w-full h-screen overflow-auto grid grid-cols-1 md:grid-cols-2">
//       {/* Left Side - Background Image */}
//       <div className="hidden md:flex justify-center items-center p-8">
//         <Image className="mx-auto hidden md:block" src={bgImage} alt="Login Background" />
//       </div>

//       {/* Right Side - Login Form */}
//       <div className="max-w-[500px] px-5 py-8 flex flex-col justify-center mx-auto">
//         <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Login</h2>

//         {/* OTP Form */}
//         {!otpSent ? (
//           <form onSubmit={handleSendOtp} className="space-y-4">
//             <input
//               type="tel"
//               value={mobile}
//               onChange={handleMobileChange}
//               placeholder="Enter Mobile Number"
//               className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
//               disabled={loading}
//             >
//               {loading ? "Sending OTP..." : "Send OTP"}
//             </button>
//           </form>
//         ) : (
//           <form onSubmit={handleLogin} className="space-y-4">
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="Enter OTP"
//               className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//         )}

//         {/* Resend OTP */}
//         {otpSent && (
//           <p className="text-center mt-4 text-sm">
//             Didn't receive OTP?{" "}
//             <button
//               onClick={handleSendOtp}
//               className="text-blue-500 hover:underline"
//               disabled={loading}
//             >
//               Resend OTP
//             </button>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;
"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie"; // ✅ Import js-cookie
import logo from "../../assets/images/logo-black.png";
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
      localStorage.setItem("authToken", response.token); // Token save localStorage-এ
      toast.success("Login successful!");

      // URL এর মাধ্যমে token পাঠানো
      window.location.href = `http://localhost:3001?token=${response.token}`;
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
