"use client";
import CommonHero from "@/app/Component/UI/CommonHero"; // আপনার প্রয়োজন অনুযায়ী
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Auth context (assume useAuth is defined in your project)
import { useAuth } from "../../utils/AuthContext";

// API call for fetching doctor details
import { fetchDoctorBySlug } from "@/app/api/doctor";

// OTP, Login & Registration functions
import { sendOtp, loginUser, registerUser } from "@/app/api/auth";

const Appointment = () => {
  const params = useParams();
  const doctorSlug = params?.slug;
  const pathname = usePathname();
  const router = useRouter();
  
  // Auth context: user and setUser
  const { user, setUser } = useAuth();

  // API Config
  const API_KEY = "caf56e69405fe970f918e99ce86a80fbf0a7d728cca687e8a433b817411a6079";
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.muktihospital.com/api";

  // Language determination: '/bn/' => Bengali
  const language = pathname.includes("/bn/") ? "bn" : "en";

  // Local state
  const [currentStep, setCurrentStep] = useState(1);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Appointment date
  const [appointmentDate, setAppointmentDate] = useState(new Date());

  // OTP related state
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Form data (patient info)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
    age: user?.age || "",
    weight: user?.weight || "",
    address: user?.address || "",
    reason: "",
  });

  // UI Translations (বাংলা/ইংরেজি)
  const translations = {
    stepLabels: language === "bn"
      ? ["বিশেষত্ব", "তারিখ ও সময়", "রোগীর তথ্য", "OTP যাচাই", "নিশ্চিতকরণ"]
      : ["Specialty", "Date & Time", "Patient Info", "OTP Verification", "Confirmation"],
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
    selectDateTime: language === "bn" ? "তারিখ ও সময় নির্বাচন করুন" : "Select Date & Time",
    bookingInfo: language === "bn" ? "বুকিং তথ্য" : "Booking Info",
    appointmentDate: language === "bn" ? "অ্যাপয়েন্টমেন্টের তারিখ" : "Appointment Date",
    availableFor: language === "bn" ? "অ্যাপয়েন্টমেন্টের জন্য উপলব্ধ" : "Available For Appointment",
    enterOtp: language === "bn" ? "OTP লিখুন" : "Enter OTP",
    verifyOtp: language === "bn" ? "OTP যাচাই করুন" : "Verify OTP",
    doctorNotFound: language === "bn" ? "ডাক্তার পাওয়া যায়নি" : "Doctor Not Found"
  };

  // Calculate steps
  const stepLabels = translations.stepLabels;
  const steps = Array.from({ length: stepLabels.length }, (_, i) => i + 1);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fetch doctor data
  useEffect(() => {
    const loadDoctor = async () => {
      if (!doctorSlug) return;
      try {
        setLoading(true);
        const fetchedDoctor = await fetchDoctorBySlug(doctorSlug, language);
        if (fetchedDoctor) {
          setDoctor(fetchedDoctor);
          setError(null);
        } else {
          setError("Doctor not found");
        }
      } catch (err) {
        setError("Error fetching doctor data");
      } finally {
        setLoading(false);
      }
    };
    loadDoctor();
  }, [doctorSlug, language]);

  // Step navigation
  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Function to book appointment (after login/registration)
  const bookAppointment = async () => {
    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      // Process doctor's schedule for selected date
      const dayMap = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
      const selectedDayNumber = appointmentDate.getDay();
      const selectedDay = doctor?.schedule?.find(
        (item) => (item.dayNumber !== undefined ? item.dayNumber : dayMap[item.day]) === selectedDayNumber
      );

      const formatTime = (time) => {
        if (!time || !/^([01]?\d|2[0-3]):([0-5]\d)$/.test(time)) return time;
        return new Date(`2025-01-01T${time}:00`).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
      };

      const timeSlot = selectedDay
        ? `${formatTime(selectedDay.startTime)} - ${formatTime(selectedDay.endTime)}`
        : null;

      // Prepare payload for appointment booking
      const payload = {
        doctorId: doctor?.id,
        doctorName: doctor?.translations?.name || doctor?.name,
        doctorSlug,
        appointmentDate: appointmentDate,
        patientName: formData.name,
        mobileNumber: formData.mobile,
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
        // user information from auth context (if available)
        isNewPatient: user ? false : true,
        patientId: user?.patientId || null
      };

      // API call to book appointment
      const response = await fetch(`${BASE_URL}/appointment/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to book appointment");
      }
      const successMsg = language === "bn" ? "অ্যাপয়েন্টমেন্ট সফলভাবে বুক করা হয়েছে!" : "Appointment booked successfully!";
      setSuccess(successMsg);
      toast.success(successMsg);

      // Reset form or redirect if needed
      setFormData({
        name: "",
        mobile: "",
        age: "",
        weight: "",
        address: "",
        reason: ""
      });
      setAppointmentDate(new Date());
      setCurrentStep(1);
    } catch (err) {
      console.error("Error booking appointment:", err);
      const errMsg = err.message || (language === "bn" ? "অ্যাপয়েন্টমেন্ট বুক করতে সমস্যা হয়েছে" : "Failed to book appointment");
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  // Main form submission (from Step 3)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // যদি ইউজার লগইন করা থাকে, সরাসরি পরবর্তী ধাপে যান
    if (user) {
      nextStep();
    } else {
      // ইউজার না থাকলে, OTP পাঠান
      try {
        setSubmitting(true);
        await sendOtp(formData.mobile);
        toast.info(language === "bn" ? "OTP পাঠানো হয়েছে" : "OTP has been sent to your mobile");
        setOtpSent(true);
        nextStep(); // Step 4: OTP Verification
      } catch (err) {
        toast.error(err.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  // OTP submission handler
  const handleOtpSubmit = async () => {
    try {
      setSubmitting(true);
      // প্রথমে OTP দিয়ে লগইনের চেষ্টা করুন
      const loginRes = await loginUser({
        // যদি সার্ভার login এ name না চায়, তবে name ফিল্ড সরিয়ে ফেলুন
        name: formData.name,
        mobile: formData.mobile,
        otp
      });
      if (loginRes?.token) {
        setUser(loginRes.user);
        toast.success(language === "bn" ? "সফলভাবে লগইন হয়েছে" : "Logged in successfully");
        nextStep(); // Step 5: Confirmation
      }
    } catch (loginError) {
      console.log("Login failed, trying registration:", loginError);
      try {
        // লগইন ব্যর্থ হলে, OTP দিয়ে রেজিস্ট্রেশন করুন
        const regRes = await registerUser({
          name: formData.name,
          mobile: formData.mobile,
          otp
        });
        if (regRes?.user) {
          setUser(regRes.user);
          toast.success(language === "bn" ? "সফলভাবে রেজিস্টার হয়েছে" : "Registered successfully");
          nextStep(); // Step 5: Confirmation
        }
      } catch (regError) {
        console.error("Registration failed:", regError);
        toast.error(regError.message);
      } finally {
        setSubmitting(false);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin" />
      </div>
    );
  }

  if (error && !doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-5">
        <Icon icon="ph:warning-circle" className="text-red-500 text-4xl mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">{translations.doctorNotFound}</h2>
        <p className="text-gray-600 mb-6">
          {language === "bn"
            ? "দুঃখিত, আপনি যে ডাক্তারের সন্ধান করছেন তিনি পাওয়া যায়নি।"
            : "Sorry, the doctor you are looking for is not available."}
        </p>
        <Link href={`/${language === "bn" ? "bn/" : ""}doctors`} className="bg-blue-600 text-white px-4 py-2 rounded-md">
          {language === "bn" ? "সকল ডাক্তার দেখুন" : "See All Doctors"}
        </Link>
      </div>
    );
  }

  // Process doctor's schedule for calendar
  const doctorData = doctor?.schedule || [];
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

  // Additional doctor information
  const doctorTranslations = doctor?.translations || {};
  const nameDoctor = doctorTranslations?.name || doctor?.name;
  const department = doctorTranslations?.department || doctor?.department;
  const academicQualification = doctorTranslations?.academicQualification || doctor?.academicQualification;
  const experience = doctorTranslations?.yearsOfExperience || doctor?.experience || "4";
  const doctorImage = doctor?.icon ? `${BASE_URL}${doctor.icon}` : "/default-profile-photo.png";

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <CommonHero pageName={language === "bn" ? "অ্যাপয়েন্টমেন্ট" : "Appointment"} />

      {/* Success & Error messages */}
      {success && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded" role="alert">
            <strong className="font-bold">{language === "bn" ? "সফল!" : "Success!"}</strong>
            <span className="ml-1">{success}</span>
          </div>
        </div>
      )}
      {error && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
            <strong className="font-bold">{language === "bn" ? "ত্রুটি!" : "Error!"}</strong>
            <span className="ml-1">{error}</span>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form className="container mx-auto px-4 my-10" onSubmit={handleSubmit}>
        <div className="bg-gray-100 p-5 md:p-8 rounded-xl border border-gray-200">
          {/* Progress Stepper */}
          <div className="flex items-center justify-between gap-2 mb-8">
            {steps.map((step) => (
              <div key={step} className="flex flex-col items-center relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    step === currentStep ? "bg-blue-600 text-white" : step < currentStep ? "bg-blue-400 text-white" : "bg-gray-300 text-white"
                  }`}
                >
                  {step}
                </div>
                <div className={`mt-2 text-sm ${step === currentStep ? "text-blue-600" : step < currentStep ? "text-blue-400" : "text-gray-400"}`}>
                  {stepLabels[step - 1]}
                </div>
              </div>
            ))}
          </div>

          {/* Step Contents */}
          {currentStep === 1 && (
            <div className="mb-6 bg-white p-4 rounded-md">
              {/* Doctor Information */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="md:col-span-1">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-600">
                    <Image src={doctorImage} alt="Doctor" width={128} height={128} />
                  </div>
                </div>
                <div className="md:col-span-4">
                  <ul className="flex flex-wrap items-center gap-4 mb-4">
                    <li className="border-2 border-blue-300 rounded-md py-1 px-3 text-blue-600">{department}</li>
                    <li className="bg-blue-600 text-white rounded-md py-1 px-3 flex items-center gap-1">
                      <Icon icon="icon-park-outline:hospital-three" width="16" height="16" />
                      {experience} {language === "bn" ? "বছর" : "Years"}
                    </li>
                  </ul>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{nameDoctor}</h3>
                  <p className="text-gray-600">{academicQualification}</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mb-6 bg-white p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-3">{translations.selectDateTime}</h3>
              <div className="flex flex-col lg:flex-row gap-6">
                <Calendar
                  onChange={setAppointmentDate}
                  value={appointmentDate}
                  minDate={new Date()}
                  tileDisabled={({ date, view }) =>
                    view === "month" && disabledDays.includes(date.getDay())
                  }
                />
                <div className="border p-4 rounded-md w-full">
                  <h4 className="text-center font-semibold mb-3">{translations.availableFor}</h4>
                  <ul className="grid grid-cols-2 gap-3">
                    {scheduleWithDayNumbers.map((item, idx) => {
                      const isValidTime = (time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
                      const formatTime = (time) => {
                        if (!isValidTime(time)) return time;
                        return new Date(`2025-01-01T${time}:00`).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true
                        });
                      };
                      return (
                        <li
                          key={idx}
                          className={`p-2 border text-center rounded-md ${
                            isValidTime(item.startTime) && isValidTime(item.endTime)
                              ? "bg-blue-50 border-blue-200"
                              : "bg-red-100 border-red-300"
                          }`}
                        >
                          <strong>{item.day}:</strong> {formatTime(item.startTime)} - {formatTime(item.endTime)}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="mb-6 bg-white p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-3">{translations.stepLabels[2]}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">{translations.patientName} <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    className="w-full border p-2 rounded"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">{translations.phone} <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    name="mobile"
                    className="w-full border p-2 rounded"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="8801XXXXXXXX"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">{translations.weight}</label>
                  <input
                    type="text"
                    name="weight"
                    className="w-full border p-2 rounded"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block mb-1">{translations.age}</label>
                  <input
                    type="text"
                    name="age"
                    className="w-full border p-2 rounded"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block mb-1">{translations.address}</label>
                  <input
                    type="text"
                    name="address"
                    className="w-full border p-2 rounded"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block mb-1">{translations.visitReason}</label>
                  <textarea
                    name="reason"
                    rows="3"
                    className="w-full border p-2 rounded"
                    value={formData.reason}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="mb-6 bg-white p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-3">{translations.stepLabels[3]}</h3>
              {otpSent ? (
                <div>
                  <label className="block mb-1">{translations.enterOtp}</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleOtpSubmit}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    {translations.verifyOtp}
                  </button>
                </div>
              ) : (
                <p className="text-gray-600">
                  {language === "bn"
                    ? "আপনার মোবাইল নম্বরে OTP পাঠাতে ফর্ম সাবমিট করুন।"
                    : "Submit the form to send OTP to your mobile number."}
                </p>
              )}
            </div>
          )}

          {currentStep === 5 && (
            <div className="mb-6 bg-white p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-3">{translations.stepLabels[4]}</h3>
              <p className="mb-3">
                {language === "bn"
                  ? "আপনার এপয়েন্টমেন্ট নিশ্চিত করতে নিচের বোতামে ক্লিক করুন"
                  : "Click the button below to confirm your appointment booking."}
              </p>
              <button
                type="button"
                onClick={bookAppointment}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                {language === "bn" ? "এপয়েন্টমেন্ট নিশ্চিত করুন" : "Confirm Appointment"}
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between border-t pt-4 mt-4">
            {currentStep > 1 && (
              <button
                type="button"
                className="px-4 py-2 bg-gray-600 text-white rounded flex items-center"
                onClick={prevStep}
                disabled={submitting}
              >
                <Icon icon="mynaui:chevron-left" width="24" height="24" />
                {translations.previous}
              </button>
            )}
            {currentStep < steps.length && (
              <button
                type="submit"
                className="ml-auto px-4 py-2 bg-blue-600 text-white rounded flex items-center"
                disabled={submitting}
              >
                {currentStep < 4 ? translations.next : translations.submit}
                <Icon icon="mynaui:chevron-right" width="24" height="24" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Appointment;
