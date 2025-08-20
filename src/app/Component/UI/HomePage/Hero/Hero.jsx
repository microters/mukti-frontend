// 'use client'
// import Image from "next/image";
// import waveImag from "@/assets/images/heroWaveShape.png";
// import tabletIcon from "@/assets/images/tablet.png";
// import injectionIcon from "@/assets/images/injection.png";
// import penToolIcon from "@/assets/images/pen-tool.png";
// import crossShapeIcon from "@/assets/images/cross-shape.png";
// import { useTranslation } from "react-i18next";
// import SearchField from "@/app/Component/Shared/SearchField/SearchField";

// const Hero = ({ heroSection }) => {
//   const { i18n } = useTranslation();
//   const currentLanguage = i18n.language || "en";
//   const { prefix, title, backgroundImage } = heroSection?.translations[currentLanguage] || {};
//   const heroImage = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${backgroundImage.replace(/\\/g, '/')}`;
//   console.log(heroImage);
  

//   return (
//     <div className="bg-cover bg-top" style={{ backgroundImage: `url(${heroImage})` }}>
//     <div className="pt-[60px] lg:pt-[180px] pb-20 md:pb-32 lg:pb-[300px] px-3 bg-gradient-to-t from-[#009650be] to-[#323290be] relative">
//       {/* Shapes */}
//       <Image
//         src={tabletIcon}
//         alt="shape"
//         className="left-[10%] top-[10%] absolute animate-spin hidden lg:block"
//       />
//       <Image
//         src={injectionIcon}
//         alt="shape"
//         className="left-[3%] bottom-[30%] absolute animate-pulse hidden lg:block"
//       />
//       <Image
//         src={penToolIcon}
//         alt="shape"
//         className="right-[10%] bottom-[30%] absolute animate-pulse hidden lg:block"
//       />
//       <Image
//         src={crossShapeIcon}
//         alt="shape"
//         className="right-[5%] top-[20%] absolute animate-spin hidden lg:block"
//       />
//       <Image
//         src={waveImag}
//         alt="wavwe Shape"
//         className="absolute -bottom-1 left-0  w-full"
//       />
//       <div className="container mx-auto text-center">
//         <span className="font-jost font-medium leading-4 tracking-wider text-base text-white mb-4 block uppercase">
//           {prefix}
//         </span>
//         <h1 className="font-jost font-bold !leading-[1.4] text-3xl md:text-6xl text-white max-w-[724px] mx-auto tracking-[4px] ">
//           {title}
//         </h1>
//           <SearchField/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;

'use client';

import Image from "next/image";
import waveImag from "@/assets/images/heroWaveShape.png";
import tabletIcon from "@/assets/images/tablet.png";
import injectionIcon from "@/assets/images/injection.png";
import penToolIcon from "@/assets/images/pen-tool.png";
import crossShapeIcon from "@/assets/images/cross-shape.png";
import { useTranslation } from "react-i18next";
import SearchField from "@/app/Component/Shared/SearchField/SearchField";
import { useEffect, useMemo, useState } from "react";
import { fetchDynamicData } from "@/app/api/dynamicData,";
const Hero = ({ heroSection }) => {
  const { i18n } = useTranslation();
  const [section, setSection] = useState(heroSection || null);

  useEffect(() => {
    const fetchUpdatedHero = async () => {
      try {
        const data = await fetchDynamicData(i18n.language || "en");
        if (data && data.heroSection) setSection(data.heroSection);
      } catch (error) {
        console.error("Error fetching updated hero:", error);
      }
    };

    fetchUpdatedHero();
    const interval = setInterval(fetchUpdatedHero, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentLanguage = i18n.language || "en";
  const tr = useMemo(
    () =>
      (section &&
        section.translations &&
        section.translations[currentLanguage]) ||
      {},
    [section, currentLanguage]
  );

  const BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/+$/, "");
  const bgPath = (tr.backgroundImage || "").replace(/^\/+|\\+/g, "/");
  const heroImage = bgPath ? encodeURI(`${BASE}/${bgPath}`) : "";

  return (
    <div
      className="bg-cover bg-top"
      style={heroImage ? { backgroundImage: `url("${heroImage}")` } : {}}
    >
      <div className="pt-[60px] lg:pt-[180px] pb-20 md:pb-32 lg:pb-[300px] px-3 bg-gradient-to-t from-[#009650be] to-[#323290be] relative">
        {/* Shapes */}
        <Image src={tabletIcon} alt="shape" className="left-[10%] top-[10%] absolute animate-spin hidden lg:block" />
        <Image src={injectionIcon} alt="shape" className="left-[3%] bottom-[30%] absolute animate-pulse hidden lg:block" />
        <Image src={penToolIcon} alt="shape" className="right-[10%] bottom-[30%] absolute animate-pulse hidden lg:block" />
        <Image src={crossShapeIcon} alt="shape" className="right-[5%] top-[20%] absolute animate-spin hidden lg:block" />
        <Image src={waveImag} alt="wavwe Shape" className="absolute -bottom-1 left-0 w-full" />

        <div className="container mx-auto text-center">
          <span className="font-jost font-medium leading-4 tracking-wider text-base text-white mb-4 block uppercase">
            {tr.prefix}
          </span>
          <h1 className="font-jost font-bold !leading-[1.4] text-3xl md:text-6xl text-white max-w-[724px] mx-auto tracking-[4px]">
            {tr.title}
          </h1>
          <SearchField />
        </div>
      </div>
    </div>
  );
};

export default Hero;
