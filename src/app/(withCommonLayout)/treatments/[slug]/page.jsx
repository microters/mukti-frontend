import AppointmentForm from "@/app/Component/Shared/AppointmentForm/AppointmentForm";
import Button from "@/app/Component/Shared/Buttons/Button";
import CommonHero from "@/app/Component/UI/CommonHero";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

import drImage from "@/assets/images/doctorProfile2.png";
import Image from "next/image";

const SingleTreatment = () => {
  // symptoms List
  const symptoms = [
    "Chest pain or discomfort",
    "Shortness of breath",
    "High blood pressure",
    "Dizziness or fainting",
    "Rapid or irregular heartbeat",
    "Swelling in the legs or feet",
    "Family history of heart disease",
  ];

  return (
    <div>
      <CommonHero pageName="Cardiologist" />

      <div className="container grid grid-cols-1 lg:grid-cols-3 pb-16 gap-y-10 lg:gap-10 relative -mt-10 md:-mt-20 ">
        <div className="col-span-2 shadow-md bg-white py-8 px-4 md:px-8 rounded-md">
          <h3 className="text-2xl mb-3">
            Cardiologist Services at Mukti Hospital
          </h3>
          <p className="font-jost font-normal text-M-text-color text-base mb-5">
            Your heart is at the core of your well-being, and at Mukti Hospital,
            we are committed to providing world-class cardiac care to help you
            live a healthier life. Our Cardiology Department is equipped with
            advanced technology and led by highly experienced cardiologists who
            specialize in diagnosing, treating, and preventing heart-related
            conditions.Your heart is at the core of your well-being, and at
            Mukti Hospital, we are committed to providing world-class cardiac
            care to help you live a healthier life. Our Cardiology Department is
            equipped with advanced technology and led by highly experienced
            cardiologists who specialize in diagnosing.
          </p>
          <Button
            linkHref="#"
            buttonText="FIND DOCTORS"
            icons="iconamoon:arrow-right-2-thin"
            buttonColor="bg-M-primary-color/80"
          />
          <h3 className="text-2xl mt-5 mb-3">What is Cardiology?</h3>
          <p className="font-jost font-normal text-M-text-color text-base mb-5">
            Cardiology is the branch of medicine that focuses on the heart and
            blood vessels. Cardiologists diagnose and treat conditions such as
            heart attacks, high blood pressure, arrhythmias, heart failure, and
            coronary artery disease. Regular check-ups with a cardiologist can
            help prevent serious complications and ensure your heart stays
            healthy. Cardiology is the branch of medicine that focuses on the
            heart and blood vessels. Cardiologists diagnose and treat conditions
            such as heart attacks, high blood pressure, arrhythmias, heart
            failure, and coronary artery disease. Regular check-ups with a
            cardiologist can help prevent serious complications and ensure your
            heart stays healthy.
          </p>
          <h3 className="text-2xl mt-5 mb-3">Our Cardiology Services</h3>
          <p className="font-jost font-normal text-M-text-color text-base mb-5">
            At Mukti Hospital, we offer a comprehensive range of heart care
            services tailored to meet individual patient needs:
          </p>
          <div className="space-y-5">
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="size-14 bg-M-primary-color text-white rounded-full flex items-center justify-center shrink-0">
                <Icon icon="fa-regular:hospital" width="24" />
              </div>
              <div>
                <h5 className="text-black text-base md:text-lg font-semibold font-jost">
                  1. Heart Disease Diagnosis & Treatment
                </h5>
                <ul className="list-disc pl-7 mt-3 text-base text-M-text-color font-normal font-jost">
                  <li>
                    Advanced screenings and risk assessments to detect heart
                    conditions early.
                  </li>
                  <li>
                    Personalized treatment plans to manage and improve heart
                    health.
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="size-14 bg-M-primary-color text-white rounded-full flex items-center justify-center shrink-0">
                <Icon icon="fa-regular:hospital" width="24" />
              </div>
              <div>
                <h5 className="text-black text-base md:text-lg font-semibold font-jost">
                  2. ECG & Echo cardiography
                </h5>
                <ul className="list-disc pl-7 mt-3 text-base text-M-text-color font-normal font-jost">
                  <li>
                    <strong className="text-black">
                      Electrocardiogram (ECG):
                    </strong>{" "}
                    Records the electrical activity of your heart to detect
                    irregularities.
                  </li>
                  <li>
                    <strong className="text-black">Echocardiogram:</strong> A
                    detailed ultrasound of the heart to assess structure and
                    function.
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="size-14 bg-M-primary-color text-white rounded-full flex items-center justify-center shrink-0">
                <Icon icon="fa-regular:hospital" width="24" />
              </div>
              <div>
                <h5 className="text-black text-base md:text-lg font-semibold font-jost">
                  3. High Blood Pressure & Cholesterol Management
                </h5>
                <ul className="list-disc pl-7 mt-3 text-base text-M-text-color font-normal font-jost">
                  <li>
                    Expert monitoring and treatment to control hypertension.
                  </li>
                  <li>
                    Lifestyle and dietary recommendations to maintain a healthy
                    heart.
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="size-14 bg-M-primary-color text-white rounded-full flex items-center justify-center shrink-0">
                <Icon icon="fa-regular:hospital" width="24" />
              </div>
              <div>
                <h5 className="text-black text-base md:text-lg font-semibold font-jost">
                  4. Heart Attack & Stroke Prevention
                </h5>
                <ul className="list-disc pl-7 mt-3 text-base text-M-text-color font-normal font-jost">
                  <li>
                    Preventive treatments to reduce the chances of heart attacks
                    and strokes.
                  </li>
                  <li>Risk assessments for early detection.</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="size-14 bg-M-primary-color text-white rounded-full flex items-center justify-center shrink-0">
                <Icon icon="fa-regular:hospital" width="24" />
              </div>
              <div>
                <h5 className="text-black text-base md:text-lg font-semibold font-jost">
                  5. Heart Attack & Stroke Prevention
                </h5>
                <ul className="list-disc pl-7 mt-3 text-base text-M-text-color font-normal font-jost">
                  <li>
                    <strong className="text-black">Angiography:</strong> Imaging
                    test to check for blockages in the coronary arteries.
                  </li>
                  <li>
                    <strong className="text-black">
                      Angioplasty & Stenting:
                    </strong>{" "}
                    Minimally invasive procedures to open blocked arteries and
                    restore blood flow.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Definition */}
          <h3 className="text-2xl mt-5 mb-3">What is Cardiology?</h3>
          <p className="font-jost font-normal text-M-text-color text-base mb-5">
            Cardiology is the branch of medicine that focuses on the heart and
            blood vessels. Cardiologists diagnose and treat conditions such as
            heart attacks, high blood pressure, arrhythmias, heart failure, and
            coronary artery disease. Regular check-ups with a cardiologist can
            help prevent serious complications and ensure your heart stays
            healthy.
          </p>
          <ul className="font-jost font-normal text-base text-M-text-color space-y-2 list-decimal pl-6">
            <li>
              <strong className="text-black">Expert Cardiologists:</strong>{" "}
              Highly skilled specialists with years of experience.
            </li>
            <li>
              <strong className="text-black">Advanced Technology:</strong>{" "}
              State-of-the-art diagnostic and treatment equipment.
            </li>
            <li>
              <strong className="text-black">Patient-Centered Care:</strong>{" "}
              Compassionate and personalized attention.
            </li>
          </ul>
          {/* symptoms */}
          <h3 className="text-2xl mt-5 mb-3">
            When Should You See a Cardiologist?
          </h3>
          <p className="font-jost font-normal text-M-text-color text-base mb-2">
            {" "}
            Cardiology is the branch of medicine that focuses on the heart and
            blood vessels. Cardiologists diagnose and treat conditions such as
            heart attacks, high blood pressure, arrhythmias, heart failure, and
            coronary artery disease. Regular check-ups with a cardiologist can
            help prevent serious complications and ensure your heart stays
            healthy.
          </p>
          <ul className="font-jost font-normal text-base text-M-text-color space-y-2 list-none pl-0 mb-4">
            {symptoms.map((item, index) => {
              return (
                <li key={index} className="flex items-start gap-2">
                  <Icon
                    icon="si:check-square-fill"
                    width="20"
                    height="20"
                    className="text-M-primary-color relative top-[1px]"
                  />
                  {item}
                </li>
              );
            })}
          </ul>
          <p className="font-jost font-normal text-M-text-color text-base mb-2">
            Early diagnosis can save lives. Don’t wait until it’s too late—book
            your appointment today!
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
            Take the first step towards a healthy heart with Mukti Hospital! ❤️
          </p>
        </div>
        <div className="col-span-1 space-y-6">
          <div className="bg-M-heading-color px-5 py-8 rounded-md">
            <h3 className="text-2xl mb-4 text-white text-center">
              Request for Appointment
            </h3>
            <AppointmentForm />
          </div>
          <div className="border border-M-text-color/20 rounded-md p-5">
            <h3 className="text-2xl mb-6 text-center border-b border-M-text-color/20 pb-3">
              Best Cardiologist
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white shadow-md rounded-md p-5 text-center border border-M-text-color/20">
                <div className="size-20 overflow-hidden rounded-full mx-auto border-2 border-M-primary-color mb-5">
                  <Image src={drImage} alt="dr Image" />
                </div>
                <h4>
                  <Link
                    href="#"
                    className="text-lg font-semibold font-jost text-black"
                  >
                    Dr. Towkib Tanvir
                  </Link>
                </h4>
                <h6 className="border border-M-primary-color rounded-md py-1 px-3 inline-flex font-jost fold-bold text-base text-M-text-color my-2">
                  Pulmonology
                </h6>
                <p className="text-M-text-color text-base text-left font-normal font-jost flex items-start gap-2 md:basis-80 mb-5">
                  <Icon
                    icon="oui:index-open"
                    width="24"
                    className="text-M-heading-color shrink-0 relative top-1"
                  />
                  <span>MDS - Periodontology and Periodontology and…</span>
                </p>
                <Link
                  href="#"
                  passHref
                  className="bg-[#E8EEF4] block w-full py-3 px-3 font-jost font-bold text-M-heading-color rounded-md transition-all duration-300 hover:bg-M-primary-color hover:text-white"
                >
                  Book An Appointment
                </Link>
              </div>
              <div className="bg-white shadow-md rounded-md p-5 text-center border border-M-text-color/20">
                <div className="size-20 overflow-hidden rounded-full mx-auto border-2 border-M-primary-color mb-5">
                  <Image src={drImage} alt="dr Image" />
                </div>
                <h4>
                  <Link
                    href="#"
                    className="text-lg font-semibold font-jost text-black"
                  >
                    Dr. Towkib Tanvir
                  </Link>
                </h4>
                <h6 className="border border-M-primary-color rounded-md py-1 px-3 inline-flex font-jost fold-bold text-base text-M-text-color my-2">
                  Pulmonology
                </h6>
                <p className="text-M-text-color text-base text-left font-normal font-jost flex items-start gap-2 md:basis-80 mb-5">
                  <Icon
                    icon="oui:index-open"
                    width="24"
                    className="text-M-heading-color shrink-0 relative top-1"
                  />
                  <span>MDS - Periodontology and Periodontology and…</span>
                </p>
                <Link
                  href="#"
                  passHref
                  className="bg-[#E8EEF4] block w-full py-3 px-3 font-jost font-bold text-M-heading-color rounded-md transition-all duration-300 hover:bg-M-primary-color hover:text-white"
                >
                  Book An Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTreatment;
