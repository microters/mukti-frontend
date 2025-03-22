"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

// Assets and API calls
import waveShape2 from "@/assets/images/waveShape2.png";
import waveShape3 from "@/assets/images/waveShape3.png";
import halfCircle from "@/assets/images/half-circle.png";
import { fetchDoctors } from "@/app/api/doctor";
import FormButton from "@/app/Component/Shared/Buttons/FormButton";
import { useAuth } from "@/app/[locale]/utils/AuthContext";
import { fetchDepartments } from "@/app/api/department";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

// Helper function to format time in Bangladeshi format (12-hour with AM/PM)
const formatTimeToBD = (timeString, language = "en") => {
  try {
    // Parse time (expecting format like "14:30:00" or "14:30")
    const timeParts = timeString.split(":");
    let hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    // Convert to 12-hour format
    const ampm =
      hours >= 12
        ? language === "bn"
          ? "অপরাহ্ন"
          : "PM"
        : language === "bn"
          ? "পূর্বাহ্ন"
          : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12

    // Format the time with leading zeros for minutes
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Convert to Bangla numerals if language is Bengali
    if (language === "bn") {
      const englishToBanglaDigits = {
        0: "০",
        1: "১",
        2: "২",
        3: "৩",
        4: "৪",
        5: "৫",
        6: "৬",
        7: "৭",
        8: "৮",
        9: "৯",
      };

      const banglaHours = hours
        .toString()
        .split("")
        .map((digit) => englishToBanglaDigits[digit] || digit)
        .join("");
      const banglaMinutes = formattedMinutes
        .toString()
        .split("")
        .map((digit) => englishToBanglaDigits[digit] || digit)
        .join("");

      return `${banglaHours}:${banglaMinutes} ${ampm}`;
    }

    return `${hours}:${formattedMinutes} ${ampm}`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return timeString; // Return original time string in case of error
  }
};

// Helper function to format day names in Bangla
const getDayName = (day, language = "en") => {
  if (language !== "bn") return day;

  const dayTranslations = {
    Monday: "সোমবার",
    Tuesday: "মঙ্গলবার",
    Wednesday: "বুধবার",
    Thursday: "বৃহস্পতিবার",
    Friday: "শুক্রবার",
    Saturday: "শনিবার",
    Sunday: "রবিবার",
  };

  return dayTranslations[day] || day;
};

