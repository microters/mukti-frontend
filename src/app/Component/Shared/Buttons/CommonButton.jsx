import Link from 'next/link';
import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";

const CommonButton = ({ 
    buttonText = 'Read More',          
    bgColor = 'bg-red-500',           
    hoverBgColor = 'hover:bg-red-600', 
    textColor = 'text-white',         
    iconColor = '#000',               
    icon = <MdKeyboardArrowRight />,
    href = '#' 
}) => {
    return (
        <Link href="#"
            className={`mt-6 ${bgColor} ${textColor} px-6 py-3 rounded-lg flex items-center gap-2 text-lg font-semibold ${hoverBgColor} transition mx-auto lg:mx-0`}
        >
            {buttonText} 
            <span className='bg-white p-1 rounded'>
                {React.cloneElement(icon, { fill: iconColor })}
            </span>
        </Link>
    );
};

export default CommonButton;

