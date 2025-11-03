"use client";
import React from 'react';
import { Icon } from '@iconify/react';
import headerLogo from "../../assets/images/logo-white.png";
import Image from 'next/image';
import Link from 'next/link';

// Helper: Format time from "HH:MM" to "h:mm A"
const formatTime = (time) => {
  if (!time || typeof time !== "string" || !/^\d{2}:\d{2}$/.test(time)) return "N/A";
  const [hours, minutes] = time.split(":");
  const date = new Date();
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
};

export const AppointmentPrintLayout = ({ 
  className, 
  formData, 
  doctor, 
  value, 
  language, 
  appointmentId 
}) => {
  if (!doctor || !formData || !value) return null;

  // --- Get Data for Printing ---
  const { translations, schedule } = doctor;
  const docName = translations?.name || doctor.name || "N/A";
  const docDept = translations?.department || doctor.department || "N/A";
  const docQual = translations?.academicQualification || doctor.academicQualification || "N/A";
  const fee = translations?.appointmentFee || doctor.regularFee || "1000";

  // Find the schedule for the selected day
  const dayOfWeek = value.getDay(); // 0 = Sunday
  const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayOfWeek];
  const selectedDay = schedule?.find(s => s.day === dayName);

  const timeSlot = (selectedDay && selectedDay.startTime !== "Closed")
    ? `${formatTime(selectedDay.startTime)} - ${formatTime(selectedDay.endTime)}`
    : (language === "bn" ? "উপলব্ধ নয়" : "Not Available");

  const appointmentDate = value.toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const title = language === "bn" ? "অ্যাপয়েন্টমেন্ট স্লিপ" : "Appointment Slip";

  return (
    <div className={className} style={{ display: 'none' }}>
      <style>
        {`
          @media print {
           @page {
              size: A4;
              margin: 0;
            }
          .print-hide-element{
              display: none !important;
              visibility: hidden !important;
          }
          form.container.mx-auto.my-20,.footer{
              display: none !important;
          }
            body * {
              visibility: hidden;
            }
            .print-wrapper, .print-wrapper * {
              visibility: hidden;
            }
            .${className}, .${className} * {
              visibility: visible;
            }
            .${className} {
              display: block !important;
            }
            .footer-area, .footer-shape, th {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            .print-patient-grid {
              column-count: 2 !important;
              column-gap: 20px;
              margin-top: 10px;
            }
            .print-doctor-grid {
              column-count: 1; 
            }
           .print-container {
              position: absolute;
              top: 0; left: 0; right: 0; bottom: 0;
              overflow: hidden;
              page-break-inside: avoid;
            }
            .print-info-block, .print-schedule-block {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              page-break-inside: avoid;
            }
            .print-bg-force {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !imptant;
            }
            .header-gradient {
              background: linear-gradient(120deg, #323290, #009650)!important;
            }
            .footer-shape {
              content: '';
              position: absolute;
              top: 0;
              right: 0;
              width: 150px;
              height: 100%;
              background-color: #009650 !important;
              clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
            }
            .print-title {
              margin-bottom: 1.5rem;
              text-align: center;
              font-size: 1.5rem;
              font-weight: bold;
              color: #323290;
              text-decoration: underline;
            }
            .print-container .print-info-grid {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 10pt;
            }
            .print-container .print-info-grid strong {
              color: #333;
              font-weight: bold;
            }
            .print-container::before {
              content: "Mukti Hospital";
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 100pt;
              font-weight: bold;
              color: rgba(0, 0, 0, 0.04);
              pointer-events: none;
              z-index: -1;
              white-space: nowrap;
            }
            .print-schedule-styles {
              background-color: #f7f9ff !important;
              border: 1px solid #e0e5f5 !important;
              padding: 15px 20px !important;
              page-break-inside: avoid;
            }
            .print-time-highlight {
              background-color: #e8f5e8 !important;
              color: #009650 !important;
              padding: 3px 8px !important;
              border-radius: 4px;
              font-size: 14pt !important;
            }
            .print-container .note-box {
              border-left: 4px solid #323290;
              padding: 10px;
              font-size: 8pt;
              margin-top: 20px;
              color: #555;
            }
          }
        `}
      </style>
      
      {/* The Printable HTML Structure */}
      <div className="print-container text-gray-800">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 px-[20mm] text-white header-gradient print-bg-force">
          <div className="logo-container">
            <Image 
              src={headerLogo}
              alt="Mukti Hospital Logo" 
              width={192}
              height={40}
              className="h-auto w-48" 
              priority
            />
          </div>
          <div className="text-right text-xs">
            <p className="mb-1">+880 1601-666893</p>
            <p className="mb-1">muktihospitalpvtlimited@gmail.com</p>
            <p>https://muktihospital.com</p>
          </div>
        </div>

        {/* Content */}
        <div className="px-[20mm] content-wrapper">
          <div className="pt-[110px] pb-[90px]">
            <h1 className="print-title">{title}</h1>
          <div className="print-info-block border-2 border-[#323290] p-4 mb-4 rounded-md">
            <h2 className="text-sm font-bold text-[#323290] mb-2 uppercase border-b border-dashed border-gray-300 pb-1">
                {language === 'bn' ? 'রোগীর বিবরণ' : 'Patient Details'}
            </h2>
            <div className="print-info-grid print-patient-grid">
                <div className='w-full'>
                    <p><strong>{language === 'bn' ? 'নাম' : 'Patient Name'}:</strong> {formData.name}</p>
                    <p><strong>{language === 'bn' ? 'ফোন' : 'Phone'}:</strong> {formData.mobile}</p>
                    <p><strong>{language === 'bn' ? 'বয়স' : 'Age'}:</strong> {formData.age || 'N/A'}</p>
                    <p><strong>{language === 'bn' ? 'ওজন' : 'Weight'}:</strong> {formData.weight || 'N/A'}</p>
                    <p><strong>{language === 'bn' ? 'ঠিকানা' : 'Address'}:</strong> {formData.address || 'N/A'}</p>
                </div>
            </div>
        </div>

  {/* 3. DOCTOR & FEE BLOCK */}
  <div className="print-info-block bg-[#f7f9ff] border-2 border-[#009650] p-4 mb-4 rounded-md">
      <h2 className="text-sm font-bold text-[#009650] mb-2 uppercase border-b border-dashed border-gray-300 pb-1">
          {language === 'bn' ? 'ডাক্তার ও ফি' : 'Doctor & Fee Details'}
      </h2>
      <div className="print-info-grid print-doctor-grid">
          <div className='w-full'>
              <p><strong>{language === 'bn' ? 'ডাক্তারের নাম' : 'Doctor Name'}:</strong> {docName}</p>
              <p><strong>{language === 'bn' ? 'বিভাগ' : 'Department'}:</strong> {docDept}</p>
              <p><strong>{language === 'bn' ? 'যোগ্যতা' : 'Qualification'}:</strong> {docQual}</p>
              <p><strong>{language === 'bn' ? 'পরামর্শ ফি' : 'Consultation Fee'}:</strong> ৳{fee}</p>
          </div>
      </div>
  </div>

  {/* 4. APPOINTMENT TIME BLOCK - Clear, single row at the bottom */}
  <div className="print-schedule-block print-bg-force p-4 mb-4 rounded-md print-schedule-styles">
      
      <div className="flex justify-between items-start mb-3 border-b border-dashed border-gray-300 pb-2">
          {/* Date (Left Column) */}
          <div className="w-1/2">
              <p className="text-xs font-bold text-gray-500 uppercase">
                  {language === 'bn' ? 'অ্যাপয়েন্টমেন্টের তারিখ' : 'Appointment Date'}
              </p>
              <p className="text-base font-semibold text-gray-800 mt-1">
                  {appointmentDate}
              </p>
          </div>
          
          {/* Reference ID (Right Column) */}
          <div className="w-1/2 text-right">
              <p className="text-xs font-bold text-red-600 uppercase">
                  {language === 'bn' ? 'রেফারেন্স আইডি' : 'Reference ID'}
              </p>
              <p className="text-base font-extrabold text-red-600 mt-1">
                  {appointmentId || `MUKTI-${Date.now().toString().substring(7)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`}
              </p>
          </div>
      </div>
      
      {/* Time Slot */}
      <div className="flex justify-center items-center pt-2">
          <h3 className="text-sm font-bold text-gray-500 mr-4">
              {language === 'bn' ? 'উপলব্ধ সময়:' : 'Available Time Slot:'}
          </h3>
          <p className="text-lg font-extrabold text-[#323290] print-time-highlight">
              {timeSlot}
          </p>
      </div>
    </div>
          <div className="w-1/2">
             <div className="note-box">
                <p><strong>{language === 'bn' ? 'নির্দেশনা' : 'Instructions'}:</strong></p>
                <ul className="list-disc pl-5">
                  <li>{language === 'bn' ? 'অনুগ্রহ করে ১৫ মিনিট আগে আসুন' : 'Please arrive 15 minutes early.'}</li>
                  <li>{language === 'bn' ? 'যেকোনো প্রশ্নের জন্য যোগাযোগ করুন' : 'Contact us for any queries.'}</li>
                  {formData.reason && <li><strong>{language === 'bn' ? 'ভিজিটের কারণ' : 'Reason for Visit'}:</strong> {formData.reason}</li>}
                </ul>
             </div>
          </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0">
        <div className="relative bg-[#e8f0ed] p-3 px-[20mm] print-bg-force">
          <div className="footer-shape print-bg-force"></div>
          <div className="relative z-10 grid grid-cols-2 gap-x-5 gap-y-1 text-[8pt] text-gray-800">   
            {/* 1. Phone Icon */}
            <p className="flex items-center gap-2">
              <Icon icon="ic:baseline-phone" width={10} /> 
              <span>+880 1601-666893</span>
            </p>
            
            {/* 2. Map Icon */}
            <p className="flex items-center gap-2">
              <Icon icon="material-symbols:location-on" width={10} /> 
              <span>Race Course, Sasongacha, Cumilla</span>
            </p>
            
            {/* 3. Email Icon */}
            <p className="flex items-center gap-2">
              <Icon icon="material-symbols:mail" width={10} /> 
              <span>muktihospitalpvtlimited@gmail.com</span>
            </p>
            
            {/* 4. Globe Icon */}
            <a href="https://muktihospital.com" className="flex items-center gap-2">
              <Icon icon="material-symbols:language" width={10} /> 
              <span>https://muktihospital.com</span>
            </a>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="flex items-center justify-between bg-gray-800 p-2 px-[20mm] text-[8pt] text-white print-bg-force">
          <p>Software Powered By: Microters</p>
          <div className="flex items-center gap-4">
            {/* 5. Microters Globe Icon */}
            <Link href="https://microters.com" className="flex items-center gap-1.5">
              <Icon icon="material-symbols:language" width={10} /> 
                https://microters.com
            </Link>
            {/* 6. Microters Phone Icon */}
            <p className="flex items-center gap-1.5">
              <Icon icon="ic:baseline-phone" width={10} /> 
              +880 162-519-2766
            </p>
          </div>
        </div>
       </div>
      </div>
    </div>
  );
};