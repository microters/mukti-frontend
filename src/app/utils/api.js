// import axios from "axios";
// import Cookies from "js-cookie";

// const API_BASE_URL = "http://localhost:5000/api/auth"; // Backend API URL

// // ✅ Send OTP Request
// export const sendOtp = async (mobile) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/send-otp`, { mobileNumber: mobile });
//     console.log(response);
    
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error sending OTP:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.error || "Failed to send OTP.");
//   }
// };

// // ✅ Register User Request
// export const registerUser = async (data) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/register`, data);
//     console.log(response);
    
//     return response.data;
//   } catch (error) {
//     console.error("❌ Registration Error:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.error || "Registration failed.");
//   }
// };

// // ✅ Login User Request
// export const loginUser = async (data) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/login`, data);
//     if (response.data.token) {
//       Cookies.set("authToken", response.data.token, { expires: 7 });
//     }
//     return response.data;
//   } catch (error) {
//     console.error("❌ Login Error:", error.response?.data || error.message);
//     throw new Error(error.response?.data?.error || "Login failed.");
//   }
// };

// // ✅ Get User Profile
// export const getUser = async () => {
//   const token = Cookies.get("authToken");
//   if (!token) return null;
//   return await axios.get(`${API_BASE_URL}/profile`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// // ✅ Logout User
// export const logout = () => {
//   Cookies.remove("authToken");
//   window.location.href = "/login";
// };
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth"; // Backend API URL

// ✅ Send OTP Request
export const sendOtp = async (mobile) => {
  try {
    console.log("🔗 Calling API:", `http://localhost:5000/api/auth/send-otp`);
    
    const response = await axios.post("http://localhost:5000/api/auth/send-otp", {
      mobileNumber: mobile,
    });

    console.log("✅ OTP Sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ OTP Send Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to send OTP.");
  }
};


// ✅ Register User Request
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    console.log("✅ User Registered:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Registration Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Registration failed. Try again.");
  }
};



// ✅ Login User & Store Token in LocalStorage
export const loginUser = async (data) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", data);
    
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token); // ✅ Store token
    }
    
    return response.data;
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Login failed.");
  }
};
;

// ✅ Get User Profile (Dashboard Load হবার সময় টোকেন চেক করবে)
export const getUser = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

// ✅ Logout User
export const logout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login";
};
