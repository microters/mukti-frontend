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
import {  sendOtp, loginUser, registerUser } from "../../utils/api";
// import { sendOtp, loginUser, registerUser } from "@/app/api/auth"; // Import the auth functions
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
const Appointment = () => {
  const params = useParams();
  const doctorSlug = params.slug; // URL: /book-appointment/[slug]
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  // API key and BASE_URL (adjust these as needed)
  const API_KEY = "caf56e69405fe970f918e99ce86a80fbf0a7d728cca687e8a433b817411a6079";
  const BASE_URL = "https://api.muktihospital.com/api" || "http://localhost:5000/api";
  const IMG_URL = "https://api.muktihospital.com" || "http://localhost:5000";

  // Determine language from URL path: '/bn/' means Bengali, otherwise English
  const language = pathname.includes("/bn/") ? "bn" : "en";
  const [downloadFormat, setDownloadFormat] = useState('pdf'); // Options: 'pdf', 'txt'
  const [isDownloading, setIsDownloading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // States for OTP verification
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [patientExists, setPatientExists] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const [value, setValue] = useState(null);
  // Form data for patient info - pre-fill from user data if available
  const [formData, setFormData] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
    age: user?.age || "",
    weight: user?.weight || "",
    address: user?.address || "",
    reason: "",
  });

  // UI translations based on language
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

  // Fetch doctor data on mount
  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!doctorSlug) return;
      try {
        setLoading(true);
        console.log(`Fetching doctor with slug: ${doctorSlug}, language: ${language}`);
        const doctorData = await fetchDoctorBySlug(doctorSlug, language);
        if (doctorData) {
          console.log("Doctor data retrieved:", doctorData);
          setDoctor(doctorData);
          setError(null);
        } else {
          console.error("Doctor not found");
          setError("Doctor not found");
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        setError("Error fetching doctor data");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [doctorSlug, language]);

  // Step labels for the multi-step form
  const stepLabels = translations.stepLabels;
  const steps = Array.from({ length: stepLabels.length }, (_, index) => index + 1);

  // const nextStep = async () => {
  //   if (currentStep === 3) {
  //     // Before going to verification step, check if patient exists
  //     await checkPatientAndSendOTP();
  //   } else {
  //     if (currentStep < stepLabels.length) setCurrentStep(currentStep + 1);
  //   }
  // };
// Updated nextStep function with date validation
const nextStep = async () => {
  if (currentStep === 2) {
    // First check if a date has been selected at all
    if (!value) {
      toast.error(language === "bn" 
        ? "অনুগ্রহ করে একটি তারিখ নির্বাচন করুন" 
        : "Please select a date first");
      return;
    }
    
    // Get the day of week from the selected date (0 = Sunday, 1 = Monday, etc.)
    const selectedDayNumber = value.getDay();
    
    // Check doctor availability for this specific day
    const doctorAvailableDays = scheduleWithDayNumbers
      .filter(item => 
        item.startTime !== "Closed" && 
        item.startTime !== "N/A" &&
        item.endTime !== "Closed" && 
        item.endTime !== "N/A")
      .map(item => item.dayNumber);
    
    // Simple and direct check: Is this day in the available days list?
    if (!doctorAvailableDays.includes(selectedDayNumber)) {
      toast.error(language === "bn" 
        ? "অনুগ্রহ করে একটি বৈধ তারিখ নির্বাচন করুন যেদিন ডাক্তার উপলব্ধ আছেন" 
        : "Please select a valid date when the doctor is available");
      return;
    }
    
    // If we get here, the day is available, so proceed
    if (currentStep < stepLabels.length) setCurrentStep(currentStep + 1);
  } 
  else if (currentStep === 3) {
    // Before going to verification step, check if patient exists
    await checkPatientAndSendOTP();
  } 
  else {
    // For other steps, proceed normally
    if (currentStep < stepLabels.length) setCurrentStep(currentStep + 1);
  }
};
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Handle input change for all fields
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "mobile") {
      // শুধুমাত্র সংখ্যা গ্রহণ করুন
      value = value.replace(/\D/g, "");
      // যদি ব্যবহারকারী "88" দিয়ে না শুরু করে, তবে যোগ করুন
      if (!value.startsWith("88")) {
        value = "88" + value;
      }
      // সর্বোচ্চ দৈর্ঘ্য ১৩ টি অক্ষর রাখুন
      if (value.length > 13) value = value.slice(0, 13);
      // চেক করুন মোবাইল সঠিক কিনা (১৩ অক্ষর থাকলে)
      setIsValid(value.length === 13);
    }
    console.log(`Field ${name} updated to:`, value);
    setFormData({ ...formData, [name]: value });
  };
  // Function to download appointment info as PDF
