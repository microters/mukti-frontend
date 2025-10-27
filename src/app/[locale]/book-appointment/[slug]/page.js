"use client";
import CommonHero from "@/app/Component/UI/CommonHero";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParams, usePathname, useRouter } from "next/navigation";
import { fetchDoctorBySlug } from "@/app/api/doctor";
import { useAuth } from "../../utils/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendOtp, loginUser, registerUser } from "../../utils/api";
import { jsPDF } from 'jspdf';
import { AppointmentPrintLayout } from "@/app/Component/AppointmentPrintLayout";

const Appointment = () => {
  const params = useParams();
  const doctorSlug = params.slug;
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  const API_KEY = "caf56e69405fe970f918e99ce86a80fbf0a7d728cca687e8a433b817411a6079";
  const BASE_URL = "https://api.muktihospital.com/api" || "https://api.muktihospital.com/api";
  const IMG_URL = "https://api.muktihospital.com" || "https://api.muktihospital.com";

  const language = pathname.includes("/bn/") ? "bn" : "en";
  const [downloadFormat, setDownloadFormat] = useState('pdf');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [patientExists, setPatientExists] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const [value, setValue] = useState(null);
  const [appointmentId, setAppointmentId] = useState(null); 
  const [isPrinting, setIsPrinting] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
    age: user?.age || "",
    weight: user?.weight || "",
    address: user?.address || "",
    reason: "",
  });

  const translations = {
    stepLabels: language === "bn" 
      ? ["বিশেষত্ব", "তারিখ এবং সময়", "রোগীর তথ্য", "ভেরিফিকেশন", "নিশ্চিতকরণ"]
      : ["Specialty", "Date & Time", "Patient Info", "Verification", "Confirmation"],
    patientName: language === "bn" ? "রোগীর নাম" : "Patient's Name",
    phone: language === "bn" ? "ফোন" : "Phone",
    weight: language === "bn" ? "ওজন" : "Weight",
    age: language === "bn" ? "বয়স" : "Age",
    address: language === "bn" ? "ঠিকানা" : "Address",
    visitReason: language === "bn" ? "ভিজিটের কারণ" : "Reason for Visit",
    previous: language === "bn" ? "পূর্ববর্তী" : "Previous", 
    next: language === "bn" ? "পরবর্তী" : "Next",
    submit: language === "bn" ? "জমা দিন" : "Submit",
    submitting: language === "bn" ? "জমা হচ্ছে..." : "Submitting...",
    available: language === "bn" ? "উপলব্ধ সময়" : "Available",
    consultationFee: language === "bn" ? "পরামর্শ ফি" : "Consultation Fee",
    regularFee: language === "bn" ? "নিয়মিত ফি" : "Regular Fee",
    followUpFee: language === "bn" ? "ফলোআপ ফি" : "Follow Up Fee",
    selectDateTime: language === "bn" ? "তারিখ এবং সময় নির্বাচন করুন" : "Select Date & Time",
    bookingInfo: language === "bn" ? "বুকিং তথ্য" : "Booking Info",
    appointmentDate: language === "bn" ? "অ্যাপয়েন্টমেন্টের তারিখ" : "Appointment Date",
    availableFor: language === "bn" ? "অ্যাপয়েন্টমেন্টের জন্য উপলব্ধ" : "Available For Appointment",
    verification: language === "bn" ? "ভেরিফিকেশন" : "Verification",
    verifyPhone: language === "bn" ? "ফোন নম্বর যাচাইকরণ" : "Verify Phone Number",
    enterOtp: language === "bn" ? "আপনার ফোনে পাঠানো ওটিপি কোড লিখুন" : "Enter OTP code sent to your phone",
    resendOtp: language === "bn" ? "ওটিপি পুনরায় পাঠান" : "Resend OTP",
    sendOtp: language === "bn" ? "ওটিপি পাঠান" : "Send OTP",
    verifyOtp: language === "bn" ? "ওটিপি যাচাই করুন" : "Verify OTP",
    existingPatient: language === "bn" ? "আপনি একজন নিবন্ধিত রোগী। ওটিপি দিয়ে লগইন করুন।" : "You are a registered patient. Please login with OTP.",
    newPatient: language === "bn" ? "আপনি একজন নতুন রোগী। ওটিপি ভেরিফিকেশন সম্পূর্ণ করুন।" : "You are a new patient. Please complete OTP verification."
  };

  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!doctorSlug) return;
      try {
        setLoading(true);
        const doctorData = await fetchDoctorBySlug(doctorSlug, language);
        if (doctorData) {
          setDoctor(doctorData);
          setError(null);
        } else {
          setError("Doctor not found");
        }
      } catch (error) {
        console.error('Doctor fetch error:', error);
        setError("Error fetching doctor data");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorData();
  }, [doctorSlug, language]);

  const stepLabels = translations.stepLabels;
  const steps = Array.from({ length: stepLabels.length }, (_, index) => index + 1);

  // ✅ পরবর্তী স্টেপ - সব সমস্যা ঠিক করা
  const nextStep = async () => {
    if (currentStep === 2) {
      if (!value) {
        toast.error(language === "bn" ? "অনুগ্রহ করে একটি তারিখ নির্বাচন করুন" : "Please select a date first");
        return;
      }
      const selectedDayNumber = value.getDay();
      const doctorAvailableDays = scheduleWithDayNumbers
        .filter(item => item.startTime !== "Closed" && item.startTime !== "N/A" && item.endTime !== "Closed" && item.endTime !== "N/A")
        .map(item => item.dayNumber);
      if (!doctorAvailableDays.includes(selectedDayNumber)) {
        toast.error(language === "bn" ? "অনুগ্রহ করে একটি বৈধ তারিখ নির্বাচন করুন যেদিন ডাক্তার উপলব্ধ আছেন" : "Please select a valid date when the doctor is available");
        return;
      }
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3) {
      if (!formData.name.trim()) {
        toast.error(language === "bn" ? "রোগীর নাম দিন" : "Please enter patient name");
        return;
      }
      if (!formData.mobile.trim() || formData.mobile.length < 13) {
        toast.error(language === "bn" ? "সঠিক মোবাইল নম্বর দিন" : "Please enter a valid mobile number");
        return;
      }
      
      // ✅ ইউজার আগে থেকে লগিন আছে কিনা চেক
      if (user && user.id) {
        console.log('User already logged in:', user);
        setPatientId(user.id);
        setPatientExists(true);
        toast.success(language === "bn" ? "আপনি ইতিমধ্যে লগিন আছেন" : "You are already logged in");
        setCurrentStep(5); // সরাসরি confirmation এ যান
      } else {
        // নতুন বা পুরানো ইউজার চেক করে OTP পাঠান
        await checkPatientAndSendOTP();
      }
    } else if (currentStep < stepLabels.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "mobile") {
      value = value.replace(/\D/g, "");
      if (!value.startsWith("88")) {
        value = "88" + value;
      }
      if (value.length > 13) value = value.slice(0, 13);
      setIsValid(value.length === 13);
    }
    setFormData({ ...formData, [name]: value });
  };

