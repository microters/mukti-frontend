import Image from 'next/image';
import React from 'react';

import Logo from '@/../public/assets/logo-white.png';
import gPlay from '@/../public/assets/google-play.png';
import appStore from '@/../public/assets/app-store.png';
import Link from 'next/link';

const Footer = () => {
    return (
        <div className=' bg-[#00224F]'>
            <div className="container mx-auto">
            <div className='grid grid-cols-5 gap-4'>
                <div>
                    <Image src={Logo} alt='logo' width={150}  />
                    <p className='text-white'>Mukti Hospital now has a convenient mobile app that allows you to search for healthcare providers, schedule appointments, and access patient resources on the go.Mukti Hospital now has a convenient mobile app that allows you to search for healthcare providers, schedule appointments, and access patient resources on the go.</p>
                    <div className='flex space-x-4'>
                        <Link href='https://play.google.com/store/apps/details?id=com.mukti.hospital' ><Image src={gPlay} alt='logo' width={150}  /></Link>
                        <Link href='https://play.google.com/store/apps/details?id=com.mukti.hospital' ><Image src={appStore} alt='logo' width={150}  /></Link>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Footer;