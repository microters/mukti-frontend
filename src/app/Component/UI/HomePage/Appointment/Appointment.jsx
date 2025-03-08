"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

// Assets
import waveShape2 from "@/assets/images/waveShape2.png";
import waveShape3 from "@/assets/images/waveShape3.png";
import halfCircle from "@/assets/images/half-circle.png";
import appointment from "@/assets/images/appointment.png";
import { getDepartments } from "@/app/api/Category/Category";
import { fetchDoctors } from "@/app/api/doctor";

const Appointment = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || "en"; // Default language

  // ✅ State for data & form
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    departmentId: "",
    doctorId: "",
    day: "",
    patientName: "",
    phone: "",
  });

  // ✅ Fetch Departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        console.log("Fetched Departments:", data);
        setDepartments(data || []);
      } catch (error) {
        console.error("❌ Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  // ✅ Fetch Doctors
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await fetchDoctors();
        console.log("Fetched Doctors:", data);
        setDoctors(data || []);
      } catch (error) {
        console.error("❌ Error fetching doctors:", error);
      }
    };
    fetchDoctor();
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Doctor Selection & Fetch Available Days
  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    const doctor = doctors.find((doc) => doc.id === doctorId);

    setSelectedDoctor(doctor || null);
    setAvailableDates(doctor ? doctor.schedule : []);
    setFormData({ ...formData, doctorId, day: "" });
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { departmentId, doctorId, day, patientName, phone } = formData;

    if (!departmentId || !doctorId || !day || !patientName || !phone) {
      alert(t("please_fill_all_fields"));
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/patient/appointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY, // ✅ Secure API Key
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN || ""}`, // (Optional)
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

      alert(t("appointment_success"));
      setFormData({
        departmentId: "",
        doctorId: "",
        day: "",
        patientName: "",
        phone: "",
      });
    } catch (error) {
      console.error("❌ Error booking appointment:", error);
      alert(`${t("appointment_failed")}: ${error.message}`);
    }
  };

  return (
    <div className="bg-[url('../../public/assets/section-bg.png')] bg-left-bottom md:rounded-[40px] relative">
      <Image
        src={waveShape2}
        alt="shape1"
        className="absolute right-0 top-[10%] animate-bounce hidden lg:block"
      />
      <Image
        src={waveShape3}
        alt="shape1"
        className="absolute left-0 bottom-[30%] animate-pulse hidden lg:block"
      />
      <Image
        src={halfCircle}
        alt="shape1"
        className="absolute right-[5%] bottom-[15%] animate-spin hidden lg:block"
      />

      <div className="container flex justify-between items-center gap-20 py-24">
        <div className="max-w-[400px] mx-auto lg:ml-4 w-full relative before:w-full before:h-full before:border before:border-M-primary-color before:-left-[20px] before:-top-[20px] before:absolute before:z-[0] before:rounded-[40px] before:hidden md:before:block">
          <div className="w-full relative z-10 bg-white py-8 px-4 md:p-8 rounded-lg md:rounded-[40px] shadow-lg">
            <h2 className="text-2xl font-semibold text-[#24285B] mb-6 text-center">
              {t("bookAppointment")}
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Department Selection */}
              <div>
                <select
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={handleChange}
                  className="appointment-input-field"
                  required
                >
                  <option value="">{t("selectDepartment")}</option>
                  {departments.length > 0 ? (
                    departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.translations[currentLanguage]?.name ||
                          department.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>{t("loading")}</option>
                  )}
                </select>
              </div>

              {/* Doctor Selection */}
              <div>
                <select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleDoctorChange}
                  className="appointment-input-field"
                  required
                >
                  <option value="">{t("selectDoctor")}</option>
                  {doctors.length > 0 ? (
                    doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.translations[currentLanguage]?.name ||
                          doctor.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>{t("loading")}</option>
                  )}
                </select>
              </div>

              {/* Available Days (Only after selecting a doctor) */}
              {selectedDoctor && (
                <div>
                  <select
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                    className="appointment-input-field"
                    required
                  >
                    <option value="">{t("selectDay")}</option>
                    {availableDates.map((slot) => (
                      <option key={slot.id} value={slot.day}>
                        {slot.day} ({slot.startTime} - {slot.endTime})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Patient Name */}
              <div>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder={t("patientName")}
                  className="appointment-input-field"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("phoneNumber")}
                  className="appointment-input-field"
                  required
                />
              </div>

              {/* Submit Button */}
              <FormButton
                buttonText={t("appointmentNow")}
                buttonColor="bg-M-heading-color"
                textColor="text-white"
                borderColor="border-M-heading-color"
                padding="py-3 px-8"
                fontSize="text-xs sm:text-lg"
                icons="iconamoon:arrow-right-2-light"
                alignment="text-center"
              />
            </form>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block w-1/2">
          <Image src={appointment} alt="appointment" />
        </div>
      </div>
    </div>
  );
};

export default Appointment;