//   const generateAppointmentText = (formData, doctor, value, selectedDay, language, appointmentId) => {
//     const appointmentDate = value.toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
//       weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
//     });
  
//     const formatTime = (time) => {
//       if (!time || typeof time !== "string" || !/^\d{2}:\d{2}$/.test(time)) return "N/A";
//       const [hours, minutes] = time.split(":");
//       const date = new Date();
//       date.setHours(+hours);
//       date.setMinutes(+minutes);
//       return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
//     };
  
//     const timeSlot = (selectedDay && selectedDay.startTime && selectedDay.endTime)
//       ? `${formatTime(selectedDay.startTime)} - ${formatTime(selectedDay.endTime)}`
//       : (language === "bn" ? "উপলব্ধ নয়" : "Not Available");
  
//     const doctorTranslations = doctor?.translations || {};
//     const name = doctorTranslations?.name || doctor?.name;
//     const department = doctorTranslations?.department || doctor?.department;
//     const academicQualification = doctorTranslations?.academicQualification || doctor?.academicQualification;
  
//     const referenceId = appointmentId || `MUKTI-${Date.now().toString().substring(7)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
  
//     if (language === "bn") {
//       return {
//         content: `
// অ্যাপয়েন্টমেন্ট বিবরণ
// ------------------
// হাসপাতাল: মুক্তি হাসপাতাল

// ডাক্তারের তথ্য:
// নাম: ${name}
// বিভাগ: ${department}
// যোগ্যতা: ${academicQualification}

// রোগীর তথ্য:
// নাম: ${formData.name}
// ফোন: ${formData.mobile}
// বয়স: ${formData.age || "উল্লেখ নেই"}
// ওজন: ${formData.weight || "উল্লেখ নেই"}
// ঠিকানা: ${formData.address || "উল্লেখ নেই"}
// ভিজিটের কারণ: ${formData.reason || "উল্লেখ নেই"}

// অ্যাপয়েন্টমেন্ট শেডিউল:
// তারিখ: ${appointmentDate}
// সময়: ${timeSlot}
// ফি: ${doctorTranslations?.appointmentFee || doctor?.regularFee || "1000"} টাকা

// নির্দেশনা:
// • অনুগ্রহ করে আপনার অ্যাপয়েন্টমেন্টের ১৫ মিনিট আগে পৌছান
// • সম্ভব হলে আগের মেডিকেল রেকর্ড নিয়ে আসুন
// • যেকোনো প্রশ্নের জন্য, যোগাযোগ করুন: +৮৮ ০২ XXXX XXXX

// রেফারেন্স আইডি: ${referenceId}
//         `,
//         referenceId
//       };
//     } else {
//       return {
//         content: `
// APPOINTMENT DETAILS
// ------------------
// Hospital: Mukti Hospital

// Doctor Information:
// Name: ${name}
// Department: ${department}
// Qualification: ${academicQualification}

// Patient Information:
// Name: ${formData.name}
// Phone: ${formData.mobile}
// Age: ${formData.age || "N/A"}
// Weight: ${formData.weight || "N/A"}
// Address: ${formData.address || "N/A"}
// Reason for Visit: ${formData.reason || "N/A"}

// Appointment Schedule:
// Date: ${appointmentDate}
// Time: ${timeSlot}
// Fee: ${doctorTranslations?.appointmentFee || doctor?.regularFee || "1000"} TK

// Instructions:
// • Please arrive 15 minutes before your appointment time
// • Bring any previous medical records if available
// • For any queries, contact: +88 02 XXXX XXXX

