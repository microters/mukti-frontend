"use client";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import FormButton from "@/app/Component/Shared/Buttons/FormButton";
import SectionHeading from "@/app/Component/Shared/SectionHeading/SectionHeading";

import heroImag from "@/assets/images/labHeroImg.png";
import DiagnosticPlanCard from "@/app/Component/UI/DiagnosticPlanCard";
import dimg1 from "@/assets/images/dimg1.png";
import dimg2 from "@/assets/images/dimg2.png";
import dimg3 from "@/assets/images/dimg3.png";
import dimg4 from "@/assets/images/dimg4.png";
import WhyChooseUs from "@/app/Component/UI/HomePage/WhyChooseUs/WhyChooseUs";
import { useState } from "react";

const Diagnostic = () => {
  const DiagnosticTabContent = [
    {
      id: "special-offers",
      label: "Special offers",
      tests: [
        {
          test_name: "Cancer Screening",
          price: "৳ 6000",
          description: "Initial cancer screening with specialist consultation",
          included_tests: ["Surface inspection", "Blood test", "Imaging tests"],
          imageSrc: dimg1,
          detailsLink: "/details/cancer-screening",
          bookingLink: "/booking/cancer-screening",
        },
      ],
    },
    {
      id: "popular-packages",
      label: "Popular Packages",
      tests: [
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
          included_tests: [
            "Vitamin D blood level",
            "Bone density evaluation",
            "Vitamin D blood level",
            "Bone density evaluation",
          ],
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
      ],
    },
    {
      id: "frequently-prescribed-tests",
      label: "Frequently Prescribed Tests",
      tests: [
        {
          test_name: "A/G RATIO",
          price: "৳ 4000",
          description: "Albumin/Globulin ratio blood test with expert analysis",
          included_tests: ["Blood protein analysis", "Clinical consultation"],
          imageSrc: dimg4,
          detailsLink: "/details/ag-ratio",
          bookingLink: "/booking/ag-ratio",
        },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(DiagnosticTabContent[0].id);
  // Find the active tab data
  const activeTabContent = DiagnosticTabContent.find(
    (tab) => tab.id === activeTab
  );

  return (
    <div>
      {/* Hero Area */}
      <div className="bg-[url(../../public/assets/diagnosticHeroBg.png)] bg-cover bg-top">
        <div className="pt-16 bg-gradient-to-t from-[#009650be] to-[#323290be] relative">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
              <div>
                <h1 className="text-white text-4xl md:text-[64px] mb-3">
                  Diagnostic Solutions in Mukti Hospital.
                </h1>
                <p className="text-white text-base font-jost">
                  Our advanced diagnostic services provide precise and reliable
                  health assessments to ensure early detection and effective
                  treatment. With state-of-the-art technology and expert
                  professionals, we offer a wide range of tests tailored to your
                  healthcare needs.
                </p>
                <div className="flex flex-wrap gap-4 mt-7">
                  <Link
                    href="#"
                    className="bg-M-heading-color font-jost font-medium uppercase text-white text-base hover:text-M-heading-color border-M-heading-color hover:bg-white hover:border-white py-3 px-6 inline-flex gap-2 items-center justify-center border rounded-md transition-all duration-300"
                  >
                    <Icon
                      icon="streamline:customer-support-1-solid"
                      width="20"
                    />{" "}
                    Call Us Now
                  </Link>
                  <Link
                    href="#"
                    className="bg-white font-jost font-medium uppercase text-M-text-color text-base hover:text-white border-white hover:bg-M-heading-color hover:border-M-heading-color py-3 px-6 inline-flex gap-2 items-center justify-center border rounded-md transition-all duration-300"
                  >
                    <Icon
                      icon="ph:file-pdf-duotone"
                      width="20"
                      className="text-M-secondary-color"
                    />{" "}
                    Download E-Brochure
                  </Link>
                </div>
              </div>
              <div>
                <Image
                  src={heroImag}
                  alt="Hero Image"
                  className="w-full max-w-[550px] lg:ml-auto mx-auto lg:mr-0 "
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call Area */}
      <div className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-7 lg:gap-7 items-start">
            <div className="bg-M-heading-color p-6 rounded-md grid-cols-1">
              <h3 className="text-white text-2xl capitalize">
                Request a Callback
              </h3>
              <form className="space-y-5 mt-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  className="AboutInputField"
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  required
                  className="AboutInputField"
                />
                <input
                  type="tel"
                  placeholder="Phone *"
                  required
                  className="AboutInputField"
                />
                <input type="file" className="AboutInputField bg-white" />
                <textarea
                  rows="5"
                  name="textarea"
                  placeholder="Your Message"
                  className="AboutInputField"
                />
                <FormButton
                  buttonText="Send Message"
                  buttonColor="bg-white"
                  textColor="text-M-heading-color"
                  borderColor="border-M-heading-color"
                  padding="py-3 px-8"
                  fontSize="text-xs sm:text-lg"
                  alignment="text-center"
                  hoverTextColor="hover:text-white"
                />
              </form>
            </div>
            <div className="col-span-2 bg-M-section-bg py-6 px-4 md:p-12 rounded-md">
              <h2 className="text-2xl md:text-3xl lg:text-5xl text-M-heading-color">
                The Right Care. Right Now.
              </h2>
              <p className="font-jost font-normal text-base text-M-text-color mt-4">
                Multiply very years also midst fill fruitful you're moving day.
                Were without man replenish. Air the, is was moveth gathering
                you're rule called let spirit ughf brought green forth so cattle
                waters stars there she'd moveth. Thing years have firmament upon
                first subdue blessed sea stars spirit said. Evening you're
                them.Day can't. Very living lesser multiply the herb, fly.
                Brought over us seasons greater, land sea, the created gathered
                bring spirit whose upon years fruitful third dominion cattle
                midst night morning bring.
              </p>
              <p className="font-jost font-normal text-base text-M-text-color mt-4">
                Day can't. Very living lesser multiply the herb, fly. Brought
                over us seasons greater, land sea, the created gathered bring
                spirit whose upon years fruitful third dominion cattle midst
                night morning bring.Day can't. Very living lesser multiply the
                herb, fly. Brought over us seasons greater, land sea, the
                created gathered bring spirit whose upon years fruitful third
                dominion cattle midst night morning bring.
              </p>
              <p className="font-jost font-normal text-base text-M-text-color mt-4">
                Day can't. Very living lesser multiply the herb, fly. Brought
                over us seasons, gathered bring spirit.
              </p>

              <div className="mt-5 py-5 border-t border-M-heading-color/20">
                <h4 className="text-xl text-M-heading-color">
                  Need an Emergency Help? Call Us!
                </h4>
                <div className="flex gap-4 mt-4">
                  <div className="size-12 bg-M-primary-color rounded-full p-3 text-white">
                    <Icon
                      icon="line-md:phone-call-loop"
                      width="24"
                      height="24"
                    />
                  </div>
                  <div>
                    <h6 className="text-M-text-color text-lg font-jost">
                      Telephone
                    </h6>
                    <Link
                      href="tel:+11165458856"
                      className="font-jost font-bold text-base text-M-heading-color hover:text-M-primary-color transition-all duration-300"
                    >
                      +(111) 65-458-856
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostic plans */}
      <div className="bg-M-section-bg py-24">
        <div className="container">
          <SectionHeading
            subtitle="Diagnostic plans"
            heading="Our special offers"
            align="center"
          />

          <div className="mt-10">
            {/* Tab List */}
            <ul className="bg-[#F9FAFB] py-3 px-4 flex flex-wrap items-center justify-center  sm:gap-6 max-w-[600px] mx-auto rounded-md ">
              {DiagnosticTabContent.map((tab, index) => (
                <li key={tab.id} className="relative">
                  <button
                    className={`px-4 py-2 font-jost font-normal text-base rounded-md transition-colors duration-300 ${
                      activeTab === tab.id
                        ? "text-white bg-M-heading-color shadow"
                        : "text-M-text-color"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                  {index < DiagnosticTabContent.length - 1 && (
                    <span className="w-[1px] h-1/2 border-l border-dashed border-M-text-color absolute -right-3 top-1/2 -translate-y-1/2 hidden sm:inline-block"></span>
                  )}
                </li>
              ))}
            </ul>
            {/* Tab Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
              {activeTabContent?.tests.map((items, index) => (
                <DiagnosticPlanCard
                  key={index}
                  test_name={items.test_name}
                  price={items.price}
                  description={items.description}
                  included_tests={items.included_tests}
                  imageSrc={items.imageSrc}
                  detailsLink={items.detailsLink}
                  bookingLink={items.bookingLink}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <WhyChooseUs />
    </div>
  );
};

export default Diagnostic;