// Function to generate appointment information text
const generateAppointmentText = (formData, doctor, value, selectedDay, language) => {
  const appointmentDate = value.toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formatTime = (time) => {
    if (!time || typeof time !== "string" || !/^\d{2}:\d{2}$/.test(time)) {
      return "N/A";
    }
  
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(+hours);
    date.setMinutes(+minutes);
    
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  
  
  const timeSlot = (selectedDay && selectedDay.startTime && selectedDay.endTime)
  ? `${formatTime(selectedDay.startTime)} - ${formatTime(selectedDay.endTime)}`
  : (language === "bn" ? "উপলব্ধ নয়" : "Not Available");

  

  // Get doctor information safely
  const doctorTranslations = doctor?.translations || {};
  const name = doctorTranslations?.name || doctor?.name;
  const department = doctorTranslations?.department || doctor?.department;
  const academicQualification = doctorTranslations?.academicQualification || doctor?.academicQualification;

  // Generate reference ID with timestamp and random characters for uniqueness
  const referenceId = `MUKTI-${Date.now().toString().substring(7)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

  // Create the text content based on language
  if (language === "bn") {
    return {
      content: `
অ্যাপয়েন্টমেন্ট বিবরণ
------------------
হাসপাতাল: মুক্তি হাসপাতাল

ডাক্তারের তথ্য:
নাম: ${name}
বিভাগ: ${department}
যোগ্যতা: ${academicQualification}

রোগীর তথ্য:
নাম: ${formData.name}
ফোন: ${formData.mobile}
বয়স: ${formData.age || "উল্লেখ নেই"}
ওজন: ${formData.weight || "উল্লেখ নেই"}
ঠিকানা: ${formData.address || "উল্লেখ নেই"}
ভিজিটের কারণ: ${formData.reason || "উল্লেখ নেই"}

অ্যাপয়েন্টমেন্ট শেডিউল:
তারিখ: ${appointmentDate}
সময়: ${timeSlot}
ফি: ${doctorTranslations?.appointmentFee || doctor?.regularFee || "1000"} টাকা

নির্দেশনা:
• অনুগ্রহ করে আপনার অ্যাপয়েন্টমেন্টের ১৫ মিনিট আগে পৌছান
• সম্ভব হলে আগের মেডিকেল রেকর্ড নিয়ে আসুন
• যেকোনো প্রশ্নের জন্য, যোগাযোগ করুন: +৮৮ ০২ XXXX XXXX

রেফারেন্স আইডি: ${referenceId}
      `,
      referenceId
    };
  } else {
    return {
      content: `
APPOINTMENT DETAILS
------------------
Hospital: Mukti Hospital

Doctor Information:
Name: ${name}
Department: ${department}
Qualification: ${academicQualification}

Patient Information:
Name: ${formData.name}
Phone: ${formData.mobile}
Age: ${formData.age || "N/A"}
Weight: ${formData.weight || "N/A"}
Address: ${formData.address || "N/A"}
Reason for Visit: ${formData.reason || "N/A"}

Appointment Schedule:
Date: ${appointmentDate}
Time: ${timeSlot  || "N/A"}
Fee: ${doctorTranslations?.appointmentFee || doctor?.regularFee || "1000"} TK

Instructions:
• Please arrive 15 minutes before your appointment time
• Bring any previous medical records if available
• For any queries, contact: +88 02 XXXX XXXX

Reference ID: ${referenceId}
      `,
      referenceId
    };
  }
};

// Function to download appointment info as text file
const downloadAsText = (formData, doctor, value, selectedDay, language) => {
  const { content, referenceId } = generateAppointmentText(formData, doctor, value, selectedDay, language);
  
  // Create a blob with the text content
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  // Create a temporary link to download the file
  const a = document.createElement('a');
  a.href = url;
  a.download = `Appointment_${formData.name.replace(/\s+/g, '_')}_${referenceId}.txt`;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
  
  return referenceId;
};

// Function to generate PDF from appointment information
const downloadAsPdf = async (formData, doctor, value, selectedDay, language, appointmentCardRef) => {
  try {
    // First, try to use the DOM element if available
    if (appointmentCardRef?.current) {
      const canvas = await html2canvas(appointmentCardRef.current, {
        scale: 2, // Better resolution
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Calculate dimensions to fit the PDF while maintaining aspect ratio
      const imgWidth = 210; // A4 width in mm (210mm)
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Generate reference ID
      const { referenceId } = generateAppointmentText(formData, doctor, value, selectedDay, language);
      
      // Add reference ID at the bottom of the page
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Reference ID: ${referenceId}`, 10, 287);
      
      // Save the PDF
      pdf.save(`Appointment_${formData.name.replace(/\s+/g, '_')}_${referenceId}.pdf`);
      return referenceId;
    } else {
      // Fallback to text-based PDF if DOM element isn't available
      const { content, referenceId } = generateAppointmentText(formData, doctor, value, selectedDay, language);
      
      const pdf = new jsPDF();
      
      // Add hospital logo or header
      pdf.setFontSize(22);
      pdf.setTextColor(0, 51, 102);
      pdf.text("Mukti Hospital", 105, 20, { align: 'center' });
      
      // Add appointment details
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      
      // Split the content into lines and add to PDF with proper formatting
      const contentLines = content.split('\n');
      let y = 30;
      
      contentLines.forEach(line => {
        if (line.includes('------------------')) {
          pdf.setDrawColor(0, 51, 102);
          pdf.line(20, y, 190, y);
          y += 5;
        } else if (line.trim() === 'APPOINTMENT DETAILS' || line.trim() === 'অ্যাপয়েন্টমেন্ট বিবরণ') {
          pdf.setFontSize(16);
          pdf.setTextColor(0, 51, 102);
          pdf.text(line, 105, y, { align: 'center' });
          pdf.setFontSize(12);
          pdf.setTextColor(0, 0, 0);
          y += 10;
        } else if (line.includes(':')) {
          // For key-value pairs, align properly
          const [key, value] = line.split(':');
          pdf.setFont(undefined, 'bold');
          pdf.text(key + ':', 20, y);
          pdf.setFont(undefined, 'normal');
          pdf.text(value || '', 80, y);
          y += 6;
        } else if (line.trim().length > 0) {
          // Regular lines
          pdf.text(line, 20, y);
          y += 6;
        } else {
          // Empty lines - add space
          y += 3;
        }
      });
      
      // Add QR code placeholder for reference ID
      pdf.setDrawColor(0);
      pdf.setFillColor(240, 240, 240);
      pdf.roundedRect(150, 240, 40, 40, 3, 3, 'FD');
      pdf.setFontSize(8);
      pdf.text("Scan for digital verification", 170, 262, { align: 'center' });
      
      // Add footer with time stamp
      const currentDate = new Date().toLocaleString();
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Generated on: ${currentDate}`, 20, 285);
      pdf.text(`Reference ID: ${referenceId}`, 20, 290);
      
      // Save the PDF
      pdf.save(`Appointment_${formData.name.replace(/\s+/g, '_')}_${referenceId}.pdf`);
      return referenceId;
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    // Fallback to text download if PDF generation fails
    return downloadAsText(formData, doctor, value, selectedDay, language);
  }
};

// Main download function that handles both formats
const downloadAppointmentInfo = async (formData, doctor, value, selectedDay, language, format, appointmentCardRef, setIsDownloading) => {
  try {
    setIsDownloading(true);
    
    let referenceId;
    
    if (format === 'pdf') {
      referenceId = await downloadAsPdf(formData, doctor, value, selectedDay, language, appointmentCardRef);
    } else {
      referenceId = downloadAsText(formData, doctor, value, selectedDay, language);
    }
    
    // Show success message
    toast.success(
      language === "bn" 
        ? "অ্যাপয়েন্টমেন্ট তথ্য ডাউনলোড হয়েছে" 
        : "Appointment details downloaded successfully"
    );
    
    // Log for tracking
    console.log(`Appointment downloaded with reference ID: ${referenceId}`);
    
    return referenceId;
  } catch (error) {
    console.error("Download failed:", error);
    toast.error(
      language === "bn" 
        ? "ডাউনলোড ব্যর্থ হয়েছে, আবার চেষ্টা করুন" 
        : "Download failed, please try again"
    );
  } finally {
    setIsDownloading(false);
  }
};
// Enhanced download button component with format selection
const DownloadButton = ({ onClick, isDownloading, downloadFormat, setDownloadFormat, language }) => {
  const handleFormatChange = (e) => {
    setDownloadFormat(e.target.value);
  };
  
  return (
    <div className="flex items-center gap-2">
      <select 
        value={downloadFormat}
        onChange={handleFormatChange}
        className="text-sm bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-M-primary-color"
      >
        <option value="pdf">PDF</option>
        <option value="txt">Text</option>
      </select>
      <button
        type="button"
        onClick={onClick}
        disabled={isDownloading}
        className={`flex items-center text-sm bg-M-primary-color text-white py-2 px-3 rounded hover:bg-M-primary-color/90 transition-all ${isDownloading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isDownloading ? (
          <>
            <Icon icon="eos-icons:loading" className="animate-spin mr-1" />
            {language === "bn" ? "ডাউনলোড হচ্ছে..." : "Downloading..."}
          </>
        ) : (
          <>
            <Icon icon="material-symbols:download" className="mr-1" />
            {language === "bn" ? "ডাউনলোড করুন" : "Download"}
          </>
        )}
      </button>
    </div>
  );
};

