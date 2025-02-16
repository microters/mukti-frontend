import React from 'react';
import aboutImage1 from "@/assets/images/about_image-01.png";
import aboutImage2 from "@/assets/images/about_image-02.png";
import aboutImage3 from "@/assets/images/about_image-03.png";
import shape1 from "@/assets/images/shape-01.png";
import shape2 from "@/assets/images/shape-02.png";
import emergencyIcon from "@/assets/images/emergency-icon.png";
import syringIcon from "@/assets/images/syring.png";
import bloodIcon from "@/assets/images/donation-icon.png";
import aboutObject from "@/assets/images/about_object.png";
import bedIcon from "@/assets/images/bed.png";
import Image from 'next/image';
import CommonButton from '@/app/Component/Shared/Buttons/CommonButton';
import Container from '@/app/Component/Shared/Container/Container';

const About = () => {
    return (
       <Container>
           <div className="container mx-auto flex flex-col lg:flex-row gap-12 items-center py-24">
            {/* Left Side: Images Section */}
         <div className="relative grid grid-cols-2 items-center gap-x-0 gap-y-8">
                   <div className='flex justify-end relative z-10'>
                        <Image src={aboutImage1} alt='Doctors team'></Image>
                        <Image src ={shape1} alt='shape-01' className="absolute left-[calc(100%-265px)] top-[-50px] -z-10"></Image>
                   </div>
                  <div className='-mt-4'>
                  <Image src={aboutImage2} alt='Experienced Doctor'></Image>
                  </div>
                   <div className='flex justify-end mr-6 relative'>
                     <Image src={aboutImage3} alt="Doctor with child"></Image>
                     <Image src ={shape2} alt='shape-02' className="absolute left-[calc(100%-265px)] bottom-[-20px] -z-10"></Image>
                   </div>
                    <div className='relative'>
                        <span className='bg-[#E6F5F3] h-52 max-w-52 block rounded-tl-[27px] rounded-tr-[27px] rounded-bl-[27px]'></span>
                        <div className='max-w-52 rounded-tl-[27px] rounded-tr-[27px] rounded-bl-[27px] border border-[#323290] px-12 py-16 absolute top-4 left-4 text-center'>
                            <h2 className='text-6xl font-extrabold text-[#323290]'>10+</h2>
                            <p>Year Experience</p>
                        </div>
                    </div>

                <div className="absolute left-1/2 top-1/2 w-9 h-9 bg-red-500 rotate-45 -translate-x-1/2 -translate-y-1/2 mt-4 rounded-md"></div>
            </div>

             {/* Right Side: Text Content */}
             <div className="basis-[60%] text-center lg:text-left px-4 lg:px-0 relative">
                <h4 className="text-red-500 uppercase font-bold tracking-widest text-sm md:text-base">About Us</h4>
                <h2 className="text-4xl md:text-6xl font-extrabold mt-3 leading-tight text-[#00224F]">
                    The Great Place Of Medical Hospital Center.
                </h2>
                <p className="text-gray-700 mt-4 leading-relaxed text-sm md:text-base">
                    We provide the special tips and advice’s of health care treatment and high level of best 
                    technology involved in our hospital. We provide the special tips and advice’s of health 
                    care treatment.
                </p>

                {/* Features Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 w-full">
                        <div className="flex items-center gap-2 rounded-lg border border-[#323290] overflow-hidden">
                            <div className="bg-[#ECFCFF] rounded-tr-[40px] rounded-br-[40px] px-[18px] py-[15px]">
                            <Image src={emergencyIcon} alt="Emergency Icon" height={38} width={38}></Image>
                            </div>
                            <p className="text-[#00224F] font-semibold text-sm md:text-base">Emergency Help</p>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-[#B2FDCD] overflow-hidden">
                            <div className="bg-[#EEFFF4] rounded-tr-[40px] rounded-br-[40px] px-[18px] py-[15px]">
                            <Image src={bedIcon} alt="Emergency Icon" height={38} width={38}></Image>
                            </div>
                            <p className="text-[#00224F] font-semibold text-sm md:text-base" height={38} width={38}>Qualified Doctors</p>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-[#FFBDBC] overflow-hidden">
                            <div className="bg-[#FFF0F0] rounded-tr-[40px] rounded-br-[40px] px-[18px] py-[15px]">
                            <Image src={bloodIcon} alt="Emergency Icon" height={38} width={38}></Image>
                            </div>
                            <p className="text-[#00224F] font-semibold text-sm md:text-base">Best Professionals</p>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-[#E2C4FF] overflow-hidden">
                            <div className="bg-[#F8F8FB] rounded-tr-[40px] rounded-br-[40px] px-[18px] py-[15px]">
                            <Image src={syringIcon} alt="Emergency Icon" height={38} width={38}></Image>
                            </div>
                            <p className="text-[#00224F] font-semibold text-sm md:text-base">Medical Treatment</p>
                        </div>
                </div>
                <Image src={aboutObject} alt="About Object" className='absolute right-0 bottom-12' />

                {/* Read More Button */}
                 <CommonButton/>
            </div>
        </div>
       </Container>
    );
};

export default About;
