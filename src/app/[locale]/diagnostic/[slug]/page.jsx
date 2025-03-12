import CommonHero from "@/app/Component/UI/CommonHero";
import Image from "next/image";
import React from "react";

import featuredImage from "@/assets/images/diagonisticMainImage.png";
import { Icon } from "@iconify/react";
import Link from "next/link";
import AppointmentForm from "@/app/Component/Shared/AppointmentForm/AppointmentForm";
import DiagnosticPlanCard from "@/app/Component/UI/DiagnosticPlanCard";

import dimg2 from "@/assets/images/dimg2.png";
import dimg3 from "@/assets/images/dimg3.png";

const SingleDiagnostic = () => {
  const DiagnosticTabContent = [
    {
      test_name: "25-OH Vitamin D",
      price: "৳ 5000",
      description: "Comprehensive vitamin D status check and consultation",
      included_tests: ["Vitamin D blood level", "Bone density evaluation"],
      imageSrc: dimg2,
      detailsLink: "/details/vitamin-d",
      bookingLink: "/booking/vitamin-d",
    },
    {
      test_name: "HIV Test",
      price: "৳ 3000",
      description: "Confidential HIV screening with follow-up support",
      included_tests: ["HIV antibody test", "Counseling session"],
      imageSrc: dimg3,
      detailsLink: "/details/hiv-test",
      bookingLink: "/booking/hiv-test",
    },
    {
      test_name: "25-OH Vitamin D",
      price: "৳ 5000",
      description: "Comprehensive vitamin D status check and consultation",
      included_tests: ["Vitamin D blood level", "Bone density evaluation"],
      imageSrc: dimg2,
      detailsLink: "/details/vitamin-d",
      bookingLink: "/booking/vitamin-d",
    },
  ];

  return (
    <div>
      <CommonHero pageName="Cancer Screening" />

      {/* Single Diagnostic Area */}
      <div className="container mx-auto pb-24 px-4 relative -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 gap-y-8">
          <div className="col-span-2 bg-white px-4 py-8 md:p-10 rounded-md shadow-md">
            <Image
              src={featuredImage}
              alt="featuredImage"
              className="mb-5 border border-M-text-color/10 rounded-md"
            />
            <h3 className="font-extrabold text-2xl md:text-3xl text-black mb-2">
              Cancer Screening
            </h3>
            <p className="text-M-text-color text-base font-jost mb-4">
              Cancer screening plays a crucial role in identifying cancer at an
              early stage, often before symptoms appear. Early detection
              increases the chances of successful treatment and improves
              survival rates. Our specialized cancer screening services use
              advanced diagnostic tools to detect potential risks, helping you
              take proactive steps toward your health.
            </p>
            <p className="text-M-text-color text-base font-jost mb-4">
              Cancer screening plays a crucial role in identifying cancer at an
              early stage, often before symptoms appear. Early detection
              increases the chances of successful treatment and improves
              survival rates. Our specialized cancer screening services use
              advanced diagnostic tools to detect potential risks, helping you
              take proactive steps toward your health.
            </p>
            <h3 className="font-extrabold text-2xl md:text-3xl text-black mb-2">
              Types of Cancer Screenings We Offer:
            </h3>
            <p className="text-M-text-color text-base font-jost mb-4">
              Cancer screening is recommended based on age, family history,
              lifestyle, and risk factors. Consult with our specialists to
              determine the right screening tests for youCancer screening is
              recommended based on age, family history, lifestyle, and risk
              factors. Consult with our specialists to determine the right
              screening tests for you{" "}
            </p>
            <p className="text-M-text-color text-base font-jost mb-4">
              Cancer screening is recommended based on age, family history,
              lifestyle, and risk factors. Consult with our specialists to
              determine the right screening tests for youCancer screening is
              recommended based on age, family history, lifestyle, and risk
              factors. Consult with our specialists to determine the right
              screening tests for youCancer screening is recommended based on
              age, family history, lifestyle, and risk factors. Consult with our
              specialists to determine the right screening tests for you{" "}
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
              <li className="flex items-start gap-2 font-jost text-M-text-color">
                <Icon
                  icon="si:check-line"
                  width="22"
                  height="22"
                  className="text-M-primary-color "
                />{" "}
                Blood Tests for Cancer Markers
              </li>
              <li className="flex items-start gap-2 font-jost text-M-text-color">
                <Icon
                  icon="si:check-line"
                  width="22"
                  height="22"
                  className="text-M-primary-color "
                />{" "}
                Skin Cancer Screening
              </li>
              <li className="flex items-start gap-2 font-jost text-M-text-color">
                <Icon
                  icon="si:check-line"
                  width="22"
                  height="22"
                  className="text-M-primary-color "
                />{" "}
                Colorectal Cancer Screening
              </li>
              <li className="flex items-start gap-2 font-jost text-M-text-color">
                <Icon
                  icon="si:check-line"
                  width="22"
                  height="22"
                  className="text-M-primary-color "
                />{" "}
                Prostate Cancer Screening
              </li>
              <li className="flex items-start gap-2 font-jost text-M-text-color">
                <Icon
                  icon="si:check-line"
                  width="22"
                  height="22"
                  className="text-M-primary-color "
                />{" "}
                Cervical Cancer Screening
              </li>
              <li className="flex items-start gap-2 font-jost text-M-text-color">
                <Icon
                  icon="si:check-line"
                  width="22"
                  height="22"
                  className="text-M-primary-color "
                />{" "}
                Prostate Cancer Screening
              </li>
              <li className="flex items-start gap-2 font-jost text-M-text-color">
                <Icon
                  icon="si:check-line"
                  width="22"
                  height="22"
                  className="text-M-primary-color "
                />{" "}
                Lung Cancer Screening
              </li>
              <li className="flex items-start gap-2 font-jost text-M-text-color">
                <Icon
                  icon="si:check-line"
                  width="22"
                  height="22"
                  className="text-M-primary-color "
                />{" "}
                Cervical Cancer Screening
              </li>
            </ul>
            <h3 className="font-extrabold text-2xl md:text-3xl text-black mb-2">
              Screening Inclusions
            </h3>
            <p className="text-M-text-color text-base font-jost mb-4">
              Cardiology is the branch of medicine that focuses on the heart and
              blood vessels. Cardiologists diagnose and treat conditions such as
              heart attacks, high blood pressure, arrhythmias, heart failure,
              and coronary artery disease. Regular check-ups with a cardiologist
              can help prevent serious complications and ensure your heart stays
              healthy.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 font-jost text-M-text-color">
                <Icon
                  icon="si:check-line"
                  width="22"
                  height="22"
                  className="text-M-primary-color "
                />{" "}
                Blood Tests for Cancer Markers
              </li>
              <li className="flex items-start gap-2 font-jost text-M-text-color">
                <Icon
                  icon="si:check-line"
                  width="22"
                  height="22"
                  className="text-M-primary-color "
                />{" "}
                Skin Cancer Screening
              </li>
              <li className="flex items-start gap-2 font-jost text-M-text-color">
                <Icon
                  icon="si:check-line"
                  width="22"
                  height="22"
                  className="text-M-primary-color "
                />{" "}
                Colorectal Cancer Screening
              </li>
              <li className="flex items-start gap-2 font-jost text-M-text-color">
                <Icon
                  icon="si:check-line"
                  width="22"
                  height="22"
                  className="text-M-primary-color "
                />{" "}
                Prostate Cancer Screening
              </li>
            </ul>
            <h3 className="font-extrabold text-2xl md:text-3xl text-black mb-2">
              Screening Guidelines
            </h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 font-jost text-M-text-color">
                <Icon
                  icon="mage:pin-fill"
                  width="22"
                  height="22"
                  className="text-M-secondary-color"
                />{" "}
                Follow the recommended screening schedule based on your age and
                risk factors
              </li>
              <li className="flex items-start gap-2 font-jost text-M-text-color">
                <Icon
                  icon="mage:pin-fill"
                  width="22"
                  height="22"
                  className="text-M-secondary-color"
                />{" "}
                Consult with a healthcare provider before scheduling your test
              </li>
              <li className="flex items-start gap-2 font-jost text-M-text-color">
                <Icon
                  icon="mage:pin-fill"
                  width="22"
                  height="22"
                  className="text-M-secondary-color"
                />{" "}
                Avoid certain foods, drinks, or medications before specific
                screenings
              </li>
              <li className="flex items-start gap-2 font-jost text-M-text-color">
                <Icon
                  icon="mage:pin-fill"
                  width="22"
                  height="22"
                  className="text-M-secondary-color"
                />
                Wear comfortable clothing, especially for imaging tests like
                mammograms
              </li>
            </ul>
            <h3 className="font-extrabold text-2xl md:text-3xl text-black mb-2">
              Contact us Now
            </h3>
            <p className="text-M-text-color text-base font-jost mb-4">
              Early diagnosis can save lives. Don’t wait until it’s too
              late—book your appointment today!
            </p>
            <ul className="font-jost font-normal text-base text-M-text-color space-y-2 list-none pl-0 my-5">
              <li className="flex items-start gap-2 text-sm md:text-base">
                {" "}
                <Icon
                  icon="lsicon:location-filled"
                  width="18"
                  height="18"
                  className="shrink-0 relative top-[1px] text-M-primary-color"
                />{" "}
                Visit Mukti Hospital:{" "}
                <Link
                  href="https://maps.app.goo.gl/cQ3GgXfbBXD1LRG28"
                  className="text-black hover:text-M-heading-color transition-all duration-300"
                >
                  Mukti Hospital
                </Link>
              </li>
              <li className="flex items-start gap-2 text-sm md:text-base">
                {" "}
                <Icon
                  icon="material-symbols:wifi-calling-bar-3-rounded"
                  width="18"
                  height="18"
                  className="shrink-0 relative top-[1px] text-M-primary-color"
                />{" "}
                Call Us:{" "}
                <Link
                  href="tel:01532-884758"
                  className="text-black hover:text-M-heading-color transition-all duration-300"
                >
                  01532-884758
                </Link>
              </li>
              <li className="flex items-start gap-2 text-sm md:text-base">
                {" "}
                <Icon
                  icon="circum:globe"
                  width="18"
                  height="18"
                  className="shrink-0 relative top-[1px] text-M-primary-color"
                />{" "}
                Website:{" "}
                <Link
                  href="/"
                  className="text-black hover:text-M-heading-color transition-all duration-300"
                >
                  www.muktihospital.com
                </Link>
              </li>
            </ul>
            <p className="font-jost font-normal text-M-text-color text-base">
              Take the first step towards a healthy heart with Mukti Hospital!
              ❤️
            </p>
          </div>
          {/* Sidebar */}
          <div className="col-span-1 space-y-6">
            {/* Appointment Forms */}
            <div className="bg-M-heading-color px-5 py-8 rounded-md">
              <h3 className="text-2xl mb-4 text-white text-center">
                Request for Appointment
              </h3>
              <AppointmentForm />
            </div>
            {/* Relative Doctors */}
            <div className="border border-M-text-color/20 rounded-md p-5">
              <h3 className="text-2xl mb-6 text-center border-b border-M-text-color/20 pb-3">
                Popular Packages
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                {DiagnosticTabContent.slice(0, 2).map((test, index) => (
                  <DiagnosticPlanCard
                    key={index}
                    test_name={test.test_name}
                    price={test.price}
                    description={test.description}
                    included_tests={test.included_tests}
                    imageSrc={test.imageSrc}
                    detailsLink={test.detailsLink}
                    bookingLink={test.bookingLink}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDiagnostic;