// Mobile sharing buttons for better user experience on mobile devices
const MobileSharingOptions = ({ appointmentData, language }) => {
  // Function to share via WhatsApp
  const shareViaWhatsApp = () => {
    const text = `${language === "bn" ? "আমার মুক্তি হাসপাতালে অ্যাপয়েন্টমেন্ট বিবরণ:" : "My appointment details at Mukti Hospital:"}
    
${language === "bn" ? "ডাক্তার" : "Doctor"}: ${appointmentData.doctorName}
${language === "bn" ? "তারিখ" : "Date"}: ${appointmentData.date}
${language === "bn" ? "সময়" : "Time"}: ${appointmentData.time}
    
${language === "bn" ? "রেফারেন্স আইডি" : "Reference ID"}: ${appointmentData.referenceId}`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };
  
  // Function to share via SMS
  const shareViaSMS = () => {
    const text = `${language === "bn" ? "মুক্তি হাসপাতাল অ্যাপয়েন্টমেন্ট" : "Mukti Hospital Appointment"}: ${appointmentData.doctorName}, ${appointmentData.date}, ${appointmentData.time}. ${language === "bn" ? "রেফারেন্স" : "Ref"}: ${appointmentData.referenceId}`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`sms:?&body=${encodedText}`, '_blank');
  };
  
  // Function to share via email
  const shareViaEmail = () => {
    const subject = encodeURIComponent(language === "bn" ? "মুক্তি হাসপাতাল অ্যাপয়েন্টমেন্ট বিবরণ" : "Mukti Hospital Appointment Details");
    const body = encodeURIComponent(`${language === "bn" ? "অ্যাপয়েন্টমেন্ট বিবরণ:" : "Appointment Details:"}
    
${language === "bn" ? "ডাক্তার" : "Doctor"}: ${appointmentData.doctorName}
${language === "bn" ? "বিভাগ" : "Department"}: ${appointmentData.department}
${language === "bn" ? "তারিখ" : "Date"}: ${appointmentData.date}
${language === "bn" ? "সময়" : "Time"}: ${appointmentData.time}
${language === "bn" ? "ফি" : "Fee"}: ${appointmentData.fee}
    
${language === "bn" ? "রেফারেন্স আইডি" : "Reference ID"}: ${appointmentData.referenceId}`);
    
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };
  
  return (
    <div className="mt-4 flex flex-wrap gap-2 justify-center md:hidden">
      <button 
        onClick={shareViaWhatsApp}
        className="flex items-center gap-1 bg-[#25D366] text-white px-3 py-1 rounded"
      >
        <Icon icon="ri:whatsapp-fill" />
        WhatsApp
      </button>
      <button 
        onClick={shareViaSMS}
        className="flex items-center gap-1 bg-[#3498db] text-white px-3 py-1 rounded"
      >
        <Icon icon="solar:chat-round-dots-bold" />
        SMS
      </button>
      <button 
        onClick={shareViaEmail}
        className="flex items-center gap-1 bg-[#34495e] text-white px-3 py-1 rounded"
      >
        <Icon icon="ic:round-email" />
        Email
      </button>
    </div>
  );
};


  // Handle OTP input change
  const handleOtpChange = (e) => {
    setOtpCode(e.target.value);
  };

  // Function to check if a patient with the given mobile exists
