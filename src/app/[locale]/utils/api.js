import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth"; // আপনার ব্যাকএন্ড URL

// OTP পাঠানোর ফাংশন
export const sendOtp = async (mobile) => {
  console.log("API sendOtp called with:", mobile);
  
  if (!mobile) {
    console.error("No mobile provided to sendOtp");
    throw new Error("Mobile number is required");
  }
  
  try {
    // নিশ্চিত করুন যে mobile একটি স্ট্রিং হিসাবে আছে
    const mobileNumber = typeof mobile === 'object' ? mobile.mobile : mobile;
    
    // API এর জন্য পে-লোডে "mobileNumber" কী ব্যবহার করুন
    console.log("Sending to API:", { mobileNumber });
    const response = await axios.post(
      `${API_BASE_URL}/send-otp`,
      { mobileNumber },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Full API Error:", error);
    
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
      throw new Error(
        error.response.data?.error || error.response.data?.message || "API error: " + error.response.status
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response from server. Check your internet connection.");
    } else {
      console.error("Error message:", error.message);
      throw new Error(error.message || "An unknown error occurred");
    }
  }
};
// OTP দিয়ে লগইন ফাংশন
export const loginUser = async (data) => {
  // data: { name?, mobile, otp }
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Login failed.");
  }
};

// OTP দিয়ে রেজিস্ট্রেশন ফাংশন
export const registerUser = async (data) => {
  // data: { name, mobile, otp }
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Registration failed.");
  }
};

// Logout ফাংশন
export const logout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login";
};

// (ঐচ্ছিক) ইউজার প্রোফাইল পাওয়ার ফাংশন
export const getUserProfile = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  try {
    const res = await axios.get(`${API_BASE_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch {
    return null;
  }
};
