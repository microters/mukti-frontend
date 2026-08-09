// TestCategoryAccordion.js - (No major change from previous version)

import React, { useState } from 'react';

const TestCategoryAccordion = ({ categoryName, tests }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-M-heading-color/10 rounded-lg shadow-sm overflow-hidden">
      {/* Accordion Header */}
      <button
        className={`w-full flex justify-between items-center p-4 font-bold text-left transition-colors duration-300 
                    ${isOpen ? 'bg-M-primary-color text-white' : 'bg-white text-M-heading-color hover:bg-M-primary-color/10'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          <span className="text-lg md:text-xl">{categoryName}</span>
          <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${isOpen ? 'bg-white/20 text-white' : 'bg-M-primary-color/10 text-M-primary-color'}`}>
            {tests.length}
          </span>
        </span>
        <svg 
          className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {/* Accordion Content — smooth open/close via grid-rows 0fr → 1fr */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
        <div className={`px-4 pb-4 pt-0 bg-white max-h-[420px] ${isOpen ? 'overflow-y-auto' : 'overflow-hidden'}`}>
          
          {/* List Header — solid background so scrolled rows don't show through */}
          <div className="flex justify-between font-bold border-b-2 border-M-primary-color pt-1 pb-2 mb-2 text-M-heading-color sticky -top-4 bg-white z-10">
            <span className="w-3/4 text-base">পরীক্ষার নাম</span>
            <span className="w-1/4 text-right text-base">মূল্য</span>
          </div>

          {/* Tests List */}
          {tests.map((test, index) => (
            <div 
              key={index} 
              className={`flex justify-between py-2 border-b border-M-heading-color/5 
                          text-M-text-color`}
            >
              <span className="w-3/4 font-jost">{test.name}</span>
              <span className="w-1/4 text-right font-bold text-M-primary-color">
                {(!test.price || test.price === 0)
                  ? "—"
                  : typeof test.price === "number"
                    ? `৳${test.price.toLocaleString("en-BD")}`
                    : test.price}
              </span>
            </div>
          ))}

        </div>
        </div>
      </div>
    </div>
  );
};

export default TestCategoryAccordion;