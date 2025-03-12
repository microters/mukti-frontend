"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const ResetPassword = ({ params }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const { token } = params;  // Get token from the URL

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://api.muktihospital.com/api/forgot-password/reset-password/${token}`,
        { password }
      );
      setSuccessMessage(response.data.message);
      setTimeout(() => {
        router.push("/signin"); // Redirect to login after success
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-md w-full p-5 border rounded-md shadow-lg">
        <h1 className="text-xl font-bold text-center">Reset Password</h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md mt-1"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium">Confirm New Password</label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-3 py-2 border rounded-md mt-1"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
