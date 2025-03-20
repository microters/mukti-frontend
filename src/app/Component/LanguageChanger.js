"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "../../../i18nConfig";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const languages = [
    { id: "en", name: "English", flag: "circle-flags:us" },
    { id: "bn", name: "Bangla", flag: "circle-flags:bd" },
  ];

  // Set default selected language
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages.find((lang) => lang.id === currentLocale) || languages[0]
  );
  const [isOpen, setIsOpen] = useState(false);

  // Update selected language if the locale changes
  useEffect(() => {
    const foundLang = languages.find((lang) => lang.id === currentLocale);
    if (foundLang) setSelectedLanguage(foundLang);
  }, [currentLocale]);

  const changeLanguage = (newLocale) => {
    if (newLocale === currentLocale) return;

    // Set cookie for next-i18n-router
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${30 * 24 * 60 * 60}`;

    // Construct the new URL based on the locale configuration
    let newPath = currentPathname;
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      newPath = `/${newLocale}${currentPathname}`;
    } else {
      newPath = currentPathname.replace(`/${currentLocale}`, `/${newLocale}`);
    }

    // Navigate to the new path and refresh to apply changes
    router.push(newPath);
    router.refresh();
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
         className="flex gap-1 sm:gap-2 items-center bg-[#615EFC]/10 border border-white/30 px-2 sm:px-2 py-1 rounded-md font-jost font-normal text-xs sm:text-base text-white hover:border-M-primary-color transition-all duration-300"
      >
        <span className="flex items-center gap-2">
          <Icon icon={selectedLanguage.flag} width="18" height="18" />
          {selectedLanguage.name}
        </span>
        <Icon icon="ep:arrow-down" width="18" height="18" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden z-10 transition-all duration-200 divide-y font-jost">
          {languages.map((lang) => (
            <div
              key={lang.id}
              onClick={() => {
                setSelectedLanguage(lang);
                setIsOpen(false);
                changeLanguage(lang.id);
              }}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 cursor-pointer transition-all duration-200"
            >
              <Icon icon={lang.flag} width="18" height="18" />
              {lang.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