const Appointment = ({ appointmentSection }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";

  const translations =
    appointmentSection?.translations?.[currentLanguage] || {};
  const { image } = translations;
  const appointmentImage = image
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${image.replace(/\\/g, "/")}`
    : appointment;

  const ticketRef = useRef(null);

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const [formData, setFormData] = useState({
    departmentId: "",
    doctorId: "",
    day: "",
    patientName: "",
    phone: "",
  });

  // Get user data
  const auth = useAuth() || {};
  const { user } = auth;

  // ✅ Pre-fill `patientName` and `phone` once when user data is available
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      patientName: prev.patientName || user?.name || "",
      phone: prev.phone || user?.mobile || "",
    }));
  }, [user]);

  useEffect(() => {
    const fetchDepartmentsData = async () => {
      try {
        const data = await fetchDepartments();
        setDepartments(data || []);
      } catch (error) {
        console.error("❌ Error fetching departments:", error);
      }
    };
    fetchDepartmentsData();
  }, []);

  useEffect(() => {
    const fetchDoctorsData = async () => {
      try {
        const data = await fetchDoctors();
        setDoctors(data || []);
      } catch (error) {
        console.error("❌ Error fetching doctors:", error);
      }
    };
    fetchDoctorsData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    if (e.target.name === "departmentId") {
      const department = departments.find((dept) => dept.id === e.target.value);
      setSelectedDepartment(department || null);
    }
  };

  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    const doctor = doctors.find((doc) => doc.id === doctorId);
    setSelectedDoctor(doctor || null);
    setAvailableDates(doctor ? doctor.schedule : []);
    setFormData((prev) => ({ ...prev, doctorId, day: "" }));
  };

  const handleDownloadTicket = async () => {
    if (ticketRef.current) {
      try {
        const canvas = await html2canvas(ticketRef.current, {
          scale: 2,
          backgroundColor: "#ffffff",
          logging: false,
        });

        canvas.toBlob(function (blob) {
          saveAs(
            blob,
            `appointment-${formData.patientName.replace(/\s+/g, "-")}.png`
          );
        });

        toast.success(t("Ticket Downloaded Successfully"));
      } catch (error) {
        console.error("Error downloading ticket:", error);
        toast.error(t("Failed to download ticket"));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { departmentId, doctorId, day, patientName, phone } = formData;

    if (!departmentId || !doctorId || !day || !patientName || !phone.trim()) {
      alert(t("please_fill_all_fields"));
      console.error("❌ Missing fields:", {
        departmentId,
        doctorId,
        day,
        patientName,
        phone,
      });
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/patient/appointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify({
            departmentId,
            doctorId,
            day,
            patientName,
            phone,
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "❌ Failed to book appointment");
      }

      const appointmentData = await response.json();

      // Find the selected day/time slot
      const selectedSlot = availableDates.find(
        (slot) => slot.day === formData.day
      );

      // Create appointment details for the success modal
      const appointmentDetails = {
        id: appointmentData.id || Math.random().toString(36).substr(2, 9),
        patientName: formData.patientName,
        phone: formData.phone,
        doctorName: selectedDoctor
          ? selectedDoctor.translations[currentLanguage]?.name ||
            selectedDoctor.name
          : "",
        departmentName: selectedDepartment
          ? selectedDepartment.translations[currentLanguage]?.name ||
            selectedDepartment.name
          : "",
        day:
          currentLanguage === "bn"
            ? getDayName(formData.day, "bn")
            : formData.day,
        timeSlot: selectedSlot
          ? `${formatTimeToBD(selectedSlot.startTime, currentLanguage)} - ${formatTimeToBD(selectedSlot.endTime, currentLanguage)}`
          : "",
        date: new Date().toISOString().split("T")[0],
      };

      setAppointmentDetails(appointmentDetails);
      setShowSuccessModal(true);
      toast.success(t("Appointment Success"));
    } catch (error) {
      console.error("❌ Error booking appointment:", error);
      alert(`${t("appointment_failed")}: ${error.message}`);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    // Reset form after closing the modal
    setFormData({
      departmentId: "",
      doctorId: "",
      day: "",
      patientName: "",
      phone: "",
    });
  };

  return (
    <div className="bg-[url('/assets/section-bg.png')] bg-left-bottom md:rounded-[40px] relative">
      <Image
        src={waveShape2}
        alt="wave shape"
        className="absolute right-0 top-[10%] animate-bounce hidden lg:block"
      />
      <Image
        src={waveShape3}
        alt="wave shape"
        className="absolute left-0 bottom-[30%] animate-pulse hidden lg:block"
      />
      <Image
        src={halfCircle}
        alt="half circle"
        className="absolute right-[5%] bottom-[15%] animate-spin hidden lg:block"
      />

      <div className="container flex justify-between items-center gap-20 py-12 lg:py-24">
        <div className="max-w-[400px] mx-auto lg:ml-4 w-full relative before:w-full before:h-full before:border before:border-M-primary-color before:-left-[20px] before:-top-[20px] before:absolute before:z-[0] before:rounded-[40px] before:hidden md:before:block">
          <div className="w-full relative z-10 bg-white py-8 px-4 md:p-8 rounded-lg md:rounded-[40px] shadow-lg">
            <h2 className="text-2xl font-semibold text-[#24285B] mb-2 text-center">
              Can't find what are you looking for?
            </h2>
            <p className="font-jost font-normal text-base text-M-text-color text-center mb-6">
              Fill this form for callback from us.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder={t("appointment.patientName")}
                  className="appointment-input-field"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("appointment.phoneNumber")}
                  className="appointment-input-field"
                  required
                />
              </div>
              <div>
                <div className=" relative">
                  <input
                    type="checkbox"
                    id="agreement"
                    className="hidden peer"
                  />
                  <span className="h-4 w-4 border flex-none border-M-text-color/50 rounded inline-flex items-center justify-center ltr:mr-3 rtl:ml-3 transition-all duration-150 bg-slate-100 peer-checked:bg-M-primary-color peer-checked:ring-1 peer-checked:ring-M-primary-color peer-checked:ring-offset-1 absolute top-[6px] left-0 z-0">
                    <Icon
                      icon="mynaui:check"
                      width="24"
                      className="text-slate-100"
                    />
                  </span>
                  <label
                    htmlFor="agreement"
                    className="cursor-pointer font-jost font-normal text-base text-M-text-color relative z-10 pl-6"
                  >
                    Get updated on whatsapp & accept T&C
                  </label>
                </div>
              </div>
              <button className="font-bold font-jost text-base md:text-xs xl:text-lg text-white py-3 px-3 md:px-3 lg:px-8 w-full bg-M-primary-color flex items-center justify-center gap-2 rounded-md uppercase transition-all duration-300 hover:bg-M-secondary-color">
                {" "}
                <Icon icon="solar:call-medicine-linear" width="24" /> Request
                callback
              </button>
            </form>
          </div>
        </div>

        <div className="hidden lg:block w-1/2">
          <Image
            src={appointmentImage}
            width={500}
            height={500}
            style={{ width: "100%" }}
            alt="appointment"
            unoptimized={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Appointment;
