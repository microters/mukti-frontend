import React from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';

import heroBG from '@/../public/assets/heroBG.png';
import searchIcon from '@/../public/assets/search.png';

const Hero = () => {
    return (
        <div className="bg-[url(@/../public/assets/heroBG.png)] bg-cover bg-top" >
            <div className='pt-[160px] pb-[260px] px-3 bg-gradient-to-t from-[#009650be] to-[#323290be]'>
                <div className="container mx-auto text-center">
                    <span className='font-jost font-medium text-base text-white mb-4 block'>Welcome to Mukti Hospital</span>
                    <h1 className='font-jost font-bold text-6xl text-white max-w-[724px] mx-auto leading-[1.2] tracking-[4px] '>We Take Care Of Your Healthy Health.</h1>
                    <form>
                        <div>
                            <Image src={searchIcon} alt="searchIcon" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Hero;