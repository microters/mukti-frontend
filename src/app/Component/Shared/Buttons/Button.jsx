import Link from "next/link";
import { Icon } from "@iconify/react";
import React from "react";

// Button component with dynamic props
const Button = ({
  linkHref = "#",
  buttonText = "Learn More",
  buttonColor = "bg-blue-500",
  buttonHoverColor = "hover:bg-M-heading-color",
  textColor = "text-white",
  padding = "py-4 px-6",
  borderColor = "border-white",
  borderHoverColor = "hover:border-M-heading-color",
  fontSize = "text-base",
  icons = "",
  alignment = "text-left",
}) => {
  return (
    <div className={`${alignment}`}>
      <Link
        className={`inline-flex gap-4 ${buttonColor} rounded-md ${padding} ${textColor} font-medium ${fontSize} font-jost border-2 ${borderColor} items-center uppercase ${buttonHoverColor} ${borderHoverColor} transition-all duration-300`}
        href={linkHref}
      >
        {buttonText}
        {icons && (
          <span className="bg-white text-M-heading-color rounded">
            <Icon icon={icons} width="24" height="24" />
          </span>
        )}
      </Link>
    </div>
  );
};

export default Button;
