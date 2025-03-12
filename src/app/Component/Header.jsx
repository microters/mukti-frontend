"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../utils/AuthContext";

import callIcon from "@/assets/images/phone2.png";
import mailIcon from "@/assets/images/mail.png";
import Logo from "@/assets/images/logo-white.png";
import LanguageChanger from "./LanguageChanger";

const Header = () => {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const { user, logout } = useAuth();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSubMenu = (index, hasSubMenu, event) => {
    if (!hasSubMenu) return;
    event.preventDefault();
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };


  const handleLogout = () => {
    logout(); // Call logout function from context
    setDropdownOpen(false); // Close the dropdown after logout
  };

  if (!isMounted) return null;

  const menuItems = [
    { label: t("header.home"), href: "/", hasSubMenu: false },
    {
      label: t("header.findDoctor"),
      href: "#",
      hasSubMenu: true,
      subMenus: [
        { label: t("header.searchSpecialty"), href: "#" },
        { label: t("header.searchName"), href: "#" },
        { label: t("header.bookAppointment"), href: "#" },
      ],
    },
    {
      label: t("header.patientCare"),
      href: "#",
      hasSubMenu: true,
      subMenus: [
        { label: t("header.healthPackages"), href: "#" },
        { label: t("header.medicalServices"), href: "#" },
        { label: t("header.emergencyServices"), href: "#" },
      ],
    },
    {
      label: t("header.department"),
      href: "#",
      hasSubMenu: true,
      subMenus: [
        { label: t("header.cardiology"), href: "#" },
        { label: t("header.neurology"), href: "#" },
        { label: t("header.orthopedics"), href: "#" },
      ],
    },
    { label: t("header.doctor"), href: "http://localhost:3000/doctor", hasSubMenu: false },
    { label: t("header.aboutUs"), href: "#", hasSubMenu: false },
    { label: t("header.newsMedia"), href: "#", hasSubMenu: false },
  ];

  return (
    <div>
      <div className="bg-M-heading-color">
        <div className="container mx-auto px-2 py-4 flex justify-between items-center gap-3">
          <Link href="/">
            <Image
              src={Logo}
              alt="logo"
              width={200}
              className="w-32 sm:w-auto"
            />
          </Link>
          <div>
            <ul className="flex flex-wrap gap-4">
              <li>
                <Link
                  href="/signin"
                  className="flex gap-1 sm:gap-2 items-center bg-[#615EFC]/10 border border-white/30 px-1 sm:px-2 py-1 rounded-md font-jost font-normal text-xs sm:text-base text-white hover:border-M-primary-color hover:bg-M-primary-color transition-all duration-300"
                >
                  <Icon icon="uiw:login" width="15" />
                  <span>{t("header.signIn")}</span>
                </Link>
              </li>
              <li className="hidden lg:block">
                <Link
                  href={"tel:+880 1601 666-893"}
                  className="flex gap-2 items-center bg-[#615EFC]/10 border border-white/30 px-2 py-1 rounded-md font-jost font-normal text-base text-white hover:border-M-primary-color hover:text-M-primary-color transition-all duration-300"
                >
                  <Image src={callIcon} alt="call" width={20} />
                  <span>+880 1601 666-893</span>
                </Link>
              </li>
              <li>
                {/* Language switcher */}
                <div className="flex gap-1 sm:gap-2 items-center bg-[#615EFC]/10 border border-white/30 px-1 sm:px-2 py-1 rounded-md font-jost font-normal text-xs sm:text-base text-white hover:border-M-primary-color hover:text-M-primary-color transition-all duration-300">
                  <Icon
                    icon="fluent:globe-20-regular"
                    width="20"
                    className="text-white"
                  />
                  <LanguageChanger/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Large Device menu */}
      <nav className="container mx-auto px-2 py-3 hidden lg:flex gap-4 justify-between">
        <div>
          <ul className="flex gap-6 xl:gap-10 h-full">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`relative group before:w-[1px] before:h-1/3 before:bg-[#D2D6FF] before:-right-3 xl:before:-right-5 before:top-1/2 before:-translate-y-1/2 before:absolute last:before:hidden ${
                  item.hasSubMenu ? "hasSubMenus" : ""
                }`}
              >
                <Link
                  href={item.href || "#"} // Ensure href is never undefined
                  prefetch={true}
                  className="font-jost font-medium h-full text-M-heading-color text-xs lg:text-sm xl:text-base uppercase flex items-center hover:text-M-primary-color active:text-M-primary-color transition-all duration-300"
                >
                  {item.label}
                  {item.hasSubMenu && (
                    <Icon
                      icon="iconamoon:arrow-down-2-bold"
                      width="20"
                      className="ml-1 transition-transform block"
                    />
                  )}
                </Link>
                {item.hasSubMenu && (
                  <ul className="w-56 absolute top-full left-0 bg-white border-t-2 border-b-2 border-M-primary-color py-2 shadow-lg rounded-md hidden group-hover:block z-10">
                    {item.subMenus.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subItem.href || "#"} // Ensure href is never undefined
                          className="block py-2 px-4 font-jost font-medium text-base text-M-heading-color transition-all duration-300 active:bg-slate-200 hover:bg-slate-200 hover:text-M-primary-color "
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Link
            href={"#"}
            className="bg-M-secondary-color font-jost font-medium uppercase rounded-md text-xs lg:text-base text-white px-3 py-2 lg:px-4 lg:py-3 inline-flex gap-1 items-center transition-all duration-300 hover:bg-M-heading-color "
          >
            Appointment <Icon icon="basil:arrow-right-solid" width="24" />
          </Link>
        </div>

        {/* Profile Section - Will hide when user logs out */}
        {user && (
          <div className="relative">
            <button
              className="flex items-center gap-3 p-2 rounded-md transition-all"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.profilePhoto ? (
                <img
                  src={`http://localhost:5000${user.profilePhoto}`}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <Icon icon="mingcute:user-4-fill" width="24" height="24" />
              )}
              <span className="text-sm">{user.name}</span>
              {dropdownOpen ? (
                <Icon icon="lsicon:up-outline" width="18" height="18" />
              ) : (
                <Icon icon="lsicon:down-filled" width="18" height="18" />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-[100%] bg-gray-100 rounded-md shadow-lg overflow-hidden z-50">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 transition-all"
                >
                  <Icon icon="ic:outline-dashboard" width="24" height="24" /> Dashboard
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 transition-all"
                >
                  <Icon icon="mingcute:user-4-fill" width="24" height="24" /> Profile
                </Link>
                <button
                  onClick={handleLogout} // Use logout function from the context
                  className="flex items-center gap-3 px-4 py-2 w-full text-left text-red-400 hover:bg-red-100 hover:text-red-600 transition-all"
                >
                  <Icon icon="uil:signout" width="24" height="24" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      <div className="container mx-auto px-2 py-3 flex lg:hidden justify-between items-center relative">
        <button onClick={toggleMenu}>
          <Icon
            icon={openMenu ? "mingcute:close-line" : "mynaui:menu"}
            width="30"
          />
        </button>
        <Link
          href={"#"}
          className="bg-M-secondary-color font-jost font-medium uppercase rounded-md text-xs lg:text-base text-white px-3 py-2 lg:px-4 lg:py-3 inline-flex gap-1 items-center transition-all duration-300 hover:bg-M-heading-color"
        >
          Appointment <Icon icon="basil:arrow-right-solid" width="24" />
        </Link>

        <nav
          className={`w-full absolute top-full left-0  px-2 shadow-lg rounded-md z-50 ${openMenu ? "max-h-[400px] overflow-y-auto" : "max-h-0 overflow-hidden"} transition-all duration-300`}
        >
          <ul className="flex divide-y-2 flex-col bg-white border-t-2 border-b-2 border-M-primary-color">
            {menuItems.map((item, index) => (
              <li key={index} className={`relative group ${item.hasSubMenu ? "hasSubMenus" : ""}`}>
                <Link
                  href={item.href || "#"} // Ensure href is never undefined
                  onClick={(e) => toggleSubMenu(index, item.hasSubMenu, e)}
                  className="font-jost font-medium h-full text-M-heading-color text-base uppercase flex items-center justify-between px-3 py-3 hover:text-M-primary-color active:text-M-primary-color transition-all duration-300"
                >
                  {item.label}
                  {item.hasSubMenu && (
                    <Icon
                      icon="iconamoon:arrow-down-2-bold"
                      width="20"
                      className={`ml-1 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>
                {item.hasSubMenu && (
                  <ul
                    className={`w-full top-full left-0 bg-white divide-y-2 overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-auto" : "max-h-0"}`}
                  >
                    {item.subMenus.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subItem.href || "#"} // Ensure href is never undefined
                          className="block pl-6 py-3 hover:text-M-primary-color active:text-M-primary-color transition-all duration-300"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;

