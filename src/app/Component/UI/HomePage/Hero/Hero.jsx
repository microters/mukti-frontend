// Hero.jsx (FIXED)

'use client';

import Image from "next/image";
import waveImag from "@/assets/images/heroWaveShape.png";
import tabletIcon from "@/assets/images/tablet.png";
import injectionIcon from "@/assets/images/injection.png";
import penToolIcon from "@/assets/images/pen-tool.png";
import crossShapeIcon from "@/assets/images/cross-shape.png";
import { useTranslation } from "react-i18next";
import SearchField from "@/app/Component/Shared/SearchField/SearchField";
import { useMemo, useRef } from "react";
 
const Hero = ({ heroSection }) => { // ✅ prop ব্যবহার করুন
  const { i18n } = useTranslation();
  // 🔴 useState(heroSection) বাদ
  const previousBgPath = useRef(null);

  // 🔴 useEffect এবং setInterval লুপ সম্পূর্ণ মুছে ফেলা হয়েছে

  const currentLanguage = i18n.language || "en";
  
  // ✅ সরাসরি 'heroSection' prop ব্যবহার করুন
  const tr = useMemo(
    () =>
      (heroSection &&
        heroSection.translations &&
        heroSection.translations[currentLanguage]) ||
      {},
    [heroSection, currentLanguage] // ✅ prop-এর উপর নির্ভর করুন
  );

  const BASE = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/+$/, "");
  const bgPath = (tr.backgroundImage || "").replace(/^\/+|\\+/g, "/");

  // Generate heroImage only if bgPath changes
  let cacheBuster = "";
  if (bgPath && bgPath !== previousBgPath.current) {
    cacheBuster = `?v=${Date.now()}`;
    previousBgPath.current = bgPath;
  }
  const heroImage = bgPath ? encodeURI(`${BASE}/${bgPath}${cacheBuster}`) : "";

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