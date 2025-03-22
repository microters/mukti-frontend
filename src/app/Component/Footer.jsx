import Image from "next/image";
import React from "react";

import Logo from "@/assets/images/logo-white.png";
import gPlay from "@/assets/images/google-play.png";
import appStore from "@/assets/images/app-store.png";
import callIcon from "@/assets/images/phone1.png";
import shape from "@/assets/images/shape.png";
import Link from "next/link";
import { Icon } from "@iconify/react";

const doctors = [
  "Dr. Neo",
  "Dr. Smith",
  "Dr. Adams",
  "Dr. Patel",
  "Dr. Johnson",
  "Dr. Lee",
  "Dr. Brown",
  "Dr. Williams",
  "Dr. Garcia",
  "Dr. Miller",
  "Dr. Davis",
  "Dr. Rodriguez",
  "Dr. Martinez",
  "Dr. Hernandez",
  "Dr. Lopez",
  "Dr. Gonzalez",
  "Dr. Wilson",
  "Dr. Anderson",
  "Dr. Thomas",
  "Dr. Taylor",
];

const footerMenuItems = [
  { label: "Find A Doctor", href: "/doctor" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Condition", href: "#" },
];

const treatmentList1 = [
  { label: "Orthopaedics", href: "#" },
  { label: "Nephrology & Urology", href: "#" },
  { label: "Bariatric Surgery", href: "#" },
  { label: "Cardiology", href: "#" },
  { label: "Pulmonology", href: "#" },
  { label: "Gastroenterology", href: "#" },
];

const treatmentList2 = [
  { label: "Oncology", href: "#" },
  { label: "Neurology & Neurosurgery", href: "#" },
  { label: "Organ Transplantation", href: "#" },
  { label: "Robotic Surgery", href: "#" },
  { label: "Preventive Health Check Up", href: "#" },
  { label: "ProHealth", href: "#" },
];

const diagnosticList = [
  { label: "Cardiac Health Package", href: "#" },
  { label: "Cancer Screening - Male", href: "#" },
  { label: "Bone Health Package", href: "#" },
  { label: "Cardiac Health Package", href: "#" },
  { label: "Dengue Fever Panel", href: "#" },
];

const Footer = () => {
  return (
    <div>
      <div className=" bg-[#00224F] py-24 px-3 relative">
        <Image
          src={shape}
          alt="shape"
          className="hidden md:block absolute left-0 top-[25%] w-36 "
        />
        <Image
          src={shape}
          alt="shape"
          className="hidden md:block absolute right-0 bottom-0 w-36 "
        />
        <div className="container mx-auto pb-20">
          <div className="flex flex-wrap justify-between gap-8">
            <div className="w-[320px]">
              <Image src={Logo} alt="logo" width={200} />
              <p className="text-white text-base font-jost font-normal my-5">
                Mukti Hospital now has a convenient mobile app that allows you
                to search for healthcare providers, schedule appointments, and
                access patient resources on the go. Mukti Hospital now has a
                convenient mobile app that allows you to search for healthcare
                providers, schedule appointments, and access patient resources
                on the go.
              </p>

              <div className="flex items-start gap-5 mt-4">
                <div>
                  <Image
                    src={callIcon}
                    alt="Call Icon"
                    width={24}
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
            {/* Patient Care */}
            <div>
              <h4 className="text-white text-base md:text-xl font-jost font-bold uppercase">
                Quick Links
              </h4>
              <ul className="mt-4 md:mt-6 space-y-4">
                {footerMenuItems.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="footer-menu-list-item">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Our Treatments */}
            <div>
              <h4 className="text-white text-base md:text-xl font-jost font-bold uppercase">
                Our Treatments
              </h4>
              <ul className="mt-4 md:mt-6 space-y-4">
                {treatmentList1.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="footer-menu-list-item">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Our Treatments */}
            <div>
              <h4 className="text-white text-base md:text-xl font-jost font-bold uppercase">
                Our Treatments
              </h4>
              <ul className="mt-4 md:mt-6 space-y-4">
                {treatmentList2.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="footer-menu-list-item">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Diagnostic */}
            <div>
              <h4 className="text-white text-base md:text-xl font-jost font-bold uppercase">
                Diagnostic
              </h4>
              <ul className="mt-4 md:mt-6 space-y-4">
                {diagnosticList.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="footer-menu-list-item">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="container mx-auto border-t border-[#39CABB]/10 pt-5">
          <h3 className="text-white text-xl font-jost font-bold">
            Popular Doctors:{" "}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-4">
            {doctors.map((doctor, index) => (
              <li key={index}>
                <Link
                  href={"#"}
                  className="py-2 px-4 font-jost font-medium text-sm border border-[#39CABB]/10 rounded-sm inline-block text-white bg-transparent transition-all duration-300 hover:bg-[#39CABB]"
                >
                  {doctor}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-[#39CABB]">
        <div className="container py-2 px-2 flex flex-wrap justify-center text-center md:justify-between gap-3 items-center mx-auto">
          <p className="font-jost font-medium text-sm text-white">
            © Copyright {new Date().getFullYear()}. Mukti Hospital. All Rights
            Reserved.
          </p>
          <ul className="flex gap-4">
            <li>
              <Link
                href={"#"}
                className="size-9 inline-flex items-center justify-center rounded-full bg-M-secondary-color hover:bg-M-heading-color transition-all duration-300 border-2 border-[#fd7578] hover:border-M-heading-color/50 text-white "
              >
                <Icon icon="ri:facebook-fill" width="19" />
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="size-9 inline-flex items-center justify-center rounded-full bg-M-secondary-color hover:bg-M-heading-color transition-all duration-300 border-2 border-[#fd7578] hover:border-M-heading-color/50 text-white "
              >
                <Icon icon="ri:twitter-x-fill" width="19" />
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="size-9 inline-flex items-center justify-center rounded-full bg-M-secondary-color hover:bg-M-heading-color transition-all duration-300 border-2 border-[#fd7578] hover:border-M-heading-color/50 text-white "
              >
                <Icon icon="ri:instagram-line" width="19" />
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="size-9 inline-flex items-center justify-center rounded-full bg-M-secondary-color hover:bg-M-heading-color transition-all duration-300 border-2 border-[#fd7578] hover:border-M-heading-color/50 text-white "
              >
                <Icon icon="ri:linkedin-fill" width="19" />
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="size-9 inline-flex items-center justify-center rounded-full bg-M-secondary-color hover:bg-M-heading-color transition-all duration-300 border-2 border-[#fd7578] hover:border-M-heading-color/50 text-white "
              >
                <Icon icon="ri:youtube-fill" width="19" />
              </Link>
            </li>
          </ul>
          <ul className="flex flex-wrap gap-5 justify-center">
            <li className="relative before:w-[1px] before:h-2/3 before:bg-white before:absolute before:-right-3 before:top-1/2 before:-translate-y-1/2 last:before:hidden">
              {" "}
              <Link
                href={"#"}
                className="font-jost font-normal text-xs md:text-sm text-white hover:text-M-heading-color uppercase transition-all duration-300"
              >
                Contact us
              </Link>
            </li>
            <li className="relative before:w-[1px] before:h-2/3 before:bg-white before:absolute before:-right-3 before:top-1/2 before:-translate-y-1/2 last:before:hidden">
              {" "}
              <Link
                href={"#"}
                className="font-jost font-normal text-xs md:text-sm text-white hover:text-M-heading-color uppercase transition-all duration-300"
              >
                Privacy policy
              </Link>
            </li>
            <li className="relative before:w-[1px] before:h-2/3 before:bg-white before:absolute before:-right-3 before:top-1/2 before:-translate-y-1/2 last:before:hidden">
              {" "}
              <Link
                href={"#"}
                className="font-jost font-normal text-xs md:text-sm text-white hover:text-M-heading-color uppercase transition-all duration-300"
              >
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