// Function to check if a patient with the given mobile exists
const checkPatientAndSendOTP = async () => {
  if (!validateBasicPatientInfo()) {
    return;
  }
  
  try {
    setSubmitting(true);
    
    // Clean mobile number
    let cleanedMobile = formData.mobile.trim();
    if (!cleanedMobile.startsWith("88")) {
      cleanedMobile = "88" + cleanedMobile.replace(/^88/, "");
    }
    
    // Try to check if patient exists
    try {
      const res = await axios.get(`${BASE_URL}/patient`, {
        headers: { "x-api-key": API_KEY },
      });
      console.log(res.data);
      
      // Check if any patient matches this mobile number
      const existingPatient = res.data.find(patient => 
        patient.phoneNumber === cleanedMobile || 
        patient.mobile === cleanedMobile);
      
      if (existingPatient) {
        setPatientExists(true);
        setPatientId(existingPatient.id);
        toast.info(translations.existingPatient);
      } else {
        setPatientExists(false);
        setPatientId(null);
        toast.info(translations.newPatient);
      }
    } catch (patientError) {
      console.error("Error fetching patients:", patientError);
      // Continue with registration flow if patient check fails
      setPatientExists(false);
      setPatientId(null);
      toast.info(translations.newPatient);
    }
    
    // Debug logs
    console.log("About to send OTP to: ", cleanedMobile);
    
    try {
      // sendOtp কল করার সময়, নিশ্চিত করুন যে আপনি শুধুমাত্র মোবাইল নাম্বার পাঠাচ্ছেন
      const result = await sendOtp(cleanedMobile);
      console.log("OTP sent successfully: ", result);
      
      setIsOtpSent(true);
      toast.success(language === "bn" ? "ওটিপি পাঠানো হয়েছে" : "OTP has been sent");
      // Move to verification step
      setCurrentStep(4);
    } catch (otpError) {
      console.error("Error sending OTP:", otpError);
      toast.error(otpError.message || "Failed to send OTP");
    }
  } finally {
    setSubmitting(false);
  }
};

