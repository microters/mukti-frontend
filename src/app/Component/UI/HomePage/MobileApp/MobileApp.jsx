import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import SectionHeading from '@/app/Component/Shared/SectionHeading/SectionHeading';

// Assets
import mobileApp from '@/assets/images/mobileapp.png';
import shape4 from '@/assets/images/shape4.png';
import shape5 from '@/assets/images/shape5.png';
import AppStore from '@/assets/images/appStore.png';
import Gplay from '@/assets/images/Gplay.png';

const MobileApp = () => {
    return (
        <div className='bg-[#323290] py-24 relative'>
            <Image src={shape4} alt="shape4" className="absolute right-0 top-0 z-0 hidden md:block" />
            <div className="container">
                <div className="grid grid-cols-1 items-center lg:grid-cols-2 gap-0">
                    <div className='relative px-0 md:px-20'>
                        <Image src={mobileApp} alt="mobileApp" className="mx-auto relative z-10" />
                        <Image src={shape5} alt="shape5" className="absolute left-0 bottom-0 z-0 animate-pulse hidden md:block" />
                    </div>
                    <div>
                        <h6 className="text-base text-white font-medium font-jost uppercase mb-3">Download apps</h6>
                        <h2 className="font-jost font-bold text-2xl sm:text-4xl md:text-6xl text-white capitalize">For Better Test Download Mobile App.</h2>
                        <p className='text-white mt-5 md:mt-10'>Mukti Hospital now has a convenient mobile app that allows you to search for healthcare providers, schedule appointments, and access patient resources on the go. Mukti Hospital now has a convenient mobile app that allows you to search for healthcare providers, schedule appointments, and access patient resources on the go.</p>
                        <div className='flex flex-wrap gap-6 mt-10'> 
                            <Link href="#"><Image src={Gplay} alt='Gplay' className='w-52' /></Link>
                            <Link href="#"><Image src={AppStore} alt='AppStore' className='w-52' /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileApp;