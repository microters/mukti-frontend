"use client";
import CommonHero from "@/app/Component/UI/CommonHero";
import { Icon } from "@iconify/react";
import { useState } from "react";

const Appointment = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Handle next step
  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Step labels array
  const stepLabels = [
    "Specialty",
    "Date & Time",
    "Submit Number",
    "Confirmation",
    "Final Confirmation",
  ];

  return (
    <div>
      <CommonHero pageName="Appointment" />
      {/* Step From */}
      <div className="container mx-auto px-4 md:px-0 my-24">
        <div className="bg-slate-100 p-10 mt-10 rounded-xl border border-M-text-color/20">
          {/* new one */}
          <div className="flex justify-between items-center mb-10 relative">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                className={`flex flex-col items-center relative lg:before:w-16 xl:before:w-24 before:h-[1px] before:absolute before:border before:border-dashed before:top-1/2 before:-translate-y-1/2 lg:before:-right-24 xl:before:-right-36 last:before:hidden ${step < currentStep ? "before:bg-M-text-color" : "before:bg-M-text-color/10"}`}
                key={step}
              >
                {/* Step Circles */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-jost font-bold text-lg ${
                    step === currentStep
                      ? "bg-M-primary-color text-white"
                      : step < currentStep
                        ? "bg-M-primary-color text-white"
                        : "bg-slate-300 text-white"
                  }`}
                >
                  {step}
                </div>
                {/* Step Label */}
                <div
                  className={`mt-2 text-base font-jost  ${
                    step === currentStep
                      ? "text-M-heading-color"
                      : step < currentStep
                        ? "text-M-heading-color"
                        : "text-slate-300"
                  }`}
                >
                  {stepLabels[step - 1]}
                </div>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="mb-10 bg-white p-5 rounded-md border border-M-text-color/20">
            {currentStep === 1 && 
              <div>
                  
              </div>
            }
            {currentStep === 2 && <div>Step 2: Date & Time</div>}
            {currentStep === 3 && <div>Step 3: Submit Number</div>}
            {currentStep === 4 && <div>Step 4: Confirmation</div>}
            {currentStep === 5 && <div>Step 5: Final Confirmation</div>}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between border-t border-M-text-color/10 pt-8">
            {currentStep > 1 && (
              <button
                className="flex items-center justify-center px-4 py-3 bg-M-heading-color text-white rounded hover:bg-M-heading-color font-jost font-medium text-base min-w-24 uppercase "
                onClick={prevStep}
              >
                <Icon icon="mynaui:chevron-left" width="24" height="24" />
                Previous
              </button>
            )}
            {currentStep < 5 ? (
              <button
                className="flex items-center justify-center px-4 py-3 bg-M-primary-color text-white rounded hover:bg-M-primary-color font-jost font-medium text-base min-w-24 uppercase"
                onClick={nextStep}
              >
                Next
                <Icon icon="mynaui:chevron-right" width="24" height="24" />
              </button>
            ) : (
              <button
                className="px-4 py-3 bg-M-primary-color text-white rounded hover:bg-M-primary-color font-jost font-medium text-base min-w-24 uppercase"
                onClick={() => alert("Form Submitted!")}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
