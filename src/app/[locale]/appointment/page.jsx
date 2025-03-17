"use client";
import CommonHero from "@/app/Component/UI/CommonHero";
import AppointmentForm from "@/app/Component/Shared/AppointmentForm/AppointmentForm";
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

  return (
    <div>
      <CommonHero pageName="Appointment" />
      {/* Step From */}
      <div className="container mx-auto px-4 md:px-0 my-24">
        <h2>Step {currentStep} of 4</h2>
      </div>
      <div className="container mx-auto px-4 md:px-0 my-24">
        <div className="bg-slate-100 p-10 mt-10 rounded-xl border border-M-text-color/20">
          {/* new one */}
          <div className="w-4/5 mx-auto p-5">
            {/* Step Progress */}
            <div className="flex justify-between items-center mb-10 relative">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step === currentStep
                      ? "bg-green-500 text-white"
                      : step < currentStep
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {step}
                </div>
              ))}
              {/* Step lines */}
              <div className="absolute top-1/2 left-0 right-0 flex justify-between">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-full h-[2px] ${
                      step < currentStep ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="text-center mb-10">
              {currentStep === 1 && <div>Step 1: Specialty</div>}
              {currentStep === 2 && <div>Step 2: Date & Time</div>}
              {currentStep === 3 && <div>Step 3: Submit Number</div>}
              {currentStep === 4 && <div>Step 4: Confirmation</div>}
              {currentStep === 5 && <div>Step 5: Final Confirmation</div>}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {currentStep > 1 && (
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                  onClick={prevStep}
                >
                  Previous
                </button>
              )}
              {currentStep < 5 ? (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  onClick={nextStep}
                >
                  Next
                </button>
              ) : (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => alert("Form Submitted!")}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
