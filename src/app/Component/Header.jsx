import Image from "next/image";
import React from "react";
import Link from "next/link";

import callIcon from "@/../public/assets/phone2.png";
import mailIcon from "@/../public/assets/mail.png";
import Logo from "@/../public/assets/logo-white.png";
import { Icon } from "@iconify/react";

const Header = () => {
  return (
    <div>
      <div className="bg-M-heading-color">
        <div className="container mx-auto px-2 py-4 flex justify-between items-center">
          <Link href="/">
            <Image src={Logo} alt="logo" width={200} />
          </Link>
          <div>
            <ul className="flex flex-wrap gap-4">
              <li>
                <Link
                  href={"mailto:info@muktihospital.com"}
                  className="flex gap-2 items-center bg-[#615EFC]/10 border border-white/30 px-2 py-1 rounded-md font-jost font-normal text-base text-white hover:border-M-primary-color hover:text-M-primary-color transition-all duration-300"
                >
                  <Image src={mailIcon} alt="call" width={20} />
                  <span>info@muktihospital.com</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"tel:+880 1601 666-893"}
                  className="flex gap-2 items-center bg-[#615EFC]/10 border border-white/30 px-2 py-1 rounded-md font-jost font-normal text-base text-white hover:border-M-primary-color hover:text-M-primary-color transition-all duration-300"
                >
                  <Image src={callIcon} alt="call" width={20} />
                  <span>info@muktihospital.com</span>
                </Link>
              </li>
              <li>
                {/* Language switcher */}
                <div className="flex gap-2 items-center bg-[#615EFC]/10 border border-white/30 px-2 py-1 rounded-md font-jost font-normal text-base text-white hover:border-M-primary-color hover:text-M-primary-color transition-all duration-300">
                    <Icon icon="fluent:globe-20-regular" width="20" className="text-white" />
                  <select className="bg-transparent border-none ring-0 focus:ring-0 outline-none">
                    <option value="en">English</option>
                    <option value="bn">Bangla</option>
                  </select>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <nav className="container mx-auto px-2 py-3 flex gap-4 items-center justify-between" >
            <div>
                <ul className="flex gap-6">
                    <li>
                        <Link href={'#'} className="font-jost font-medium text-M-heading-color text-base uppercase">Home</Link>
                    </li>
                    <li className="relative group">
                        <Link href={'#'} className="font-jost font-medium text-M-heading-color text-base uppercase flex items-center">Home <Icon icon="iconamoon:arrow-down-2-bold" width="20" /> </Link>
                        <ul className="absolute top-full left-0 bg-white w-40 py-2 px-4 shadow-lg rounded-md hidden group-hover:block z-10">
                            <li><Link href={'#'}>Submenu 1</Link></li>
                            <li><Link href={'#'}>Submenu 1</Link></li>
                            <li><Link href={'#'}>Submenu 1</Link></li>
                        </ul>
                    </li>
                    <li className="relative group">
                        <Link href={'#'} className="font-jost font-medium text-M-heading-color text-base uppercase flex items-center">Home <Icon icon="iconamoon:arrow-down-2-bold" width="20" /> </Link>
                        <ul className="absolute top-full left-0 bg-white w-40 py-2 px-4 shadow-lg rounded-md hidden group-hover:block z-10">
                            <li><Link href={'#'}>Submenu 1</Link></li>
                            <li><Link href={'#'}>Submenu 1</Link></li>
                            <li><Link href={'#'}>Submenu 1</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div>
                <Link href={'#'} className="bg-M-secondary-color font-jost font-medium uppercase rounded-md text-base text-white px-4 py-3 inline-flex gap-1 items-center transition-all duration-300 hover:bg-M-heading-color ">Appointment <Icon icon="basil:arrow-right-solid" width="24" /></Link>
            </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
