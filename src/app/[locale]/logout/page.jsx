"use client";
import React, { useEffect } from 'react';

const LogoutPage = () => {
  useEffect(() => {
    // একটি ডেমো ডিলে যোগ করা হলো যাতে অ্যানিমেশনটি দেখা যায়
    // প্রোডাকশনে এই setTimeout না রাখলেও চলবে
    const timer = setTimeout(() => {
      // ১. লোকাল স্টোরেজ থেকে টোকেন মুছে ফেলা
      localStorage.removeItem('authToken');
      console.log('Logged out. Redirecting to sign-in page...');

      // ২. সাইন-ইন পেজে পাঠিয়ে দেওয়া
      window.location.href = '/signin';
    }, 1500); // ১.৫ সেকেন্ড পর রিডাইরেক্ট হবে

    return () => clearTimeout(timer); // কম্পোনেন্ট আনমাউন্ট হলে টাইমার ক্লিয়ার হবে
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-12 bg-white rounded-xl shadow-lg max-w-md w-full">
        {/* Animated Spinner */}
        <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Signing you out
        </h1>
        
        {/* Subtext */}
        <p className="text-gray-500">
          Please wait while we securely end your session.
        </p>
      </div>
    </div>
  );
};

export default LogoutPage;