"use client"; // Ensure this is treated as a Client Component

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify"; // Importing Toastify components
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

// Dynamically import react-cookie-consent so it's only available on the client-side
const CookieConsent = dynamic(() => import("react-cookie-consent"), { ssr: false });

const CookieConsentClient = () => {
  // Function to trigger the toast notification when the user accepts cookies
  const handleAcceptCookies = () => {
    toast.success("Cookie Settings Success", {
      position: "top-right",
      autoClose: 3000, // Close the toast after 3 seconds
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Allow cookies"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150} // Cookie expiration in days
        onAccept={handleAcceptCookies} // Trigger the toast when the user accepts cookies
      >
        We use cookies to improve service and keep private data safe.{" "}
        <a href="/privacy-policy" className="text-M-secondary-color">
          Read our cookie policy
        </a>
      </CookieConsent>
      <ToastContainer /> {/* Render the ToastContainer for the toast notifications */}
    </>
  );
};

export default CookieConsentClient;
