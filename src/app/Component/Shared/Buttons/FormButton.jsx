import { Icon } from "@iconify/react";
import React from "react";

// Button component with dynamic props
const FormButton = ({
  buttonText = "Learn More",
  buttonColor = "bg-blue-500",
  textColor = "text-white",
  padding = "py-4 px-6",
  borderColor = "border-white",
  fontSize = "text-base",
  icons = "",
  alignment = "text-left",
  buttonWidth = "w-full"
}) => {
  return (
    <div className={`${alignment}`}>
      <button type="submit"
        className={`inline-flex justify-center gap-4 ${buttonColor} ${buttonWidth} rounded-md ${padding} ${textColor} font-medium ${fontSize} font-jost border-2 ${borderColor} items-center uppercase hover:bg-M-primary-color hover:border-M-primary-color transition-all duration-300`}
      >
        {buttonText}
        {icons && (
          <span className="bg-white text-M-heading-color rounded">
            <Icon icon={icons} width="24" height="24" />
          </span>
        )}
      </button>
    </div>
  );
};

export default FormButton;
