import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const DiagnosticPlanCard = ({
  test_name,
  price,
  description,
  included_tests,
  imageSrc,
  detailsLink,
  bookingLink,
}) => {
  return (
    <div className="rounded-md bg-white overflow-hidden flex justify-between flex-col h-full">
      <div className="bg-M-primary-color text-center px-4 pt-6 relative before:absolute before:-bottom-[1px] before:left-0 before:w-full before:h-12 before:bg-white before:z-0 ">
        <h3 className="text-xl text-white mb-4">{test_name}</h3>
        <span className="flex justify-center items-center size-24 rounded-full bg-white mx-auto relative z-20 shadow-md">
          <Image src={imageSrc} alt={test_name} width={48} />
        </span>
      </div>
      <div className="p-6 pb-7 space-y-3 flex justify-between flex-col h-full">
        <div className="text-center space-y-3">
          <h4 className="font-jost font-bold text-M-heading-color text-3xl">
            {price}
          </h4>
          <p className="text-base text-M-text-color font-jost font-bold capitalize">
            {description}
          </p>
          <ul className="space-y-2 text-left">
            {included_tests.map((test, index) => (
              <li
                key={index}
                className="flex gap-2 items-start text-M-text-color font-jost font-normal text-base"
              >
                <Icon
                  icon="si:check-line"
                  width="20"
                  height="24"
                  className="text-M-primary-color shrink-0"
                />
                {test}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center space-y-3 border-t border-dashed border-M-text-color/20 pt-5 !mt-6">
          <Link
            href={detailsLink}
            className="text-M-text-color font-jost font-normal flex items-center justify-center gap-2 hover:text-M-primary-color transition-all duration-300"
          >
            View More Details
            <Icon icon="pepicons-pencil:angle-right" width="16" height="16" />
          </Link>
          <Link
            href={bookingLink}
            className="bg-M-primary-color text-white font-jost font-normal py-3 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-M-heading-color transition-all duration-300"
          >
            <Icon icon="fontisto:date" width="20" height="20" /> Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticPlanCard;