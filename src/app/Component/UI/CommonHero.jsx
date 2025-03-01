import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

import tabletIcon from "@/assets/images/tablet.png";
import injectionIcon from "@/assets/images/injection.png";
import penToolIcon from "@/assets/images/pen-tool.png";
import crossShapeIcon from "@/assets/images/cross-shape.png";

const CommonHero = ({pageName = 'pageName'}) => {
  return (
    <div className="bg-[url(@/assets/images/inner-hero-bg.jpg)] bg-cover bg-top">
      <div className="pt-[80px] lg:pt-[100px] pb-20 md:pb-32 lg:pb-[120px] px-3 bg-gradient-to-t from-[#009650be] to-[#323290be] relative">
        {/* Shapes */}
        <Image
          src={tabletIcon}
          alt="shape"
          className="left-[10%] top-[10%] absolute animate-spin hidden lg:block"
        />
        <Image
          src={injectionIcon}
          alt="shape"
          className="left-[3%] bottom-[5%] absolute animate-pulse hidden lg:block"
        />
        <Image
          src={penToolIcon}
          alt="shape"
          className="right-[10%] bottom-[10%] absolute animate-pulse hidden lg:block"
        />
        <Image
          src={crossShapeIcon}
          alt="shape"
          className="right-[5%] top-[20%] absolute animate-spin hidden lg:block"
        />
        <div className="container mx-auto text-center">
          <ul className="gap-6 flex flex-wrap items-center justify-center mb-4 ">
            <li>
              <Link
                href={"/"}
                className="font-jost font-medium leading-4 tracking-wider text-base text-white block uppercase relative before:w-2 before:h-[2px] before:bg-white before:absolute before:-right-4 before:top-1/2 before:-translate-y-1/2"
              >
                Home
              </Link>
            </li>
            <li className="font-jost font-medium leading-4 tracking-wider text-base text-white block uppercase">
              {pageName}
            </li>
          </ul>
          <h1 className="font-jost font-bold !leading-[1.4] text-3xl md:text-6xl text-white max-w-[724px] mx-auto tracking-[4px] ">
            {pageName}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CommonHero;
