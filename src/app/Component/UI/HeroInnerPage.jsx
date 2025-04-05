import React from "react";
import Head from "next/head"; // For client-side meta tags
import Image from "next/image";
import tabletIcon from "@/assets/images/tablet.png";
import injectionIcon from "@/assets/images/injection.png";
import penToolIcon from "@/assets/images/pen-tool.png";
import crossShapeIcon from "@/assets/images/cross-shape.png";
import Link from "next/link";
import SearchField from "../Shared/SearchField/SearchField";

const HeroInnerPage = () => {
  const siteUrl = typeof window !== "undefined" ? `${window.location.protocol}//${window.location.host}/doctors` : "https://www.muktihospital.com/doctors";
  const ogImage = "/assets/inner-hero-bg.jpg"; // Use the same image as background

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Doctors List - Mukti Hospital</title>
        <meta name="description" content="Explore our list of expert doctors at Mukti Hospital." />
        <meta name="keywords" content="doctors, Mukti Hospital, healthcare" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="Doctors List - Mukti Hospital" />
        <meta property="og:description" content="Explore our list of expert doctors at Mukti Hospital." />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Mukti Hospital Doctors" />
        <meta property="og:site_name" content="Mukti Hospital" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content="Doctors List - Mukti Hospital" />
        <meta name="twitter:description" content="Explore our list of expert doctors at Mukti Hospital." />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="Mukti Hospital Doctors" />
        <meta name="twitter:site" content="@MuktiHospital" />
      </Head>
      <div className="bg-[url('/assets/inner-hero-bg.jpg')] bg-cover bg-top">
        <div className="pt-[80px] lg:pt-[100px] pb-20 md:pb-32 lg:pb-[120px] px-3 bg-gradient-to-t from-[#009650be] to-[#323290be] relative">
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
                Doctors List
              </li>
            </ul>
            <h1 className="font-jost font-bold !leading-[1.4] text-3xl md:text-6xl text-white max-w-[724px] mx-auto tracking-[4px] ">
              Doctors List
            </h1>
            <SearchField />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroInnerPage;