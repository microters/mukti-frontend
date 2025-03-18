"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "../../../i18nConfig";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const languages = [
    { id: "en", name: "English", flag: "circle-flags:us" },
    { id: "bn", name: "Bangla", flag: "circle-flags:bd" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const newLocale = e.target.value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    // Ensure the page is refreshed to reflect the language change
    router.refresh();
  };

  

  return (
    <div className="relative ">
      {/* <select
              className="bg-transparent border-none ring-0 focus:ring-0 outline-none cursor-pointer w-[100px]"
              onChange={handleChange}
              value={currentLocale}
            >
              <option value="en" className="px-2 py-1">
                <Icon icon="fluent:globe-20-regular" width="20" className="text-white" />{" "} English
              </option>
              <option value="bn">Bangla</option>
            </select> */}

      {/* <select
        className="bg-transparent border-none ring-0 focus:ring-0 outline-none cursor-pointer w-[100px]"
        onChange={handleChange}
        value={currentLocale}
      >
        <option value="en" className="text-gray-700 dark:text-white">🌍 English</option>
        <option value="bn" className="text-gray-700 dark:text-white">🚩 Bangla</option>
      </select> */}

      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-1 sm:gap-2 items-center bg-[#615EFC]/10 border border-white/30 px-2 sm:px-2 py-1 rounded-md font-jost font-normal text-xs sm:text-base text-white hover:border-M-primary-color transition-all duration-300"
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">
            {" "}
            <Icon icon={selectedLanguage.flag} width="16" height="16" />
          </span>{" "}
          {selectedLanguage.name}
        </span>
        <Icon icon="ep:arrow-down" width="16" height="16" />
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
              }}
              className="flex items-center gap-2 px-2 md:px-4 py-2 hover:bg-gray-200 cursor-pointer transition-all duration-200"
            >
              <span className="text-lg">
                {" "}
                <Icon icon={lang.flag} width="16" height="16" />{" "}
              </span>{" "}
              {lang.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
