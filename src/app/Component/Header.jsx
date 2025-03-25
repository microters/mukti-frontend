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

// New function to fetch menu items from API with better error handling
const fetchMenuItems = async (language) => {
  try {
    console.log("Fetching menu items from:", `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/header`);
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/header`, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error("API response not OK:", response.status, response.statusText);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("Header data received:", data);
    
    // Check if data has translations for current language
    if (data && data.translations && data.translations[language] && data.translations[language].menus) {
      return {
        menus: data.translations[language].menus || [],
        phone: data.translations[language].phone || "+880 1601 666-893",
        logo: data.logo || null,
        contactIcon: data.contactIcon || null
      };
    }
    
    // Fallback to English if the requested language isn't available
    if (data && data.translations && data.translations.en) {
      return {
        menus: data.translations.en.menus || [],
        phone: data.translations.en.phone || "+880 1601 666-893",
        logo: data.logo || null,
        contactIcon: data.contactIcon || null
      };
    }
    
    return {
      menus: [],
      phone: "+880 1601 666-893",
      logo: null,
      contactIcon: null
    };
      
  } catch (error) {
    console.error("❌ Error fetching menu items:", error);
    return {
      menus: [],
      phone: "+880 1601 666-893",
      logo: null,
      contactIcon: null
    };
  }
};

const Header = () => {
  const { user, logout, loading } = useAuth();
  const { t, i18n } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [apiMenuItems, setApiMenuItems] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("+880 1601 666-893");
  const [logo, setLogo] = useState(null);
  const [contactIcon, setContactIcon] = useState(null);
  const currentLanguage = i18n.language || "en";

  useEffect(() => {
    setIsMounted(true);
  
    // Original department loading as in the initial implementation
    const loadDepartments = async () => {
      try {
        const deptData = await fetchDepartments(currentLanguage);
        const formattedDepartments = deptData.map((dept) => ({
          label:
            dept.translations?.[currentLanguage]?.name || dept.translations?.en?.name || "Unnamed",
          depIcon: `${process.env.NEXT_PUBLIC_BACKEND_URL}${dept.icon}`,
          href: `/treatments/${dept.slug}`,
        }));
    
        setDepartments(formattedDepartments);
      } catch (error) {
        console.error("❌ Failed to load departments:", error);
      }
    };
    loadDepartments();
    
    // New function to load menu items from API
    const loadMenuItems = async () => {
      try {
        const headerData = await fetchMenuItems(currentLanguage);
        
        // Set phone, logo and contact icon
        setPhone(headerData.phone);
        if (headerData.logo) {
          setLogo(`${process.env.NEXT_PUBLIC_BACKEND_URL}${headerData.logo}`);
        }
        
        if (headerData.contactIcon) {
          setContactIcon(`${process.env.NEXT_PUBLIC_BACKEND_URL}${headerData.contactIcon}`);
        }
        
        // Process menu items if available
        if (headerData.menus && headerData.menus.length > 0) {
          // Process menu items
          const processedMenus = headerData.menus
            .filter(item => item && typeof item === 'object') // Ensure item is a valid object
            .map(item => {
              // Skip any menu with "department" in title (we'll add it statically)
              if (item.title?.toLowerCase().includes("department")) {
                return null;
              }
              
              // Check if this is a parent menu (no parent value)
              const isParent = !item.parent || item.parent === "";
              
              if (isParent) {
                // Find all child menus for this parent
                const childMenus = headerData.menus.filter(child => 
                  child.parent === item.title && child.status === "active"
                ).map(child => ({
                  label: child.title || "",
                  href: child.link || "#",
                  buttonTitle: child.buttonTitle || "",
                  openInNewTab: child.openInNewTab || false
                }));
                
                return {
                  label: item.title || "",
                  href: item.link || "#",
                  hasSubMenu: childMenus.length > 0,
                  subMenus: childMenus.length > 0 ? childMenus : [],
                  buttonTitle: item.buttonTitle || "",
                  openInNewTab: item.openInNewTab || false,
                  order: item.order || 0,
                  status: item.status || "active"
                };
              }
              return null;
            })
            .filter(item => item !== null && item.status === "active")
            .sort((a, b) => a.order - b.order);
          
          console.log("Processed menu items:", processedMenus);
          setApiMenuItems(processedMenus);
        }
      } catch (menuError) {
        console.error("Menu loading failed:", menuError);
      }
    };
    
    loadMenuItems();
  }, [currentLanguage]);
  

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

  // Create menu items array with first 2 API items, then department, then rest of API items
  const menuItems = apiMenuItems.length > 0 
    ? [
        // First 2 API items (if available)
        ...(apiMenuItems.slice(0, 2)),
        
        // Static department menu with API-loaded submenu
        {
          label: t("header.department"),
          href: "#",
          hasSubMenu: true,
          subMenus: departments,
        },
        
        // Rest of the API menu items (after first 2)
        ...(apiMenuItems.slice(2))
      ]
    : []; // Empty if no API items
  
  // If API menus failed to load, use fallback static menus
  const fallbackMenuItems = [
    { label: t("header.home"), href: "/", hasSubMenu: false },
    { label: t("header.findDoctor"), href: "/doctor", hasSubMenu: false },
    {
      label: t("header.department"),
      href: "#",
      hasSubMenu: true,
      subMenus: departments,
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
    { label: t("header.aboutUs"), href: "/about", hasSubMenu: false },
    { label: t("header.treatment"), href: "/treatments", hasSubMenu: false },
    { label: t("header.diagnostic"), href: "/diagnostic", hasSubMenu: false },
  ];
  
  // Use API menu items and fall back to static ones if API fails
  const finalMenuItems = apiMenuItems.length > 0 ? menuItems : fallbackMenuItems;
  
  const handleNavigation = (href) => {
    setOpenMenu(false);
    setOpenIndex(null);
    // Check if we're in a browser environment before using window
    if (typeof window !== 'undefined') {
      window.location.href = href;
    }
  };

  return (
    <div>
      <div className="bg-M-heading-color">
        <div className="container mx-auto px-2 py-4 flex justify-between items-center gap-3">
        <Link href="/">
           
              <img
                src={logo}
                alt="logo"
                width={200}
                className="w-32 sm:w-52"
              />
              </Link>
          <div>
            <ul className="flex flex-wrap gap-4">
              <li className="hidden lg:block">
                <Link
                  href={`tel:${phone}`}
                  className="flex gap-2 items-center bg-[#615EFC]/10 border border-white/30 px-2 py-1 rounded-md font-jost font-normal text-base text-white hover:border-M-primary-color transition-all duration-300"
                >
                  {contactIcon ? (
                    <img src={contactIcon} alt="call" width={20} />
                  ) : (
                    <Image src={callIcon} alt="call" width={20} />
                  )}
                  <span>{phone}</span>
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
            {finalMenuItems.map((item, index) => (
              <li
                key={index}
                className={`group ${item.subMenus?.length > 8 ? "" : "relative"}  ${
                  item.hasSubMenu ? "hasSubMenus" : ""
                }`}
              >
                <Link
                  href={item.href || "#"}
                  prefetch={true}
                  target={item.openInNewTab ? "_blank" : "_self"}
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
                          href={subItem.href || "#"}
                          target={subItem.openInNewTab ? "_blank" : "_self"}
                          className="py-2 px-4 font-jost font-medium text-base text-M-heading-color transition-all duration-300 active:bg-slate-200 hover:bg-slate-200 hover:text-M-primary-color rounded-sm flex items-center gap-3"
                        >
                          {subItem.depIcon && (
                            <Image
                              src={subItem.depIcon}
                              alt={subItem.label}
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
                <span className="text-sm text-left capitalize font-medium truncate text-ellipsis w-16">
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
                      onClick={handleLogout}
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
              {finalMenuItems.map((item, index) => (
                <li
                  key={index}
                  className={`relative group ${item.hasSubMenu ? "hasSubMenus" : ""}`}
                >
                  <Link
                    href={item.href || "#"} 
                    onClick={(e) => item.hasSubMenu ? toggleSubMenu(index, item.hasSubMenu, e) : handleNavigation(item.href)}
                    target={item.openInNewTab ? "_blank" : "_self"}
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
                      className={`w-full top-full left-0 bg-white divide-y-2 overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-[1000px]" : "max-h-0"}`}
                    >
                      {item.subMenus.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.href || "#"}
                            target={subItem.openInNewTab ? "_blank" : "_self"}
                            className="flex items-center gap-3 pl-6 py-3 hover:text-M-primary-color active:text-M-primary-color transition-all duration-300"
                          >
                            {subItem.depIcon && (
                              <Image
                                src={subItem.depIcon}
                                alt={subItem.label}
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