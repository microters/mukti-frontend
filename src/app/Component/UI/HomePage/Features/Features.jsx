import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

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
      color: "#D91656",
      link: "#"
    },
    {
      shapeImage: rkShape2,
      mainImage: rkImg2,
      title: "Live Discus With",
      subtitle: "Doctor",
      color: "#009650",
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
          <div key={index} className="bg-white pt-14 pb-10 px-4 text-center rounded-md overflow-hidden group relative group">
            <Image
              src={card.shapeImage}
              alt="Shape Image"
              className="absolute top-0 left-0 rounded-s-md"
            />
            <Image src={card.mainImage} alt="Main image" className="w-24 mx-auto group-hover:animate-shake" />
            <h5 className="text-M-heading-color text-base font-jost mt-5">
              {card.title}
            </h5>
            <h3 className={`text-xl mt-2`}  style={{ color: card.color }}>{card.subtitle}</h3>
            <Link
              href={card.link}
              className="size-14 inline-flex items-center justify-center bg-[#E6F5F3] rounded-full mt-5 group-hover:-rotate-45 transition-transform duration-300 text-[#39CABB]"
            >
              <Icon icon="solar:arrow-right-linear" width="24" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
