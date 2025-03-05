import Button from "@/app/Component/Shared/Buttons/Button";
import CommonHero from "@/app/Component/UI/CommonHero";
import { Icon } from "@iconify/react";
import React from "react";

const SingleTreatment = () => {
  return (
    <div>
      <CommonHero pageName="Cardiologist" />

      <div className="container grid grid-cols-3 pb-16 gap-10 relative -mt-20">
        <div className="col-span-2 shadow-md bg-white py-8 px-8 rounded-md">
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

          <div className="flex gap-4">
            <div className="size-14 bg-M-primary-color text-white rounded-full flex items-center justify-center shrink-0">
              <Icon icon="fa-regular:hospital" width="24" />
            </div>
            <div>
              <h5 className="text-black text-base md:text-lg font-semibold font-jost">
                1. Heart Disease Diagnosis & Treatment
              </h5>
              <ul className="list-disc pl-7 mt-3 text-base text-M-text-color font-normal font-jost">
                <li>Advanced screenings and risk assessments to detect heart conditions early.</li>
                <li>Personalized treatment plans to manage and improve heart health.</li>
              </ul>
            </div>
          </div>


        </div>
        <div className="col-span-1">sidebar</div>
      </div>
    </div>
  );
};

export default SingleTreatment;
