import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import profileImage from "@/assets/images/profileAvatar.png";

const DoctorsCard = ({ doctor }) => {
  if (!doctor) return null; // Prevents rendering if doctor data is missing

  // Ensure translations exist before accessing them
  const enTranslation = doctor.translations?.en || {};
  
  const profileLink = doctor.id ? `/doctor/${doctor.id}` : "#";
  const appointmentLink = doctor.id ? `/book-appointment/${doctor.id}` : "#";

  return (
    <div className="border-2 rounded-md overflow-hidden transition-all duration-300 group hover:border-M-primary-color flex flex-col justify-between">
      <div className="flex flex-col md:flex-row py-7 px-6 gap-7">
        {/* Doctor Image */}
        <div className="border-2 border-transparent size-24 rounded-full overflow-hidden transition-all duration-300 group-hover:border-M-primary-color shrink-0">
          <Image
            // src={doctor.profilePhoto || profileImage} 
            src={profileImage}
            alt={enTranslation.name || "Doctor"}
            width={96}
            height={96}
            className="w-full rounded-full object-cover"
            priority 
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          <ul className="flex flex-wrap items-center gap-4 mb-5">
            {/* Department */}
            <li className="border-2 border-[#00224F50] inline-block w-auto rounded-md py-2 px-4 text-M-primary-color text-base font-jost font-normal">
              {enTranslation.department || "Unknown"}
            </li>
            
            {/* Reviews */}
            <li className="bg-[#323290] inline-flex items-center gap-1 rounded-md py-2 px-4 font-jost font-normal text-base text-white">
              <Icon icon="material-symbols-light:star" width="24" height="24" className="text-[#F1E132]" />
              ({doctor.reviews || 0})
            </li>
          </ul>

          {/* Doctor Name */}
          <h3 className="text-[#323290] text-xl font-jost font-bold mb-4">
            <Link href={profileLink} className="hover:text-M-primary-color transition-all duration-300 capitalize">
              {enTranslation.name || "No Name Available"}
            </Link>
          </h3>

          {/* Academic Qualification */}
          <p className="text-M-text-color text-base font-normal font-jost flex items-center gap-2">
            <Icon icon="oui:index-open" width="24" className="text-M-heading-color" />
            {enTranslation.academicQualification || "N/A"}
          </p>

          {/* Location */}
          <p className="text-M-text-color text-base font-normal font-jost flex items-center gap-2 mt-2 capitalize">
            <Icon icon="mdi:location-on-outline" width="24" className="text-M-heading-color" /> Mukti Hospital
          </p>
        </div>
      </div>

      {/* Appointment Button */}
      <Link
        href={appointmentLink}
        className="bg-[#E8EEF4] text-[#00224F] text-lg w-full py-3 px-3 block text-center font-bold font-jost hover:bg-M-primary-color hover:text-white transition-all duration-300"
      >
        Book An Appointment
      </Link>
    </div>
  );
};

export default DoctorsCard;
