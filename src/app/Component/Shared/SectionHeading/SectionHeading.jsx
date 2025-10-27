import React from "react";

const SectionHeading = ({
  subtitle = "Sub Title",
  heading = "Main Title",
  align = "left",
}) => {
  return (
    <div className={`text-${align}`}>
      <h6 className="text-base text-M-secondary-color font-medium font-jost uppercase mb-3">
        {subtitle}
      </h6>
      <h2 className="font-jost font-bold text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-M-heading-color capitalize max-w-[1000px] mx-auto">
        {heading}
      </h2>
    </div>
  );
};

export default SectionHeading;
