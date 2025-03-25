'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import callIcon from "@/assets/images/phone1.png";
import shape from "@/assets/images/shape.png";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

const FooterProvider = ({ doctors }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  // Set the base URL for images from the API
  const baseUrl = "http://localhost:5000";

  const [footerData, setFooterData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/footer");
        console.log("Raw response:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Parsed data:", data);
        // Access the language-specific data from the translations property
        setFooterData(data.translations[currentLang] || data.translations.en);
      } catch (err) {
        console.error("Error fetching footer data:", err);
        setError(err.message);
      }
    };

    fetchFooterData();
  }, [currentLang]);

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4">
        Error loading footer data: {error}
      </div>
    );
  }

  if (!footerData) {
    return <div>Loading footer...</div>;
  }

  const {
    footerLogo,
    description,
    contact,
    sections,
    copyright,
    socialLinks,
    listItems,
  } = footerData;

  // Map sections from API data
  const patientCareSection = sections.PatientCare;
  const treatmentsSection = sections.Treatments;
  const quickLinksSection = sections.QuickLinks;
  // Using "QuickLinks" as the Diagnostic section
  const diagnosticSection = sections.Diagnostic;

  // Sort and slice doctors by experience
  const topDoctorsByExperience = [...doctors]
    .sort((docA, docB) => {
      const docTransA = docA.translations[currentLang] || docA.translations.en || {};
      const docTransB = docB.translations[currentLang] || docB.translations.en || {};
      const expA = parseInt(docTransA.yearsOfExperience, 10) || 0;
      const expB = parseInt(docTransB.yearsOfExperience, 10) || 0;
      return expB - expA;
    })
    .slice(0, 12);

  return (
    <div>
      <div className="bg-[#00224F] py-24 px-3 relative">
        <Image
          src={shape}
          alt="shape"
          className="hidden md:block absolute left-0 top-[25%] w-36"
        />
        <Image
          src={shape}
          alt="shape"
          className="hidden md:block absolute right-0 bottom-0 w-36"
        />
        <div className="container mx-auto pb-20">
          <div className="flex flex-wrap justify-between gap-8">
            {/* Left Section: Logo, description and emergency call */}
            <div className="w-[320px]">
              {/* Prepend baseUrl to the footerLogo */}
              <Image 
                src={`${baseUrl}${footerLogo}`} 
                alt="logo" 
                width={200} 
                height={100} 
              />
              <p className="text-white text-base font-jost font-normal my-5">
                {description}
              </p>
              <div className="flex items-start gap-5 mt-4">
                <div>
                  {/* Prepend baseUrl to contact.logo */}
                  <Image
                    src={`${baseUrl}${contact.logo}`}
                    alt="Contact Logo"
                    width={24}
                    height={24}
                    className="relative top-2"
                  />
                </div>
                <div>
                  <p className="text-base text-white font-jost font-semibold mb-1 capitalize">
                    Emergency call
                  </p>
                  <Link
                    href="tel:+8801234567890"
                    className="text-white font-jost font-base text-base hover:text-M-primary-color transition-all duration-300"
                  >
                    +880 123 456 7890
                  </Link>
                </div>
              </div>
            </div>

            {/* Patient Care Section */}
            {quickLinksSection && (
              <div>
                <h4 className="text-white text-base md:text-xl font-jost font-bold uppercase">
                  {quickLinksSection.title}
                </h4>
                <ul className="mt-4 md:mt-6 space-y-4">
                  {quickLinksSection.links.map((item, index) => (
                    <li key={index}>
                      <Link href={item.url} className="footer-menu-list-item">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {patientCareSection && (
              <div>
                <h4 className="text-white text-base md:text-xl font-jost font-bold uppercase">
                  {patientCareSection.title}
                </h4>
                <ul className="mt-4 md:mt-6 space-y-4">
                  {patientCareSection.links.map((item, index) => (
                    <li key={index}>
                      <Link href={item.url} className="footer-menu-list-item">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Treatments Section */}
            {treatmentsSection && (
              <div>
                <h4 className="text-white text-base md:text-xl font-jost font-bold uppercase">
                  {treatmentsSection.title}
                </h4>
                <ul className="mt-4 md:mt-6 space-y-4">
                  {treatmentsSection.links.map((item, index) => (
                    <li key={index}>
                      <Link href={item.url} className="footer-menu-list-item">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Diagnostic Section */}
            {diagnosticSection && (
              <div>
                <h4 className="text-white text-base md:text-xl font-jost font-bold uppercase">
                  {diagnosticSection.title}
                </h4>
                <ul className="mt-4 md:mt-6 space-y-4">
                  {diagnosticSection.links.map((item, index) => (
                    <li key={index}>
                      <Link href={item.url} className="footer-menu-list-item">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="container mx-auto border-t border-[#39CABB]/10 pt-5">
          <h3 className="text-white text-xl font-jost font-bold">
            Popular Doctors:
          </h3>
          <ul className="mt-4 flex flex-wrap gap-4">
            {topDoctorsByExperience.map((doc) => {
              const docTrans = doc.translations[currentLang] || doc.translations.en || {};
              const profileLink = doc.slug ? `/doctor/${doc.slug}` : "#";
              return (
                <li key={doc.id}>
                  <Link
                    href={profileLink}
                    className="py-2 px-4 font-jost font-medium text-sm border border-[#39CABB]/10 rounded-sm inline-block text-white bg-transparent transition-all duration-300 hover:bg-[#39CABB]"
                  >
                    {docTrans.name || "Unnamed Doctor"}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="bg-[#39CABB]">
        <div className="container py-2 px-2 flex flex-wrap justify-center text-center md:justify-between gap-3 items-center mx-auto">
          <p className="font-jost font-medium text-sm text-white">
            {copyright}
          </p>
          <ul className="flex gap-4">
            {socialLinks.facebook && (
              <li>
                <Link
                  href={socialLinks.facebook}
                  className="size-9 inline-flex items-center justify-center rounded-full bg-M-secondary-color hover:bg-M-heading-color transition-all duration-300 border-2 border-[#fd7578] hover:border-M-heading-color/50 text-white"
                >
                  <Icon icon="ri:facebook-fill" width="19" />
                </Link>
              </li>
            )}
            {socialLinks.twitter && (
              <li>
                <Link
                  href={socialLinks.twitter}
                  className="size-9 inline-flex items-center justify-center rounded-full bg-M-secondary-color hover:bg-M-heading-color transition-all duration-300 border-2 border-[#fd7578] hover:border-M-heading-color/50 text-white"
                >
                  <Icon icon="ri:twitter-x-fill" width="19" />
                </Link>
              </li>
            )}
            {socialLinks.instagram && (
              <li>
                <Link
                  href={socialLinks.instagram}
                  className="size-9 inline-flex items-center justify-center rounded-full bg-M-secondary-color hover:bg-M-heading-color transition-all duration-300 border-2 border-[#fd7578] hover:border-M-heading-color/50 text-white"
                >
                  <Icon icon="ri:instagram-line" width="19" />
                </Link>
              </li>
            )}
            {socialLinks.linkedin && (
              <li>
                <Link
                  href={socialLinks.linkedin}
                  className="size-9 inline-flex items-center justify-center rounded-full bg-M-secondary-color hover:bg-M-heading-color transition-all duration-300 border-2 border-[#fd7578] hover:border-M-heading-color/50 text-white"
                >
                  <Icon icon="ri:linkedin-fill" width="19" />
                </Link>
              </li>
            )}
            {socialLinks.youtube && (
              <li>
                <Link
                  href={socialLinks.youtube}
                  className="size-9 inline-flex items-center justify-center rounded-full bg-M-secondary-color hover:bg-M-heading-color transition-all duration-300 border-2 border-[#fd7578] hover:border-M-heading-color/50 text-white"
                >
                  <Icon icon="ri:youtube-fill" width="19" />
                </Link>
              </li>
            )}
          </ul>
          <ul className="flex flex-wrap gap-5 justify-center">
            {listItems.map((item, index) => (
              <li
                key={index}
                className="relative before:w-[1px] before:h-2/3 before:bg-white before:absolute before:-right-3 before:top-1/2 before:-translate-y-1/2 last:before:hidden"
              >
                <Link
                  href={item.url}
                  className="font-jost font-normal text-xs md:text-sm text-white hover:text-M-heading-color uppercase transition-all duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterProvider;
