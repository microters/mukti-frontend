import React from "react";
import Image from "next/image";
import Link from "next/link";

// Import images
import rkShape1 from "@/assets/images/features-shape4.png";
import rkShape2 from "@/assets/images/features-shape3.png";
import rkShape3 from "@/assets/images/features-shape2.png";
import rkShape4 from "@/assets/images/features-shape1.png";
import rkImg1 from "@/assets/images/medical-icon.png";
import rkImg2 from "@/assets/images/meeting-table.png";
import rkImg3 from "@/assets/images/user-icon.png";
import rkImg4 from "@/assets/images/call-icon.png";

const Features = () => {
  // Array of data for cards
  const cardData = [
    {
      shapeImage: rkShape1,
      mainImage: rkImg1,
      title: "Appointment With",
      subtitle: "Nearest Hospital",
      color: "#FD5847",
      link: "#"
    },
    {
      shapeImage: rkShape2,
      mainImage: rkImg2,
      title: "Live Discus With",
      subtitle: "Doctor",
      color: "#39CABB",
      link: "#"
    },
    {
      shapeImage: rkShape4,
      mainImage: rkImg3,
      title: "Appointment With Top",
      subtitle: "Nearest Hospital",
      color: "#FFBE3C",
      link: "#"
    },
    {
      shapeImage: rkShape3,
      mainImage: rkImg4,
      title: "24/7 Active Support",
      subtitle: "Help Support",
      color: "#01ACD2",
      link: "#"
    }
  ];

  return (
    <div className="bg-[#EBF7F6] py-[100px]">
      <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
        {/* Loop through cardData array */}
        {cardData.map((card, index) => (
          <div key={index} className="bg-white pt-14 pb-10 px-4 text-center rounded-md overflow-hidden group relative">
            <Image
              src={card.shapeImage}
              alt="Shape Image"
              className="absolute top-0 left-0 rounded-s-md"
            />
            <Image src={card.mainImage} alt="Main image" className="w-24 mx-auto" />
            <h5 className="text-M-heading-color text-base font-jost mt-5">
              {card.title}
            </h5>
            <h3 className={`text-xl text-[${card.color}] mt-2`}>{card.subtitle}</h3>
            <Link
              href={card.link}
              className="size-14 inline-flex items-center justify-center bg-[#E6F5F3] rounded-full mt-5 group-hover:-rotate-45 transition-transform duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="15"
                viewBox="0 0 21 15"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.8552 8.34364L11.3891 13.6442L12.5638 14.8556L20.1494 7.49989L12.5638 0.144165L11.3891 1.35562L16.8552 6.65614H0.374884V8.34364H16.8552Z"
                  fill="#39CABB"
                />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