// Reference ID: ${referenceId}
//         `,
//         referenceId
//       };
//     }
//   };

  // const downloadAsText = (formData, doctor, value, selectedDay, language, appointmentId) => {
  //   const { content, referenceId } = generateAppointmentText(formData, doctor, value, selectedDay, language, appointmentId);
  //   const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = `Appointment_${formData.name.replace(/\s+/g, '_')}_${referenceId}.txt`;
  //   document.body.appendChild(a);
  //   a.click();
  //   setTimeout(() => {
  //     document.body.removeChild(a);
  //     URL.revokeObjectURL(url);
  //   }, 100);
  //   return referenceId;
  // };
  
  // const downloadAsPdf = async (formData, doctor, value, selectedDay, language, appointmentId) => {
  //   try {
  //     const { content, referenceId } = generateAppointmentText(formData, doctor, value, selectedDay, language, appointmentId);
  //     const pdf = new jsPDF();
  //     pdf.setFontSize(22);
  //     pdf.setTextColor(0, 51, 102);
  //     pdf.text("Mukti Hospital", 105, 20, { align: 'center' });
  //     pdf.setFontSize(12);
  //     pdf.setTextColor(0, 0, 0);
  
  //     const contentLines = content.split('\n');
  //     let y = 30;
  //     contentLines.forEach(line => {
  //       if (line.includes('------------------')) {
  //         pdf.setDrawColor(0, 51, 102);
  //         pdf.line(20, y, 190, y);
  //         y += 5;
  //       } else {
  //         pdf.text(line, 20, y);
  //         y += 6;
  //       }
  //     });
  
  //     pdf.text(`Reference ID: ${appointmentId}`, 10, 287);
  //     pdf.save(`Appointment_${formData.name.replace(/\s+/g, '_')}_${referenceId}.pdf`);
  //     return referenceId;
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //     return downloadAsText(formData, doctor, value, selectedDay, language, appointmentId);
  //   }
  // };

  useEffect(() => {
    const handleAfterPrint = () => {
      setIsPrinting(false);
      console.log("Print dialog closed.");
    };
    window.addEventListener('afterprint', handleAfterPrint);
    return () => window.removeEventListener('afterprint', handleAfterPrint);
  }, []); // Runs once

  const downloadAppointmentInfo = async (formData, doctor, value, selectedDay, language, format, appointmentRef) => {
    try {
      setIsDownloading(true);
      let referenceId;
      if (format === 'pdf') {
        referenceId = await downloadAsPdf(formData, doctor, value, selectedDay, language, appointmentRef);
      } else {
        referenceId = downloadAsText(formData, doctor, value, selectedDay, language, appointmentRef);
      }
      toast.success(language === "bn" ? "অ্যাপয়েন্টমেন্ট তথ্য ডাউনলোড হয়েছে" : "Appointment details downloaded successfully");
      return referenceId;
    } catch (error) {
      console.error("Download failed:", error);
      toast.error(language === "bn" ? "ডাউনলোড ব্যর্থ হয়েছে, আবার চেষ্টা করুন" : "Download failed, please try again");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleOtpChange = (e) => {
    setOtpCode(e.target.value);
  };

  // ✅ রোগী চেক এবং OTP পাঠানো - সব সমস্যা ঠিক
  const checkPatientAndSendOTP = async () => {
    if (!validateBasicPatientInfo()) return;
    
    try {
      setSubmitting(true);
      setError(null);
      
      let cleanedMobile = formData.mobile.trim();
      if (!cleanedMobile.startsWith("88")) {
        cleanedMobile = "88" + cleanedMobile.replace(/^88/, "");
      }
      
      console.log('Checking patient with mobile:', cleanedMobile);
      
      // রোগী আগে থেকে আছে কিনা চেক
      try {
        const res = await axios.get(`${BASE_URL}/patient`, { 
          headers: { "x-api-key": API_KEY } 
        });
        
        const existingPatient = res.data.find(patient => 
          patient.phoneNumber === cleanedMobile || 
          patient.mobile === cleanedMobile ||
          patient.phone === cleanedMobile // অতিরিক্ত ফিল্ড চেক
        );
        
        if (existingPatient) {
          console.log('Existing patient found:', existingPatient);
          setPatientExists(true);
          setPatientId(existingPatient.id);
          toast.info(translations.existingPatient, {
            autoClose: 4000,
            style: { backgroundColor: '#e3f2fd', color: '#1976d2' }
          });
        } else {
          console.log('New patient');
          setPatientExists(false);
          setPatientId(null);
          toast.info(translations.newPatient, {
            autoClose: 4000,
            style: { backgroundColor: '#f3e5f5', color: '#7b1fa2' }
          });
        }
      } catch (patientError) {
        console.log('Patient check error (treating as new):', patientError);
        setPatientExists(false);
        setPatientId(null);
        toast.info(translations.newPatient);
      }
      
      // OTP পাঠান
      console.log('Sending OTP to:', cleanedMobile);
      const result = await sendOtp(cleanedMobile);
      console.log('OTP send result:', result);
      
      if (result) {
        setIsOtpSent(true);
        toast.success(
          language === "bn" 
            ? `${cleanedMobile} নম্বরে ওটিপি পাঠানো হয়েছে` 
            : `OTP has been sent to ${cleanedMobile}`,
          { autoClose: 5000 }
        );
        setCurrentStep(4);
      } else {
        throw new Error(language === "bn" ? "ওটিপি পাঠাতে সমস্যা হয়েছে" : "Failed to send OTP");
      }
      
    } catch (error) {
      console.error('checkPatientAndSendOTP error:', error);
      const errorMessage = error.message || (language === "bn" ? "ওটিপি পাঠাতে সমস্যা হয়েছে" : "Failed to send OTP");
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      let cleanedMobile = formData.mobile.trim();
      if (!cleanedMobile.startsWith("88")) cleanedMobile = "88" + cleanedMobile.replace(/^88/, "");
      
      console.log('Resending OTP to:', cleanedMobile);
      const result = await sendOtp(cleanedMobile);
      
      if (result) {
        toast.success(language === "bn" ? "ওটিপি পুনরায় পাঠানো হয়েছে" : "OTP has been resent");
      } else {
        throw new Error("Failed to resend OTP");
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error(error.message || "Failed to resend OTP");
    }
  };

  // ✅ OTP যাচাই - সব সমস্যা ঠিক করা হয়েছে
  const verifyOtp = async () => {
    if (!otpCode || otpCode.length < 4) {
      toast.error(language === "bn" ? "সঠিক ওটিপি দিন" : "Please enter a valid OTP");
      return;
    }
    
    try {
      setVerifyingOtp(true);
      setError(null);
      
      let cleanedMobile = formData.mobile.trim();
      if (!cleanedMobile.startsWith("88")) {
        cleanedMobile = "88" + cleanedMobile;
      }
      
      console.log('Verifying OTP for mobile:', cleanedMobile);
      console.log('Patient exists:', patientExists);
      console.log('OTP Code:', otpCode);
      
      if (patientExists) {
        // ✅ পুরানো ইউজারের জন্য লগিন
        const loginData = { 
          mobile: cleanedMobile, 
          otp: otpCode 
        };
        
        console.log('Attempting login with:', loginData);
        const response = await loginUser(loginData);
        console.log('Login response:', response);
        
        if (response && response.user) {
          // ✅ সঠিকভাবে patient ID সেট করা
          const userId = response.user.id || response.user._id || response.user.patientId;
          console.log('Setting patient ID:', userId);
          
          if (userId) {
            setPatientId(userId);
            toast.success(
              language === "bn" 
                ? "সফলভাবে লগিন হয়েছেন! এপয়েন্টমেন্ট নিশ্চিত করুন।" 
                : "Login successful! Please confirm your appointment.",
              { 
                autoClose: 3000, 
                style: { backgroundColor: '#e8f5e8', color: '#2e7d32' } 
              }
            );
            setCurrentStep(5);
          } else {
            throw new Error(language === "bn" ? "ইউজার আইডি পাওয়া যায়নি" : "User ID not found");
          }
        } else {
          throw new Error(language === "bn" ? "লগিন ব্যর্থ, অবৈধ ওটিপি" : "Login failed, invalid OTP");
        }
        
      } else {
        // ✅ নতুন ইউজারের জন্য রেজিস্ট্রেশন
        const registerData = { 
          name: formData.name, 
          mobile: cleanedMobile, 
          otp: otpCode,
          age: formData.age || "",
          address: formData.address || "",
          weight: formData.weight || ""
        };
        
        console.log('Attempting registration with:', registerData);
        const response = await registerUser(registerData);
        console.log('Registration response:', response);
        
        if (response && response.user) {
          // ✅ সঠিকভাবে patient ID সেট করা
          const userId = response.user.id || response.user._id || response.user.patientId;
          console.log('Setting new patient ID:', userId);
          
          if (userId) {
            setPatientId(userId);
            toast.success(
              language === "bn" 
                ? "সফলভাবে রেজিস্টার হয়েছেন! এপয়েন্টমেন্ট নিশ্চিত করুন।" 
                : "Registration successful! Please confirm your appointment.",
              { 
                autoClose: 3000, 
                style: { backgroundColor: '#e8f5e8', color: '#2e7d32' } 
              }
            );
            setCurrentStep(5);
          } else {
            throw new Error(language === "bn" ? "রেজিস্ট্রেশন সফল কিন্তু ইউজার আইডি পাওয়া যায়নি" : "Registration successful but user ID not found");
          }
        } else {
          throw new Error(language === "bn" ? "রেজিস্ট্রেশন ব্যর্থ, অবৈধ ওটিপি" : "Registration failed, invalid OTP");
        }
      }
      
    } catch (err) {
      console.error('OTP verification error:', err);
      const errorMessage = err.message || 
        (language === "bn" ? "ওটিপি যাচাইয়ে সমস্যা হয়েছে" : "Error verifying OTP");
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setVerifyingOtp(false);
    }
  };

  const validateBasicPatientInfo = () => {
    if (!formData.name?.trim()) {
      toast.error(language === "bn" ? "রোগীর নাম দিন" : "Please enter patient name");
      return false;
    }
    if (!formData.mobile?.trim() || formData.mobile.length < 13) {
      toast.error(language === "bn" ? "সঠিক মোবাইল নম্বর দিন" : "Please enter a valid mobile number");
      return false;
    }
    return true;
  };

  const validateForm = () => {
    if (!validateBasicPatientInfo()) return false;
    if (!value) {
      toast.error(language === "bn" ? "অ্যাপয়েন্টমেন্টের তারিখ নির্বাচন করুন" : "Please select an appointment date");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (currentStep !== 5) return; // Only allow submission from Step 5

    if (!validateForm()) return;

    if (!patientId) {
      toast.error(language === "bn" ? "যাচাইকরণ প্রয়োজন" : "Verification required");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    let cleanedMobile = formData.mobile.trim();
    if (!cleanedMobile.startsWith("88")) cleanedMobile = "88" + cleanedMobile;

    try {
      const selectedDayNumber = value.getDay();
      const selectedDay = doctor.schedule?.find(item =>
        (item.dayNumber !== undefined ? item.dayNumber : dayMap[item.day]) === selectedDayNumber
      );
      const formatTime = (time) => {
        if (!time || !/^([01]?\d|2[0-3]):([0-5]\d)$/.test(time)) return time;
        return new Date(`2025-01-01T${time}:00`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      };
      const timeSlot = selectedDay ? `${formatTime(selectedDay.startTime)} - ${formatTime(selectedDay.endTime)}` : null;

      const payload = {
        doctorId: doctor?.id,
        doctorName: doctor?.translations?.name || doctor?.name,
        doctorSlug,
        appointmentDate: value,
        patientName: formData.name,
        mobileNumber: cleanedMobile,
        age: formData.age,
        weight: formData.weight,
        address: formData.address,
        reason: formData.reason,
        timeSlot: timeSlot,
        scheduleId: selectedDay?.id || null,
        consultationFee: doctor?.regularFee || null,
        paymentMethod: null,
        serialNumber: null,
        reference: null,
        bloodGroup: null,
        isNewPatient: !patientExists,
        patientId: patientId,
      };

      const response = await axios.post(`${BASE_URL}/appointment/add`, payload, {
        headers: { "x-api-key": API_KEY },
      });

      const successMessage = language === "bn" ? "অ্যাপয়েন্টমেন্ট সফলভাবে বুক করা হয়েছে!" : "Appointment booked successfully!";
      setSuccess(successMessage);
      toast.success(successMessage);

      // Download happens only after successful submission
      await downloadAppointmentInfo(formData, doctor, value, selectedDay, language, downloadFormat, null);

    } catch (error) {
      const errorMessage = error.response?.data?.message || (language === "bn" ? "অ্যাপয়েন্টমেন্ট বুক করতে সমস্যা হয়েছে।" : "Failed to book appointment.");
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-M-primary-color"></div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50 p-5">
        <Icon icon="ph:warning-circle" className="text-red-500 text-4xl mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {language === "bn" ? "ডাক্তার পাওয়া যায়নি" : "Doctor Not Found"}
        </h2>
        <p className="text-gray-600 mb-6">
          {language === "bn" ? "দুঃখিত, আপনি যে ডাক্তারের সন্ধান করছেন তিনি পাওয়া যায়নি।" : "Sorry, the doctor you are looking for is not available."}
        </p>
        <Link href={`/${language === "bn" ? "bn/" : ""}doctors`} className="bg-M-primary-color text-white px-4 py-2 rounded-md">
          {language === "bn" ? "সকল ডাক্তার দেখুন" : "See All Doctors"}
        </Link>
      </div>
    );
  }

  const doctorData = doctor.schedule || [];
  const dayMap = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
  const scheduleWithDayNumbers = doctorData.map(item => ({
    ...item,
    dayNumber: item.dayNumber !== undefined ? item.dayNumber : dayMap[item.day] || 0,
  }));
  const disabledDays = Array.from(Array(7).keys()).filter(day =>
    !scheduleWithDayNumbers.some(item => item.dayNumber === day && item.startTime !== "Closed" && item.startTime !== "N/A")
  );

  const doctorTranslations = doctor?.translations || {};
  const name = doctorTranslations?.name || doctor?.name;
  const department = doctorTranslations?.department || doctor?.department;
  const academicQualification = doctorTranslations?.academicQualification || doctor?.academicQualification;
  const experience = doctorTranslations?.yearsOfExperience || doctor?.experience || "4";
  const doctorImage = doctor?.icon ? `${IMG_URL}${doctor.icon}` : "/default-profile-photo.png";

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <CommonHero pageName={language === "bn" ? "অ্যাপয়েন্টমেন্ট" : "Appointment"} />
      
      {success && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">{language === "bn" ? "সফল!" : "Success!"}</strong>
            <span className="block sm:inline ml-1">{success}</span>
          </div>
        </div>
      )}
      
      {error && !loading && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">{language === "bn" ? "ত্রুটি!" : "Error!"}</strong>
            <span className="block sm:inline ml-1">{error}</span>
          </div>
        </div>
      )}
      
      <form onSubmit={(e) => e.preventDefault()} className="container mx-auto px-4 md:px-0 my-24">
        <div className="bg-slate-100 p-5 md:p-10 mt-10 rounded-xl border border-M-text-color/20">
          <div className="flex flex-wrap justify-between items-center gap-2 mb-10 relative">
            {steps.map((step) => (
              <div
                key={step}
                className={`flex flex-col items-center relative lg:before:w-16 xl:before:w-24 before:h-[1px] before:absolute before:border before:border-dashed before:top-1/2 before:-translate-y-1/2 lg:before:-right-24 xl:before:-right-36 last:before:hidden ${step < currentStep ? "before:bg-M-text-color" : "before:bg-M-text-color/10"}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-jost font-bold text-lg ${step === currentStep ? "bg-M-primary-color text-white" : step < currentStep ? "bg-M-primary-color text-white" : "bg-slate-300 text-white"}`}
                >
                  {step}
                </div>
                <div
                  className={`mt-2 text-base font-jost font-medium ${step === currentStep ? "text-M-heading-color" : step < currentStep ? "text-M-heading-color" : "text-slate-300"}`}
                >
                  {stepLabels[step - 1]}
                </div>
              </div>
            ))}
          </div>

          <div>
            {currentStep === 1 && (
              <div className="mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 items-center gap-6 bg-white p-6 rounded-md">
                  <div className="w-full h-32 max-w-32 rounded-full overflow-hidden border-2 border-M-primary-color">
                    <Image src={doctorImage} width={100} height={100} alt="doctor image" className="w-full" />
                  </div>
                  <div className="md:col-span-2">
                    <ul className="flex flex-wrap items-center gap-4 mb-5">
                      <li className="border-2 border-[#00224F50] inline-block w-auto rounded-md py-2 px-4 text-M-primary-color text-base font-jost font-normal">{department}</li>
                      <li className="bg-[#323290] inline-flex items-center gap-1 rounded-md py-2 px-4 font-jost font-normal text-base text-white">
                        <Icon icon="icon-park-outline:hospital-three" width="16" height="16" className="text-white" />
                        {experience || "4"} {language === "bn" ? "বছর" : "Years"}
                      </li>
                    </ul>
                    <h3 className="text-[#323290] text-lg font-jost font-bold mb-4">
                      <Link href={`/${language === "bn" ? "bn/" : ""}doctor/${doctorSlug}`} prefetch={true} className="hover:text-M-primary-color transition-all duration-300 capitalize">{name}</Link>
                    </h3>
                    <p className="text-M-text-color text-base font-normal font-jost flex items-start gap-2">
                      <Icon icon="oui:index-open" width="24" className="text-M-heading-color shrink-0 relative top-[2px]" />
                      {academicQualification}
                    </p>
                    <p className="text-M-text-color text-base font-normal font-jost flex items-center gap-2 mt-2 capitalize">
                      <Icon icon="mdi:location-on-outline" width="24" className="text-M-heading-color" /> Mukti Hospital
                    </p>
                  </div>
                  <div className="text-left sm:text-center flex gap-3 justify-between sm:block sm:space-y-2">
                    <div>
                      <Icon icon="lucide:alarm-clock" width="24" height="24" className="text-M-primary-color sm:mx-auto" />
                      <h4 className="text-[#323290] text-base sm:text-lg font-jost font-bold mb-2">{translations.available}</h4>
                    </div>
                    {doctorData && doctorData.length > 0 ? (
                      <div className="font-jost text-base text-M-text-color">
                        <div>
                          {(() => {
                            const sortedSchedule = [...doctorData].sort((a, b) => (a.dayNumber || dayMap[a.day]) - (b.dayNumber || dayMap[b.day]));
                            const firstDay = sortedSchedule[0];
                            const lastDay = sortedSchedule[sortedSchedule.length - 1];
                            const formatTime = (time) => {
                              if (!time || !/^([01]?\d|2[0-3]):([0-5]\d)$/.test(time)) return time;
                              return new Date(`2025-01-01T${time}:00`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                            };
                            const dayNames = sortedSchedule.map(item => item.day);
                            let dayRangeText = dayNames.length === 1 ? dayNames[0] : dayNames.length === 2 ? `${dayNames[0]} & ${dayNames[1]}` : `${dayNames[0]} - ${dayNames[dayNames.length - 1]}`;
                            return (
                              <>
                                <p className="font-jost text-base font-medium text-M-primary-color">{dayRangeText}</p>
                                <p className="font-jost text-base text-M-text-color mt-1">{formatTime(firstDay?.startTime)} - {formatTime(firstDay?.endTime)}</p>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="font-jost text-sm sm:text-base text-M-text-color">{doctor?.availableDays || "Friday - Monday"}</p>
                        <p className="font-jost text-base text-M-text-color">{doctor?.availableHours || "12:00 AM - 03:00 PM"}</p>
                      </div>
                    )}
                  </div>
                  <div className="text-left sm:text-center flex gap-3 justify-between sm:block sm:space-y-2">
                    <div>
                      <Icon icon="majesticons:bookmark-plus" width="24" height="24" className="sm:mx-auto text-M-primary-color" />
                      <h4 className="text-[#323290] text-base sm:text-lg font-jost font-bold mb-2">{translations.consultationFee}</h4>
                    </div>
                    <div>
                      <p className="font-jost text-sm sm:text-base text-M-text-color">{translations.regularFee}: {doctorTranslations?.appointmentFee || doctor?.regularFee || "1000"}TK</p>
                      <p className="font-jost text-sm sm:text-base text-M-text-color">{translations.followUpFee}: {doctorTranslations?.followUpFee || doctor?.followUpFee || "800"}TK</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="mb-10">
                <div className="rounded-md bg-white">
                  <h3 className="border-b border-M-text-color/20 p-7 pb-5 text-xl">{translations.selectDateTime}</h3>
                  <div className="p-7 block lg:flex gap-7 space-y-5 lg:space-y-5">
                    <div className="shrink-0">
                      <div className="mb-3 text-center">
                        <span className="text-M-primary-color font-medium">
                          {language === "bn" ? "দয়া করে ডাক্তারের উপলব্ধ দিনগুলি থেকে একটি তারিখ নির্বাচন করুন" : "Please select a date from doctor's available days"}
                        </span>
                      </div>
                      <Calendar
                        onChange={setValue}
                        value={value}
                        minDate={new Date()}
                        tileDisabled={({ date, view }) => view === "month" && disabledDays.includes(date.getDay())}
                        tileClassName={({ date, view }) => view === 'month' && !disabledDays.includes(date.getDay()) ? 'bg-green-50 hover:bg-green-100' : 'text-gray-400 line-through'}
                      />
                      {value ? (
                        <div className="mt-4 p-3 border border-dashed rounded-md border-M-primary-color bg-blue-50">
                          <h4 className="text-center font-medium mb-1 text-M-primary-color">{language === "bn" ? "নির্বাচিত তারিখ" : "Selected Date"}</h4>
                          <p className="text-center text-gray-700 font-medium">
                            {value.toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                          <div className={`mt-2 text-center ${!disabledDays.includes(value.getDay()) ? 'text-green-600' : 'text-red-600'}`}>
                            <span className="inline-flex items-center gap-1">
                              {!disabledDays.includes(value.getDay()) ? (
                                <>
                                  <Icon icon="mdi:check-circle" width="18" />
                                  {language === "bn" ? "ডাক্তার এই দিনে উপলব্ধ আছেন" : "Doctor is available on this day"}
                                </>
                              ) : (
                                <>
                                  <Icon icon="mdi:close-circle" width="18" />
                                  {language === "bn" ? "ডাক্তার এই দিনে উপলব্ধ নেই" : "Doctor is not available on this day"}
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 p-3 border border-dashed rounded-md border-red-200 bg-red-50">
                          <p className="text-center text-red-600 font-medium">{language === "bn" ? "দয়া করে ক্যালেন্ডার থেকে একটি তারিখ নির্বাচন করুন" : "Please select a date from the calendar"}</p>
                        </div>
                      )}
                    </div>
                    <div className="w-full rounded-md border border-M-text-color/20 p-5">
                      <h3 className="text-M-heading-color text-xl font-semibold text-center mb-4">{translations.availableFor}</h3>
                      <div>
                        <ul className="grid grid-cols-2 gap-3">
                          {scheduleWithDayNumbers.map((item, index) => {
                            const convertTo12HourFormat = (time) => {
                              if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) return time;
                              return new Date(`2025-01-01T${time}:00`).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
                            };
                            const dayShortForm = { Sunday: "Sun", Monday: "Mon", Tuesday: "Tue", Wednesday: "Wed", Thursday: "Thu", Friday: "Fri", Saturday: "Sat" };
                            const shortDay = dayShortForm[item.day] || item.day;
                            const isValidTime = /^([01]\d|2[0-3]):([0-5]\d)$/.test(item.startTime) && /^([01]\d|2[0-3]):([0-5]\d)$/.test(item.endTime);
                            const isSelectedDay = value ? value.getDay() === item.dayNumber : false;
                            return (
                              <li
                                key={index}
                                className={`text-sm md:text-base p-3 border ${isSelectedDay ? 'border-M-primary-color border-2' : 'border-M-heading-color/20'} inline-flex flex-wrap justify-center gap-2 rounded font-jost w-full text-center uppercase ${isValidTime ? (isSelectedDay ? "bg-M-primary-color/10" : "bg-M-text-color/10") : "border-red-500 bg-M-secondary-color text-white"}`}
                              >
                                <strong>{shortDay}: </strong>
                                {isValidTime ? `${convertTo12HourFormat(item.startTime)} - ${convertTo12HourFormat(item.endTime)}` : convertTo12HourFormat(item.startTime) || convertTo12HourFormat(item.endTime)}
                                {isSelectedDay && (
                                  <span className="w-full text-M-primary-color text-xs mt-1">{language === "bn" ? "✓ নির্বাচিত" : "✓ Selected"}</span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="mb-10">
                <div className="rounded-md bg-white">
                  <h3 className="border-b border-M-text-color/20 p-7 pb-5 text-xl">{translations.stepLabels[2]}</h3>
                  <div className="p-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-3 mb-7">
                      <div>
                        <label htmlFor="name" className="font-jost font-medium text-base text-M-text-color mb-1 block">{translations.patientName} <span className="text-M-secondary-color">*</span></label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="inputField" />
                      </div>
                      <div>
                        <label htmlFor="mobile" className="font-jost font-medium text-base text-M-text-color mb-1 block">{translations.phone} <span className="text-M-secondary-color">*</span></label>
                        <div className="mt-1 relative flex items-center">
                          <div className="absolute left-3 top-[14px] flex items-center space-x-1">
                            <Icon icon="twemoji:flag-bangladesh" width="18" height="18" />
                            <span className="text-black font-medium relative -top-[1px]">+</span>
                          </div>
                          <input
                            type="tel"
                            name="mobile"
                            id="mobile"
                            autoComplete="tel"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="8801XXXXXXXX"
                            className="h-[48px] border w-full rounded-md focus:outline-none border-M-text-color/20 text-black transition-all duration-300 ring-0 ring-M-primary-color focus:ring-1 px-3 py-2 pl-12"
                            maxLength="13"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="weight" className="font-jost font-medium text-base text-M-text-color mb-1 block">{translations.weight}<span className="text-yellow-800">(Optional)</span></label>
                        <input type="text" id="weight" name="weight" value={formData.weight} onChange={handleChange} className="inputField" />
                      </div>
                      <div>
                        <label htmlFor="age" className="font-jost font-medium text-base text-M-text-color mb-1 block">{translations.age}<span className="text-yellow-800">(Optional)</span></label>
                        <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} className="inputField" />
                      </div>
                      <div>
                        <label htmlFor="address" className="font-jost font-medium text-base text-M-text-color mb-1 block">{translations.address}<span className="text-yellow-800">(Optional)</span></label>
                        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="inputField" />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="reason" className="font-jost font-medium text-base text-M-text-color mb-1 block">{translations.visitReason}<span className="text-yellow-800">(Optional)</span></label>
                        <textarea name="reason" id="reason" rows={5} value={formData.reason} onChange={handleChange} className="textAreaFiled"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 4 && (
              <div className="mb-10">
                <div className="rounded-md bg-white">
                  <h3 className="border-b border-M-text-color/20 p-7 pb-5 text-xl">{translations.verification}</h3>
                  <div className="p-7">
                    <div className="max-w-[600px] mx-auto">
                      <div className="text-center mb-6">
                        <Icon icon="ic:baseline-verified-user" className="text-5xl text-M-primary-color mx-auto mb-3" />
                        <h4 className="text-xl font-bold mb-2">{translations.verifyPhone}</h4>
                        <p className="text-gray-600">{patientExists ? translations.existingPatient : translations.newPatient}</p>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="otp" className="font-medium mb-2 block text-center">{translations.enterOtp}</label>
                        <div className="flex justify-center">
                          <input
                            type="text"
                            id="otp"
                            name="otp"
                            value={otpCode}
                            onChange={handleOtpChange}
                            className="w-full max-w-[200px] h-16 text-center text-2xl font-bold border-2 border-M-primary-color/50 rounded-md focus:outline-none focus:border-M-primary-color"
                            maxLength={6}
                            autoComplete="one-time-code"
                          />
                        </div>
                      </div>
                      <div className="flex justify-center space-x-4">
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          disabled={verifyingOtp}
                          className="px-4 py-2 bg-white border border-M-primary-color text-M-primary-color rounded-md hover:bg-M-primary-color/10 transition-all"
                        >
                          {translations.resendOtp}
                        </button>
                        <button
                          type="button"
                          onClick={verifyOtp}
                          disabled={verifyingOtp || !otpCode.trim()}
                          className="px-4 py-2 bg-M-primary-color text-white rounded-md hover:bg-M-primary-color/90 transition-all disabled:opacity-50"
                        >
                          {verifyingOtp ? (
                            <span className="flex items-center">
                              <Icon icon="eos-icons:loading" className="animate-spin mr-2" />
                              {language === "bn" ? "যাচাই করা হচ্ছে..." : "Verifying..."}
                            </span>
                          ) : translations.verifyOtp}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 5 && (
        <div className="mb-10">
          <div className="rounded-md bg-white">
            <h3 className="border-b border-M-text-color/20 p-7 pb-5 text-xl flex justify-between items-center">
              {translations.stepLabels[4]}
            </h3>
            <div className="p-7">
              
              {/* --- TERNARY OPERATOR FOR SUCCESS --- */}
              {!success ? (
                // --- ORIGINAL VIEW: Review before submit ---
                <div className="max-w-[720px] mx-auto w-full">
                  <div className="border border-M-text-color/20 rounded-md">
                    <div className="px-5 py-3 border-b border-M-text-color/20">
                      <h4 className="text-lg text-M-heading-color mb-2">{translations.bookingInfo}</h4>
                      <p className="font-jost">
                        {language === "bn" 
                          ? `${doctor?.translations?.name || doctor?.name} এর সাথে আপনার অ্যাপয়েন্টমেন্ট নিশ্চিত করতে নিচের সাবমিট বাটনে ক্লিক করুন।` 
                          : `Click the submit button below to confirm your booking with ${doctor?.translations?.name || doctor?.name}.`
                        }
                      </p>
                    </div>
                    <div className="px-5 py-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                      {/* Patient Name */}
                      <div>
                        <h5 className="text-M-heading-color text-lg font-bold font-jost">{translations.patientName}</h5>
                        <p className="text-M-text-color text-base font-jost">{formData.name || "N/A"}</p>
                      </div>
                      {/* Age */}
                      <div>
                        <h5 className="text-M-heading-color text-lg font-bold font-jost">{translations.age}</h5>
                        <p className="text-M-text-color text-base font-jost">{formData.age || "N/A"}</p>
                      </div>
                      {/* Phone */}
                      <div>
                        <h5 className="text-M-heading-color text-lg font-bold font-jost">{translations.phone}</h5>
                        <p className="text-M-text-color text-base font-jost">{formData.mobile || "N/A"}</p>
                      </div>
                      {/* Department */}
                      <div>
                        <h5 className="text-M-heading-color text-lg font-bold font-jost">{language === "bn" ? "বিভাগ" : "Department"}</h5>
                        <p className="text-M-text-color text-base font-jost">{doctor?.translations?.department || "N/A"}</p>
                      </div>
                      {/* Address */}
                      <div>
                        <h5 className="text-M-heading-color text-lg font-bold font-jost">{translations.address}</h5>
                        <p className="text-M-text-color text-base font-jost">{formData.address || "N/A"}</p>
                      </div>
                      {/* Reason */}
                      <div>
                        <h5 className="text-M-heading-color text-lg font-bold font-jost">{language === "bn" ? "কারণ" : "Reason"}</h5>
                        <p className="text-M-text-color text-base font-jost">{formData.reason || "N/A"}</p>
                      </div>
                      {/* Date */}
                      <div>
                        <h5 className="text-M-heading-color text-lg font-bold font-jost">{translations.appointmentDate}</h5>
                        <p className="text-M-text-color text-base font-jost">
                          {value?.toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) || "N/A"}
                        </p>
                      </div>
                      {/* Time */}
                      <div>
                        <h5 className="text-M-heading-color text-lg font-bold font-jost">{language === "bn" ? "সময়" : "Time"}</h5>
                        <p className="text-M-text-color text-base font-jost">
                          {(() => {
                            if (!value) return "N/A";
                            const selectedDayNumber = value.getDay();
                            const selectedDay = scheduleWithDayNumbers.find(item => item.dayNumber === selectedDayNumber);
                            if (!selectedDay) return "N/A";
                            const formatTime = (time) => {
                              if (!time || !/^([01]?\d|2[0-3]):([0-5]\d)$/.test(time)) return time;
                              return new Date(`2025-01-01T${time}:00`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                            };
                            return `${formatTime(selectedDay.startTime)} - ${formatTime(selectedDay.endTime)}`;
                          })()}
                        </p>
                      </div>
                    </div>
                    {/* ... (rest of the review info) ... */}
                  </div>
                </div>
              ) : (
                // --- NEW VIEW: Success message and print button ---
                <div className="text-center p-8">
                  <Icon icon="clarity:success-standard-line" className="text-6xl text-green-500 mx-auto" />
                  <h2 className="text-2xl font-bold mt-4">
                    {language === "bn" ? "অ্যাপয়েন্টমেন্ট সফল হয়েছে!" : "Appointment Confirmed!"}
                  </h2>
                  <p className="mt-2 text-gray-600">
                    {language === "bn" 
                      ? `আপনার অ্যাপয়েন্টমেন্ট আইডি: ${appointmentId || 'N/A'}` 
                      : `Your Appointment ID: ${appointmentId || 'N/A'}`
                    }
                  </p>
                  
                  <div className="mt-6 flex justify-center gap-4">
                     <button
                       type="button" // Important: not submit
                       onClick={downloadAppointmentInfo} // Call new print function
                       disabled={isDownloading}
                       className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all disabled:opacity-50"
                     >
                       {isDownloading ? (language === "bn" ? "প্রস্তুত হচ্ছে..." : "Preparing...")
                         : (language === "bn" ? "স্লিপ প্রিন্ট/ডাউনলোড করুন" : "Print / Download Slip")
                       }
                     </button>
                     <Link href="/" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-all">
                       {language === "bn" ? "হোমে যান" : "Go Home"}
                     </Link>
                  </div>
                </div>
              )}
              {/* --- END TERNARY --- */}
            </div>
          </div>
        </div>
      )}
          </div>

          <div className="flex justify-between border-t border-M-text-color/10 pt-8">
            {currentStep > 1 && !success && (
    <button
      type="button"
      onClick={prevStep}
      className="flex items-center justify-center px-4 py-3 bg-M-heading-color text-white rounded hover:bg-M-heading-color font-jost font-medium text-base min-w-24 uppercase disabled:opacity-50"
      disabled={submitting || verifyingOtp || isDownloading} // Disable during any loading
    >
      <Icon icon="mynaui:chevron-left" width="24" height="24" />
      {translations.previous}
    </button>
  )}

  {/* --- 2. NEXT BUTTON --- */}
  {/* Show ONLY on steps 1, 2, and 3 */}
  {currentStep < 4 && (
    <button
      type="button"
      onClick={nextStep}
      className="ml-auto flex items-center justify-center px-4 py-3 bg-M-primary-color text-white rounded hover:bg-M-primary-color font-jost font-medium text-base min-w-24 uppercase disabled:opacity-50"
      // Disable 'Next' on step 3 (Patient Info) if mobile is invalid
      disabled={submitting || (currentStep === 3 && !isValid)}
    >
      {translations.next}
      <Icon icon="mynaui:chevron-right" width="24" height="24" />
    </button>
  )}

  {/* --- 3. SUBMIT BUTTON --- */}
  {/* Show ONLY on step 5 AND before success */}
  {currentStep === 5 && !success && (
    <button
      type="button" // Use "button" to prevent default form submission
      onClick={handleSubmit} // This calls your API
      disabled={submitting || isDownloading}
      className="ml-auto px-4 py-3 bg-M-primary-color text-white rounded hover:bg-M-primary-color/90 transition-all duration-300 font-jost font-medium text-base min-w-24 uppercase disabled:opacity-50"
    >
      {submitting ? translations.submitting : translations.submit}
    </button>
  )}
          </div>
        </div>
      </form>
      {isPrinting && (
        <AppointmentPrintLayout
          className="appointment-print-layout" // This class is used in the CSS
          formData={formData}
          doctor={doctor}
          value={value} // The selected date
          language={language}
          appointmentId={appointmentId} // Pass the confirmed ID
        />
      )}
    </div>
  );
};

export default Appointment;

