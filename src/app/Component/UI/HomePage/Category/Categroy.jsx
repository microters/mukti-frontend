import React from 'react';
import Image from 'next/image';
import cardiologist from "@/assets/images/Cardiologist.png";
import rkShape4 from "@/assets/images/features-shape3.png";
import { FaArrowRight } from "react-icons/fa6";
import Link from 'next/link';
import Container from '@/app/Component/Shared/Container/Container';
import CommonButton from '@/app/Component/Shared/Buttons/CommonButton';

const Category = () => {
    const specialistsData =[
        { name: "Dermatology", icon: cardiologist, link: "#" },
        { name: "Cardiologist", icon: cardiologist, link: "#" },
        { name: "Gastroenterologist", icon: cardiologist, link: "#"},
        { name: "Ear-Nose-Throat", icon: cardiologist, link: "#"},
        { name: "Ophthalmologist", icon: cardiologist, link: "#"},
        { name: "Nephrologist", icon: cardiologist, link: "#"},
        { name: "Pulmonologist", icon: cardiologist, link: "#" },
        { name: "Orthopedic", icon: cardiologist, link: "#"},
        { name: "Endocrinology", icon: cardiologist, link: "#" },
        { name: "Endocrinology", icon: cardiologist, link: "#" },
        { name: "Endocrinology", icon: cardiologist, link: "#" },
        { name: "Urology", icon: cardiologist, link: "#"}
      ]
      
    return (
        <section className="py-16 bg-[#E8F7F7] text-center w-full">
            <Container>
                <h4 className="text-red-500 uppercase font-bold text-sm">Category</h4>
                <h2 className="text-4xl font-extrabold text-[#24285B] mt-2">Browse By Specialist</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-10">
                    {specialistsData.map((specialist, index) => (
                        <div
                            key={index}
                            className="relative bg-white rounded-lg shadow-md flex flex-col items-center gap-3 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl px-5 py-10"
                        >
                            {index === 2 && (
                                <Image
                                    src={rkShape4}
                                    alt="Shape Image"
                                    className="absolute top-0 left-0 rounded-s-md"
                                />
                            )}
                            <Image
                                src={specialist.icon}
                                alt={specialist.name}
                                height={60}
                                width={60}
                                objectFit='contain'
                                className="transition-transform duration-500 ease-out group-hover:scale-110"
                            />
                            <p className="text-lg font-bold text-[#323290]">{specialist.name}</p>
                            <Link
                                href={specialist.link}
                                className="size-14 inline-flex items-center justify-center bg-[#E6F5F3] rounded-full transition-transform duration-500 ease-out group-hover:rotate-45 group-hover:scale-110"
                            >
                                <FaArrowRight  fill='#009650'/>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className='flex justify-center'>
                  <CommonButton/>
                </div>
            </Container>
        </section>
    );
};

export default Category;