// Function to resend OTP
const handleResendOtp = async () => {
  try {
    let cleanedMobile = formData.mobile.trim();
    if (!cleanedMobile.startsWith("88")) {
      cleanedMobile = "88" + cleanedMobile.replace(/^88/, "");
    }
    
    console.log("Resending OTP to: ", cleanedMobile);
    await sendOtp(cleanedMobile);
    toast.success(language === "bn" ? "ওটিপি পুনরায় পাঠানো হয়েছে" : "OTP has been resent");
  } catch (error) {
    console.error("Error in resend:", error);
    toast.error(error.message || "Failed to resend OTP");
  }
};


  // Function to verify OTP
  const verifyOtp = async () => {
    if (!otpCode || otpCode.length < 4) {
      toast.error(language === "bn" ? "সঠিক ওটিপি দিন" : "Please enter a valid OTP");
      return;
    }
    
    try {
      setVerifyingOtp(true);
      
      // Clean mobile number
      let cleanedMobile = formData.mobile.trim();
      if (!cleanedMobile.startsWith("88")) {
        cleanedMobile = "88" + cleanedMobile;
      }
      
      if (patientExists) {
        // Login existing patient
        try {
          const loginData = {
            mobile: cleanedMobile,
            otp: otpCode
          };
          
          const response = await loginUser(loginData);
          if (response) {
            toast.success(language === "bn" ? "লগইন সফল" : "Login successful");
            // Move to confirmation step
            setCurrentStep(5);
          }
        } catch (loginError) {
          toast.error(loginError.message || "Login failed");
          return;
        }
      } else {
        // Register new patient
        try {
          const registerData = {
            name: formData.name,
            mobile: cleanedMobile,
            otp: otpCode
          };
          
          const response = await registerUser(registerData);
          if (response) {
            setPatientId(response.user?.id);
            toast.success(language === "bn" ? "রেজিস্ট্রেশন সফল" : "Registration successful");
            // Move to confirmation step
            setCurrentStep(5);
          }
        } catch (registerError) {
          toast.error(registerError.message || "Registration failed");
          return;
        }
      }
      
    } catch (err) {
      console.error("Error verifying OTP:", err);
      toast.error(err.message || "Error verifying OTP");
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Validate basic patient info
  const validateBasicPatientInfo = () => {
    // Required fields
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

  // Validate form data before final submission
  const validateForm = () => {
    if (!validateBasicPatientInfo()) {
      return false;
    }

    // Validate appointment date
    if (!value) {
      toast.error(language === "bn" ? "অ্যাপয়েন্টমেন্টের তারিখ নির্বাচন করুন" : "Please select an appointment date");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    setSubmitting(true);
    setError(null);
    setSuccess(null);
  
    let cleanedMobile = formData.mobile.trim();
    if (!cleanedMobile.startsWith("88")) {
      cleanedMobile = "88" + cleanedMobile;
    }
  
    try {
      const selectedDayNumber = value.getDay();
      const selectedDay = doctor.schedule?.find(item =>
        (item.dayNumber !== undefined ? item.dayNumber : dayMap[item.day]) === selectedDayNumber
      );
  
      const formatTime = (time) => {
        if (!time || !/^([01]?\d|2[0-3]):([0-5]\d)$/.test(time)) return time;
        return new Date(`2025-01-01T${time}:00`).toLocaleTimeString('en-US', {
          hour: '2-digit', minute: '2-digit', hour12: true
        });
      };
  
      const timeSlot = selectedDay 
        ? `${formatTime(selectedDay.startTime)} - ${formatTime(selectedDay.endTime)}`
        : null;
  
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
  
      const successMessage = language === "bn"
        ? "অ্যাপয়েন্টমেন্ট সফলভাবে বুক করা হয়েছে!"
        : "Appointment booked successfully!";
  
      setSuccess(successMessage);
      toast.success(successMessage);
  
      // ✅ Auto download after successful booking
      await downloadAppointmentInfo(
        formData,
        doctor,
        value,
        selectedDay,
        language,
        downloadFormat,
        null, // appointmentCardRef যদি ব্যবহার না করো
        setIsDownloading
      );
  
      // Reset after a while
      setTimeout(() => {
        setFormData({
          name: "",
          mobile: "",
          age: "",
          weight: "",
          address: "",
          reason: "",
        });
        setValue(new Date());
        setCurrentStep(1);
        setOtpCode("");
        setIsOtpSent(false);
      }, 2000);
  
    } catch (error) {
      console.error("Error booking appointment:", error);
      const errorMessage = error.response?.data?.message ||
        (language === "bn" ? "অ্যাপয়েন্টমেন্ট বুক করতে সমস্যা হয়েছে।" : "Failed to book appointment.");
  
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
          {language === "bn" 
            ? "দুঃখিত, আপনি যে ডাক্তারের সন্ধান করছেন তিনি পাওয়া যায়নি।" 
            : "Sorry, the doctor you are looking for is not available."}
        </p>
        <Link href={`/${language === "bn" ? "bn/" : ""}doctors`} className="bg-M-primary-color text-white px-4 py-2 rounded-md">
          {language === "bn" ? "সকল ডাক্তার দেখুন" : "See All Doctors"}
        </Link>
      </div>
    );
  }

  // Process doctor's schedule (for display purposes)
  const doctorData = doctor.schedule || [];
  const dayMap = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
  const scheduleWithDayNumbers = doctorData.map(item => ({
    ...item,
    dayNumber: item.dayNumber !== undefined ? item.dayNumber : dayMap[item.day] || 0,
  }));
  const disabledDays = Array.from(Array(7).keys()).filter(day =>
    !scheduleWithDayNumbers.some(item =>
      item.dayNumber === day &&
      item.startTime !== "Closed" &&
      item.startTime !== "N/A"
    )
  );

  // Access translations safely
  const doctorTranslations = doctor?.translations || {};
  const name = doctorTranslations?.name || doctor?.name;
  const department = doctorTranslations?.department || doctor?.department;
  const academicQualification = doctorTranslations?.academicQualification || doctor?.academicQualification;
  const experience = doctorTranslations?.yearsOfExperience || doctor?.experience || "4";
  const doctorImage = doctor?.icon
    ? `${IMG_URL}${doctor.icon}`
    : "/default-profile-photo.png";

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <CommonHero pageName={language === "bn" ? "অ্যাপয়েন্টমেন্ট" : "Appointment"} />
      
      {/* Success Message */}
      {success && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">{language === "bn" ? "সফল!" : "Success!"}</strong>
            <span className="block sm:inline ml-1">{success}</span>
          </div>
        </div>
      )}
      
      {/* Error Message */}
      {error && !loading && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">{language === "bn" ? "ত্রুটি!" : "Error!"}</strong>
            <span className="block sm:inline ml-1">{error}</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="container mx-auto px-4 md:px-0 my-24">
        <div className="bg-slate-100 p-5 md:p-10 mt-10 rounded-xl border border-M-text-color/20">
          {/* Progress Stepper */}
          <div className="flex flex-wrap justify-between items-center gap-2 mb-10 relative">
            {steps.map((step) => (
              <div
                key={step}
                className={`flex flex-col items-center relative lg:before:w-16 xl:before:w-24 before:h-[1px] before:absolute before:border before:border-dashed before:top-1/2 before:-translate-y-1/2 lg:before:-right-24 xl:before:-right-48 last:before:hidden ${
                  step < currentStep ? "before:bg-M-text-color" : "before:bg-M-text-color/10"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-jost font-bold text-lg ${
                    step === currentStep
                      ? "bg-M-primary-color text-white"
                      : step < currentStep
                      ? "bg-M-primary-color text-white"
                      : "bg-slate-300 text-white"
                  }`}
                >
                  {step}
                </div>
                <div
                  className={`mt-2 text-base font-jost font-medium ${
                    step === currentStep
                      ? "text-M-heading-color"
                      : step < currentStep
                      ? "text-M-heading-color"
                      : "text-slate-300"
                  }`}
                >
                  {stepLabels[step - 1]}
                </div>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div>
            {currentStep === 1 && (
              <div className="mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 items-center gap-6 bg-white p-6 rounded-md">
                  <div className="w-full h-32 max-w-32 rounded-full overflow-hidden border-2 border-M-primary-color">
                    <Image
                      src={doctorImage}
                      width={100}
                      height={100}
                      alt="doctor image"
                      className="w-full"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <ul className="flex flex-wrap items-center gap-4 mb-5">
                      <li className="border-2 border-[#00224F50] inline-block w-auto rounded-md py-2 px-4 text-M-primary-color text-base font-jost font-normal">
                        {department}
                      </li>
                      <li className="bg-[#323290] inline-flex items-center gap-1 rounded-md py-2 px-4 font-jost font-normal text-base text-white">
                        <Icon icon="icon-park-outline:hospital-three" width="16" height="16" className="text-white" />
                        {experience || "4"} {language === "bn" ? "বছর" : "Years"}
                      </li>
                    </ul>
                    <h3 className="text-[#323290] text-lg font-jost font-bold mb-4">
                      <Link href={`/${language === "bn" ? "bn/" : ""}doctor/${doctorSlug}`} prefetch={true} className="hover:text-M-primary-color transition-all duration-300 capitalize">
                        {name}
                      </Link>
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
                      <h4 className="text-[#323290] text-base sm:text-lg font-jost font-bold mb-2">
                        {translations.available}
                      </h4>
                    </div>
                    {doctorData && doctorData.length > 0 ? (
                      <div className="font-jost text-base text-M-text-color">
                        <div>
                          {(() => {
                            const dayMap = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
                            const sortedSchedule = [...doctorData].sort((a, b) => {
                              return (a.dayNumber !== undefined ? a.dayNumber : dayMap[a.day]) -
                                     (b.dayNumber !== undefined ? b.dayNumber : dayMap[b.day]);
                            });
                            const firstTime = sortedSchedule[0]?.startTime + sortedSchedule[0]?.endTime;
                            const allSameTime = sortedSchedule.every(item => (item.startTime + item.endTime) === firstTime);
                            const firstDay = sortedSchedule[0];
                            const lastDay = sortedSchedule[sortedSchedule.length - 1];
                            const formatTime = (time) => {
                              if (!time || !/^([01]?\d|2[0-3]):([0-5]\d)$/.test(time)) return time;
                              return new Date(`2025-01-01T${time}:00`).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              });
                            };
                            const dayNames = sortedSchedule.map(item => item.day);
                            let dayRangeText = "";
                            if (dayNames.length === 1) {
                              dayRangeText = dayNames[0];
                            } else if (dayNames.length === 2) {
                              dayRangeText = `${dayNames[0]} & ${dayNames[1]}`;
                            } else {
                              dayRangeText = `${dayNames[0]} - ${dayNames[dayNames.length - 1]}`;
                            }
                            return (
                              <>
                                <p className="font-jost text-base font-medium text-M-primary-color">
                                  {dayRangeText}
                                </p>
                                <p className="font-jost text-base text-M-text-color mt-1">
                                  {formatTime(firstDay?.startTime)} - {formatTime(firstDay?.endTime)}
                                </p>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="font-jost text-sm sm:text-base text-M-text-color">
                          {doctor?.availableDays || "Friday - Monday"}
                        </p>
                        <p className="font-jost text-base text-M-text-color">
                          {doctor?.availableHours || "12:00 AM - 03:00 PM"}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="text-left sm:text-center flex gap-3 justify-between sm:block sm:space-y-2">
                    <div>
                    <Icon icon="majesticons:bookmark-plus" width="24" height="24" className="sm:mx-auto text-M-primary-color" />
                      <h4 className="text-[#323290] text-base sm:text-lg font-jost font-bold mb-2">
                        {translations.consultationFee}
                      </h4>
                    </div>
                    <div>
                      <p className="font-jost text-sm sm:text-base text-M-text-color">
                        {translations.regularFee}: {doctorTranslations?.appointmentFee || doctor?.regularFee || "1000"}TK
                      </p>
                      <p className="font-jost text-sm sm:text-base text-M-text-color">
                        {translations.followUpFee}: {doctorTranslations?.followUpFee || doctor?.followUpFee || "800"}TK
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
{currentStep === 2 && (
  <div className="mb-10">
    <div className="rounded-md bg-white">
      <h3 className="border-b border-M-text-color/20 p-7 pb-5 text-xl">
        {translations.selectDateTime}
      </h3>
      <div className="p-7 block lg:flex gap-7 space-y-5 lg:space-y-5">
        <div className="shrink-0">
          <div className="mb-3 text-center">
            <span className="text-M-primary-color font-medium">
              {language === "bn" 
                ? "দয়া করে ডাক্তারের উপলব্ধ দিনগুলি থেকে একটি তারিখ নির্বাচন করুন"
                : "Please select a date from doctor's available days"}
            </span>
          </div>
          <Calendar
            onChange={setValue}
            value={value}
            minDate={new Date()}
            tileDisabled={({ date, view }) =>
              view === "month" && disabledDays.includes(date.getDay())
            }
            tileClassName={({ date, view }) => {
              if (view === 'month') {
                const dayOfWeek = date.getDay();
                return !disabledDays.includes(dayOfWeek) 
                  ? 'bg-green-50 hover:bg-green-100' 
                  : 'text-gray-400 line-through';
              }
            }}
          />
          
          {/* Selected Date Confirmation - Modified to handle null value */}
          {value ? (
            <div className="mt-4 p-3 border border-dashed rounded-md border-M-primary-color bg-blue-50">
              <h4 className="text-center font-medium mb-1 text-M-primary-color">
                {language === "bn" ? "নির্বাচিত তারিখ" : "Selected Date"}
              </h4>
              <p className="text-center text-gray-700 font-medium">
                {value.toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              
              {/* Show available/unavailable status */}
              {(() => {
                const selectedDayNumber = value.getDay();
                const isAvailableDay = !disabledDays.includes(selectedDayNumber);
                
                return (
                  <div className={`mt-2 text-center ${isAvailableDay ? 'text-green-600' : 'text-red-600'}`}>
                    <span className="inline-flex items-center gap-1">
                      {isAvailableDay ? (
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
                );
              })()}
            </div>
          ) : (
            <div className="mt-4 p-3 border border-dashed rounded-md border-red-200 bg-red-50">
              <p className="text-center text-red-600 font-medium">
                {language === "bn" 
                  ? "দয়া করে ক্যালেন্ডার থেকে একটি তারিখ নির্বাচন করুন" 
                  : "Please select a date from the calendar"}
              </p>
            </div>
          )}
        </div>
        
        <div className="w-full rounded-md border border-M-text-color/20 p-5">
          <h3 className="text-M-heading-color text-xl font-semibold text-center mb-4">
            {translations.availableFor}
          </h3>
          <div>
            <ul className="grid grid-cols-2 gap-3">
              {scheduleWithDayNumbers.map((item, index) => {
                const convertTo12HourFormat = (time) => {
                  const isValidTime = /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
                  if (!isValidTime) return time;
                  return new Date(`2025-01-01T${time}:00`).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  });
                };
                const dayShortForm = {
                  Sunday: "Sun",
                  Monday: "Mon",
                  Tuesday: "Tue",
                  Wednesday: "Wed",
                  Thursday: "Thu",
                  Friday: "Fri",
                  Saturday: "Sat",
                };
                const shortDay = dayShortForm[item.day] || item.day;
                const isValidTime = (time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
                const startTimeValid = isValidTime(item.startTime);
                const endTimeValid = isValidTime(item.endTime);
                
                // Highlight the selected day - modified to handle null value
                const isSelectedDay = value ? value.getDay() === item.dayNumber : false;
                
                return (
                  <li
                    key={index}
                    className={`text-sm md:text-base p-3 border ${isSelectedDay ? 'border-M-primary-color border-2' : 'border-M-heading-color/20'} 
                      inline-flex flex-wrap justify-center gap-2 rounded font-jost w-full text-center uppercase 
                      ${startTimeValid && endTimeValid
                        ? isSelectedDay ? "bg-M-primary-color/10" : "bg-M-text-color/10"
                        : "border-red-500 bg-M-secondary-color text-white"}`}
                  >
                    <strong>{shortDay}: </strong>
                    {startTimeValid && endTimeValid
                      ? `${convertTo12HourFormat(item.startTime)} - ${convertTo12HourFormat(item.endTime)}`
                      : convertTo12HourFormat(item.startTime) ||
                        convertTo12HourFormat(item.endTime)}
                    
                    {/* Show selected indicator */}
                    {isSelectedDay && (
                      <span className="w-full text-M-primary-color text-xs mt-1">
                        {language === "bn" ? "✓ নির্বাচিত" : "✓ Selected"}
                      </span>
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
                  <h3 className="border-b border-M-text-color/20 p-7 pb-5 text-xl">
                    {translations.stepLabels[2]}
                  </h3>
                  <div className="p-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-3 mb-7">
                      <div>
                        <label htmlFor="name" className="font-jost font-medium text-base text-M-text-color mb-1 block">
                          {translations.patientName} <span className="text-M-secondary-color">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="inputField"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="mobile" className="font-jost font-medium text-base text-M-text-color mb-1 block">
                        {translations.phone} <span className="text-M-secondary-color">*</span>
                        </label>
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
                            required
                            placeholder="8801XXXXXXXX"
                            className="h-[48px] border w-full rounded-md focus:outline-none border-M-text-color/20 text-black transition-all duration-300 ring-0 ring-M-primary-color focus:ring-1 px-3 py-2 pl-12"
                            maxLength="13"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="weight" className="font-jost font-medium text-base text-M-text-color mb-1 block">
                          {translations.weight}
                        </label>
                        <input
                          type="text"
                          id="weight"
                          name="weight"
                          value={formData.weight}
                          onChange={handleChange}
                          className="inputField"
                        />
                      </div>
                      <div>
                        <label htmlFor="age" className="font-jost font-medium text-base text-M-text-color mb-1 block">
                          {translations.age}
                        </label>
                        <input
                          type="text"
                          id="age"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          className="inputField"
                        />
                      </div>
                      <div>
                        <label htmlFor="address" className="font-jost font-medium text-base text-M-text-color mb-1 block">
                          {translations.address}
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="inputField"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="reason" className="font-jost font-medium text-base text-M-text-color mb-1 block">
                          {translations.visitReason}
                        </label>
                        <textarea
                          name="reason"
                          id="reason"
                          rows={5}
                          value={formData.reason}
                          onChange={handleChange}
                          className="textAreaFiled"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* OTP Verification Step */}
            {currentStep === 4 && (
              <div className="mb-10">
                <div className="rounded-md bg-white">
                  <h3 className="border-b border-M-text-color/20 p-7 pb-5 text-xl">
                    {translations.verification}
                  </h3>
                  <div className="p-7">
                    <div className="max-w-[600px] mx-auto">
                      <div className="text-center mb-6">
                        <Icon icon="ic:baseline-verified-user" className="text-5xl text-M-primary-color mx-auto mb-3" />
                        <h4 className="text-xl font-bold mb-2">
                          {translations.verifyPhone}
                        </h4>
                        <p className="text-gray-600">
                          {patientExists ? translations.existingPatient : translations.newPatient}
                        </p>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="otp" className="font-medium mb-2 block text-center">
                          {translations.enterOtp}
                        </label>
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
                          ) : (
                            translations.verifyOtp
                          )}
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
        <span>{translations.stepLabels[4]}</span>
       
      </h3>
      <div className="p-7">
        <div className="max-w-[720px] mx-auto w-full">
          <div className="border border-M-text-color/20 rounded-md">
            <div className="px-5 py-3 border-b border-M-text-color/20">
              <h4 className="text-lg text-M-heading-color mb-2">
                {translations.bookingInfo}
              </h4>
              <p className="font-jost">
                {language === "bn" 
                  ? `${name} এর সাথে আপনার অ্যাপয়েন্টমেন্ট নিশ্চিত করা হয়েছে। অ্যাপয়েন্টমেন্টের সময়ের ১৫ মিনিট আগে উপস্থিত থাকুন।`
                  : `Your Booking has been Confirmed with ${name}. Please be on time before 15 Mins from the appointment time.`
                }
              </p>
            </div>
            <div className="px-5 py-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <div>
                <h5 className="text-M-heading-color text-lg font-bold font-jost">
                  {translations.patientName}
                </h5>
                <p className="text-M-text-color text-base font-jost">{formData.name || "N/A"}</p>
              </div>
              <div>
                <h5 className="text-M-heading-color text-lg font-bold font-jost">
                  {translations.age}
                </h5>
                <p className="text-M-text-color text-base font-jost">{formData.age || "N/A"}</p>
              </div>
              <div>
                <h5 className="text-M-heading-color text-lg font-bold font-jost">
                  {translations.phone}
                </h5>
                <p className="text-M-text-color text-base font-jost">{formData.mobile || "N/A"}</p>
              </div>
              <div>
                <h5 className="text-M-heading-color text-lg font-bold font-jost">
                  {language === "bn" ? "বিভাগ" : "Department"}
                </h5>
                <p className="text-M-text-color text-base font-jost">{department}</p>
              </div>
              <div>
                <h5 className="text-M-heading-color text-lg font-bold font-jost">
                  {translations.address}
                </h5>
                <p className="text-M-text-color text-base font-jost">{formData.address || "N/A"}</p>
              </div>
              <div>
                <h5 className="text-M-heading-color text-lg font-bold font-jost">
                  {language === "bn" ? "কারণ" : "Reason"}
                </h5>
                <p className="text-M-text-color text-base font-jost">{formData.reason || "N/A"}</p>
              </div>
              <div>
                <h5 className="text-M-heading-color text-lg font-bold font-jost">
                  {translations.appointmentDate}
                </h5>
                <p className="text-M-text-color text-base font-jost">
                  {value.toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <h5 className="text-M-heading-color text-lg font-bold font-jost">
                  {language === "bn" ? "সময়" : "Time"}
                </h5>
                <p className="text-M-text-color text-base font-jost">
                  {(() => {
                    const selectedDayNumber = value.getDay();
                    const selectedDay = scheduleWithDayNumbers.find(
                      item => item.dayNumber === selectedDayNumber
                    );
                    if (!selectedDay) return "N/A";
                    
                    const formatTime = (time) => {
                      if (!time || !/^([01]?\d|2[0-3]):([0-5]\d)$/.test(time)) return time;
                      return new Date(`2025-01-01T${time}:00`).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      });
                    };
                    
                    return `${formatTime(selectedDay.startTime)} - ${formatTime(selectedDay.endTime)}`;
                  })()}
                </p>
              </div>
            </div>
            <div className="px-5 py-4 border-t border-M-text-color/20 text-center">
              <p className="text-gray-500 text-sm mb-2">
                {language === "bn" 
                  ? "অ্যাপয়েন্টমেন্ট তথ্য ডাউনলোড করতে উপরের ডাউনলোড বাটনে ক্লিক করুন"
                  : "Click the download button above to save your appointment information"}
              </p>
            
            </div>
          </div>
     

        </div>
      </div>
    </div>
  </div>
)}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between border-t border-M-text-color/10 pt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center justify-center px-4 py-3 bg-M-heading-color text-white rounded hover:bg-M-heading-color font-jost font-medium text-base min-w-24 uppercase"
                disabled={submitting || verifyingOtp}
              >
                <Icon icon="mynaui:chevron-left" width="24" height="24" />
                {translations.previous}
              </button>
            )}
            {currentStep < stepLabels.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto flex items-center justify-center px-4 py-3 bg-M-primary-color text-white rounded hover:bg-M-primary-color font-jost font-medium text-base min-w-24 uppercase"
                disabled={submitting || verifyingOtp || (currentStep === 4 && !isOtpSent)}
              >
                {translations.next}
                <Icon icon="mynaui:chevron-right" width="24" height="24" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="ml-auto px-4 py-3 bg-M-primary-color text-white rounded hover:bg-M-primary-color/90 transition-all duration-300 font-jost font-medium text-base min-w-24 uppercase"
              >
                {submitting ? translations.submitting : translations.submit}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Appointment;