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
        <span className="text-lg md:text-xl">{categoryName}</span>
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

      {/* Accordion Content */}
      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ transitionProperty: 'max-height, opacity' }} 
      >
        <div className="p-4 bg-M-section-bg/90">
          
          {/* List Header */}
          <div className="flex justify-between font-bold border-b-2 border-M-primary-color pb-2 mb-2 text-M-heading-color">
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
              <span className="w-1/4 text-right font-bold text-M-primary-color">{test.price}</span>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default TestCategoryAccordion;