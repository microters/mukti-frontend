import axios from "axios";

const API_BASE_URL = "https://api.muktihospital.com/api/auth"; // Backend URL

// Send OTP function
export const sendOtp = async (mobile) => {

  
  if (!mobile) {
    console.error("No mobile provided to sendOtp");
    throw new Error("Mobile number is required");
  }
  
  try {
    // Ensure mobile is a string
    const mobileNumber = typeof mobile === 'object' ? mobile.mobile : mobile;
    

    const response = await axios.post(
      `${API_BASE_URL}/send-otp`,
      { mobileNumber },
      { headers: { "Content-Type": "application/json" } }
    );
   
    return response.data;
  } catch (error) {
    console.error("Full API Error:", error);
    
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
      throw new Error(
        error.response.data?.error || error.response.data?.message || `API error: ${error.response.status}`
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

// Login user with OTP
export const loginUser = async (data) => {
  // data: { mobile, otp }
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error.response?.data?.error || error.response?.data?.message || "Login failed.");
  }
};

// Register user with OTP
export const registerUser = async (data) => {
  // data: { name, mobile, otp }
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, data, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle 500 error by attempting login (user might already be registered)
    if (error.response?.status === 500) {
      try {
        console.warn("Attempting login due to 500 error during registration");
        const loginResponse = await loginUser({
          mobile: data.mobile,
          otp: data.otp,
        });
        return loginResponse; // Return login response if successful
      } catch (loginError) {
        console.error("Login attempt after registration failed:", loginError);
        throw new Error(loginError.response?.data?.error || loginError.response?.data?.message || "Registration and login failed.");
      }
    }
    
    // Throw other errors
    throw new Error(error.response?.data?.error || error.response?.data?.message || "Registration failed.");
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login";
};

// Get user profile (optional)
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