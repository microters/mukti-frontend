

"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import callIcon from "@/assets/images/phone2.png";
import { useAuth } from "@/app/[locale]/utils/AuthContext";
import LanguageChanger from "../LanguageChanger";
import AuthModal from "../Shared/AuthModal/AuthModal";
import Skeleton from "react-loading-skeleton";
import { fetchDepartments } from "@/app/api/department";
import { fetchHeaderData } from "@/app/api/dynamicData,";

const HeaderProvider = ({ header, departments }) => {
  const { user, logout, loading } = useAuth();
  const { t, i18n } = useTranslation();



  const [openIndex, setOpenIndex] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const currentLanguage = i18n.language || "en";
  const [phone, setPhone] = useState(
    header?.translations?.[currentLanguage]?.phone || "+880 1601 666-893"
  );
  const [logo, setLogo] = useState(
    header?.logo ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${header.logo}` : null
  );
  const [contactIcon, setContactIcon] = useState(
    header?.contactIcon
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${header.contactIcon}`
      : null
  );



  // Guard clause for early return until data is loaded
  if (!header || !departments) {
    return (
      <div className="container mx-auto py-4">
        <Skeleton height={50} width={200} />
        <Skeleton height={30} width={`80%`} className="mt-2" />
      </div>
    );
  }

  // Process menu items
  const headerMenus =
    header?.translations?.[currentLanguage]?.menus?.filter(
      (menu) => menu.status === "active"
    ) || [];
  const sortedMenus = [...headerMenus].sort((a, b) => a.order - b.order);
  const topMenus = sortedMenus.filter((menu) => !menu.parent);
  const menuItemsFromHeader = topMenus.map((menu) => {
    const children = sortedMenus.filter((item) => item.parent === menu.title);
    return {
      label: menu.buttonTitle,
      href: menu.link,
      hasSubMenu: children.length > 0,
      subMenus: children.map((child) => ({
        label: child.buttonTitle,
        href: child.link,
      })),
    };
  });

  const departmentMenu = {
    label: currentLanguage === "bn" ? "বিভাগ" : "Department",
    href: "#",
    hasSubMenu: true,
    subMenus: departments.map((dept) => ({
      label:
        dept.translations?.[currentLanguage]?.name ||
        dept.translations?.en?.name ||
        "Unnamed",
      href: `/department/${dept.slug}`,
      depIcon: dept.icon
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${dept.icon}`
        : "/path/to/placeholder-image.png",
    })),
  };

  const desiredIndex = 3;
  let menuItems = [...menuItemsFromHeader];

  if (menuItems.length >= desiredIndex) {
    menuItems.splice(desiredIndex, 0, departmentMenu);
  } else {
    menuItems.push(departmentMenu);
  }

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

  const handleNavigation = (href) => {
    setOpenMenu(false);
    setOpenIndex(null);
    if (typeof window !== "undefined") {
      window.location.href = href;
    }
  };

  return (
    <div>
      <div className="bg-M-heading-color">
        <div className="container mx-auto px-2 py-4 flex justify-between items-center gap-3">
          <Link href="/">
            {logo ? (
              <img src={logo} alt="logo" width={200} className="w-32 sm:w-52" />
            ) : (
              <Skeleton width={150} height={40} />
            )}
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
            {menuItems.map((item, index) => (
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
                    className={`absolute top-full bg-white border-t-2 border-b-2 border-M-primary-color hidden py-2 shadow-lg rounded-md z-10 ${
                      item.subMenus.length > 8
                        ? "w-[1320px] grid grid-cols-4 gap-x-4 group-hover:grid left-1/2 -translate-x-1/2 p-3"
                        : "w-56 group-hover:block left-0 p-3"
                    }`}
                  >
                    {item.subMenus.map((subItem, subIndex) => (
                      <li key={subIndex} className="group/item">
                        <Link
                          href={subItem.href || "#"}
                          target={subItem.openInNewTab ? "_blank" : "_self"}
                          onClick={() => handleNavigation(subItem.href)}
                          className="py-3 px-3 font-jost font-medium text-base text-M-heading-color transition-all  duration-300 flex items-center gap-3  border-b border-gray-200 rounded-none hover:bg-M-primary-color hover:text-white hover:rounded-md"
                        >
                          {subItem.depIcon && (
                            <span className="border border-M-heading-color/5 bg-M-primary-color/10 w-9 h-9 flex items-center justify-center rounded-full group-hover/item:border-M-primary-color transition-all duration-300 group-hover/item:bg-white">
                              <Image
                                src={subItem.depIcon}
                                alt={subItem.label}
                                width={20}
                                height={20}
                              />
                            </span>
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
            {t("header.appointment")}{" "}
            <Icon icon="basil:arrow-right-solid" width="24" />
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
                    className="w-8 h-8 rounded-full object-cover"
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
                    href="https://app.muktihospital.com"
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
                    href="https://app.muktihospital.com/profile"
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
              {t("header.appointment")}{" "}
              <Icon icon="basil:arrow-right-solid" width="24" />
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
                href="https://api.muktihospital.com/"
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
                    href={item.href || "#"}
                    onClick={(e) =>
                      item.hasSubMenu
                        ? toggleSubMenu(index, item.hasSubMenu, e)
                        : handleNavigation(item.href)
                    }
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
                            onClick={() => handleNavigation(subItem.href)}
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

export default HeaderProvider;
