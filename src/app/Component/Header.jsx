"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

import callIcon from "@/assets/images/phone2.png";
import Logo from "@/assets/images/logo-white.png";
import LanguageChanger from "./LanguageChanger";
import { useAuth } from "../[locale]/utils/AuthContext";
import AuthModal from "./Shared/AuthModal/AuthModal";
import { fetchDepartments } from "../api/department";

const Header = () => {
  const { user, logout, loading } = useAuth();
  const { t, i18n } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const loadDepartments = async () => {
      try {
        const deptData = await fetchDepartments(i18n.language); // Fetch department data with API key
        const formattedDepartments = deptData.map((dept) => ({
          label:
            dept.translations[i18n.language]?.name || dept.translations.en.name,
          depIcon: `${process.env.NEXT_PUBLIC_BACKEND_URL}${dept.icon}`,
          href: `/department/${dept.id}`,
        }));

        setDepartments(formattedDepartments);
      } catch (error) {
        console.error("❌ Failed to load departments:", error);
      }
    };

    loadDepartments();
  }, [i18n.language]); // Refetch when language changes

  const toggleSubMenu = (index, hasSubMenu, event) => {
    if (!hasSubMenu) return;
    event.preventDefault();
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  if (!isMounted) return null;

  const menuItems = [
    { label: t("header.home"), href: "/", hasSubMenu: false },
    { label: t("header.findDoctor"), href: "/doctor", hasSubMenu: false },
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
      subMenus: departments,
    },
    { label: t("header.aboutUs"), href: "/about", hasSubMenu: false },
    { label: t("header.treatment"), href: "/treatments", hasSubMenu: false },
    { label: t("header.diagnostic"), href: "/diagnostic", hasSubMenu: false },
  ];
  
  const handleNavigation = (href) => {
    setOpenMenu(false);
    setOpenIndex(null);
    router.push(href);
  };

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
              <li className="hidden lg:block">
                <Link
                  href={"tel:+880 1601 666-893"}
                  className="flex gap-2 items-center bg-[#615EFC]/10 border border-white/30 px-2 py-1 rounded-md font-jost font-normal text-base text-white hover:border-M-primary-color transition-all duration-300"
                >
                  <Image src={callIcon} alt="call" width={20} />
                  <span>+880 1601 666-893</span>
                </Link>
              </li>
              <li>
                {/* Language switcher */}
                  <LanguageChanger />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Large Device menu */}
      <nav className="container mx-auto px-2 hidden lg:flex gap-4 justify-between relative">
        <div>
          <ul className="flex gap-6 xl:gap-10 h-full">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`group ${item.subMenus?.length > 8 ? "" : "relative"}  ${
                  item.hasSubMenu ? "hasSubMenus" : ""
                }`}
              >
                <Link
                  href={item.href || "#"} // Ensure href is never undefined
                  prefetch={true}
                  className="font-jost font-medium h-full text-M-heading-color text-xs lg:text-sm xl:text-base uppercase flex items-center hover:text-M-primary-color active:text-M-primary-color transition-all duration-300 relative before:w-[1px] before:h-1/3 before:bg-[#D2D6FF] before:-right-3 xl:before:-right-5 before:top-1/2 before:-translate-y-1/2 before:absolute group-last:before:hidden py-7"
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
                  <ul
                    className={`absolute top-full bg-white border-t-2 border-b-2 border-M-primary-color py-2 shadow-lg rounded-md hidden  z-10 ${
                      item.subMenus.length > 8
                        ? "w-[1320px] grid grid-cols-4 gap-x-4 group-hover:grid left-1/2 -translate-x-1/2 p-3"
                        : "w-56 group-hover:block left-0"
                    }`}
                  >
                    {item.subMenus.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subItem.href || "#"} // Ensure href is never undefined
                          className="py-2 px-4 font-jost font-medium text-base text-M-heading-color transition-all duration-300 active:bg-slate-200 hover:bg-slate-200 hover:text-M-primary-color rounded-sm flex items-center gap-3"
                        >
                          {subItem.depIcon && (
                            <Image
                              src={subItem.depIcon}
                              alt="huy"
                              width={20}
                              height={20}
                            />
                          )}{" "}
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
        <div className="flex gap-4 items-center">
          <Link
            href={"/appointment"}
            className="bg-M-secondary-color font-jost font-medium uppercase rounded-md text-xs lg:text-base text-white px-3 py-2 lg:px-4 lg:py-3 inline-flex gap-1 items-center transition-all duration-300 hover:bg-M-heading-color"
          >
            {t("header.appointment")} <Icon icon="basil:arrow-right-solid" width="24" />
          </Link>

          {/* Show loading indicator while auth state is being checked */}
          {loading ? (
            <div className="bg-M-primary-color/80 font-jost font-medium uppercase rounded-md text-xs lg:text-base text-white px-4 py-3 inline-flex items-center justify-center">
              <Icon
                icon="eos-icons:loading"
                width="20"
                className="animate-spin"
              />
            </div>
          ) : (
            !user && (
              <button
                onClick={() => setShowModal(true)}
                className="bg-M-primary-color font-jost font-medium uppercase rounded-md text-xs lg:text-base text-white px-3 py-2 lg:px-4 lg:py-3 inline-flex gap-1 items-center transition-all duration-300 hover:bg-M-heading-color"
              >
                <Icon icon="uiw:login" width="15" />
                <span>{t("header.signIn")}</span>
              </button>
            )
          )}

          {/* Profile Section - Will hide when user logs out */}
          {user && (
            <div className="relative">
              <button
                className="flex items-center gap-3 rounded-md transition-all border border-M-primary-color/80 py-[7px] px-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.profilePhoto ? (
                  <img
                    src={`http://api.muktihospital.com${user.profilePhoto}`}
                    alt="User Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <Icon
                    icon="mingcute:user-4-fill"
                    width="24"
                    height="24"
                    className="text-M-heading-color"
                  />
                )}
                <span className="text-sm font-medium truncate text-ellipsis w-16">
                  {user.name}
                </span>
                <Icon
                  icon="lsicon:up-outline"
                  width="18"
                  height="18"
                  className={`transition-all duration-300 ${dropdownOpen ? "" : "rotate-180"}`}
                />
              </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-[200px] bg-M-section-bg rounded-md shadow-lg overflow-hidden z-50 border-b-2 border-t-2 border-M-primary-color">
                    <Link
                      href="https://dashboard-muktidigital.netlify.app/"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-M-text-color/10 transition-all font-jost font-normal text-base text-black"
                    >
                      <Icon
                        icon="ic:outline-dashboard"
                        width="24"
                        height="24"
                        className="shrink-0"
                      />{" "}
                      Dashboard
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-2 hover:bg-M-text-color/10 transition-all font-jost font-normal text-base text-black"
                    >
                      <Icon
                        icon="mingcute:user-4-fill"
                        width="24"
                        height="24"
                        className="shrink-0"
                      />{" "}
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout} // Use logout function from the context
                      className="flex items-center gap-3 px-4 py-2 w-full text-left font-jost font-normal text-base text-M-secondary-color/80 hover:bg-M-secondary-color/10 hover:text-M-secondary-color transition-all"
                    >
                      <Icon
                        icon="uil:signout"
                        width="24"
                        height="24"
                        className="shrink-0"
                      />
                      Logout
                    </button>
                  </div>
                )}
                
              </div>
            )}
            </div>
      </nav>

      {/* Mobile Menu */}
      <div className="border-b border-M-text-color/10">
        <div className="container mx-auto px-2 py-3 flex lg:hidden justify-between items-center relative">
          <button onClick={toggleMenu}>
            <Icon
              icon={openMenu ? "mingcute:close-line" : "mynaui:menu"}
              width="30"
            />
          </button>
          <div className="flex items-center gap-3">
            <Link
              href={"/appointment"}
              className="bg-M-secondary-color font-jost font-medium uppercase rounded-md text-xs lg:text-base text-white px-3 py-2 lg:px-4 lg:py-3 inline-flex gap-1 items-center transition-all duration-300 hover:bg-M-heading-color"
            >
              {t("header.appointment")} <Icon icon="basil:arrow-right-solid" width="24" />
            </Link>

            {/* Show loading indicator while auth state is being checked on mobile */}
            {loading ? (
              <div className="bg-M-primary-color/80 font-jost font-medium uppercase rounded-md text-xs text-white px-3 py-3 inline-flex items-center justify-center">
                <Icon
                  icon="eos-icons:loading"
                  width="18"
                  className="animate-spin"
                />
              </div>
            ) : (
              !user && (
                <Link
                  href={"/signin"}
                  className="bg-M-primary-color font-jost font-medium uppercase rounded-md text-xs lg:text-base text-white px-3 py-3 lg:px-4 lg:py-3 inline-flex gap-2 items-center transition-all duration-300 hover:bg-M-heading-color"
                >
                  <Icon icon="uiw:login" width="15" />
                  <span>{t("header.signIn")}</span>
                </Link>
              )
            )}

            {/* User profile on mobile */}
            {user && (
              <button
                className="flex items-center gap-2 p-2 rounded-md"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.profilePhoto ? (
                  <img
                    src={`http://api.muktihospital.com${user.profilePhoto}`}
                    alt="User Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="bg-M-primary-color p-2 rounded-full">
                    <Icon
                      icon="mingcute:user-4-fill"
                      width="20"
                      height="20"
                      className="text-white"
                    />
                  </div>
                )}
              </button>
            )}
          </div>

        {/* Mobile dropdown for user */}
        {user && dropdownOpen && (
          <div className="absolute right-2 top-full w-48 bg-white rounded-md shadow-lg overflow-hidden z-50 border-t-2 border-b-2 border-M-primary-color">
            <div className="px-4 py-2 border-b border-gray-200 font-jost text-base">
              <p className="font-medium">{user.name}</p>
            </div>
            <Link
              href="https://dashboard-muktidigital.netlify.app/"
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-all font-jost text-base"
            >
              <Icon icon="ic:outline-dashboard" width="20" height="20" />{" "}
              Dashboard
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-all font-jost text-base"
            >
              <Icon icon="mingcute:user-4-fill" width="20" height="20" />{" "}
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 w-full text-left font-jost font-normal text-base text-M-secondary-color/80 hover:bg-M-secondary-color/10 hover:text-M-secondary-color transition-all"
            >
              <Icon icon="uil:signout" width="20" height="20" /> Logout
            </button>
          </div>
        )}

          <nav
            className={`w-full absolute top-full left-0  px-2 shadow-lg rounded-md z-50 ${openMenu ? "max-h-[400px] overflow-y-auto" : "max-h-0 overflow-hidden"} transition-all duration-300`}
          >
            <ul className="flex divide-y-2 flex-col bg-white border-t-2 border-b-2 border-M-primary-color">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`relative group ${item.hasSubMenu ? "hasSubMenus" : ""}`}
                >
                  <Link
                    href={item.href || "#"} onClick={(e) => item.hasSubMenu ? toggleSubMenu(index, item.hasSubMenu, e) : handleNavigation(item.href)}
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
                            className="flex items-center gap-3 pl-6 py-3 hover:text-M-primary-color active:text-M-primary-color transition-all duration-300"
                          >
                            {subItem.depIcon && (
                              <Image
                                src={subItem.depIcon}
                                alt="huy"
                                width={20}
                                height={20}
                              />
                            )}{" "}
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

      {/* Authentication modal */}
      {showModal && (
        <AuthModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default Header;
