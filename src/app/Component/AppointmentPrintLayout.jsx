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
           .print-container {
               position: absolute;
               top: 0; left: 0; right: 0; bottom: 0;
               overflow: hidden;
               page-break-inside: avoid;
               height: 100vh;
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
          <div className="print-info-grid">
            {/* Patient & Doctor Info */}
            <div className='w-1/2'>
              <p><strong>{language === 'bn' ? 'রোগীর নাম' : 'Patient Name'}:</strong> {formData.name}</p>
              <p><strong>{language === 'bn' ? 'ফোন' : 'Phone'}:</strong> {formData.mobile}</p>
              <p><strong>{language === 'bn' ? 'বয়স' : 'Age'}:</strong> {formData.age || 'N/A'}</p>
              <p><strong>{language === 'bn' ? 'ওজন' : 'Weight'}:</strong> {formData.weight || 'N/A'}</p>
              <p><strong>{language === 'bn' ? 'ঠিকানা' : 'Address'}:</strong> {formData.address || 'N/A'}</p>
              <p><strong>{language === 'bn' ? 'অ্যাপয়েন্টমেন্টের তারিখ' : 'Appointment Date'}:</strong> {appointmentDate}</p>
            </div>
            <div className='w-1/2'>
              <p><strong>{language === 'bn' ? 'ডাক্তারের নাম' : 'Doctor Name'}:</strong> {docName}</p>
              <p><strong>{language === 'bn' ? 'বিভাগ' : 'Department'}:</strong> {docDept}</p>
              <p><strong>{language === 'bn' ? 'যোগ্যতা' : 'Qualification'}:</strong> {docQual}</p>
              <p><strong>{language === 'bn' ? 'পরামর্শ ফি' : 'Consultation Fee'}:</strong> ৳{fee}</p>
              <p><strong>{language === 'bn' ? 'রেফারেন্স আইডি' : 'Reference ID'}:</strong> {appointmentId || 'N/A'}</p>
              <p><strong>{language === 'bn' ? 'উপলব্ধ সময়' : 'Available Time Slot'}:</strong> {timeSlot}</p>
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