'use client';
import React, { useState } from 'react';
import profile1 from "@/assets/images/nahidul.png";
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa6';
import { IoLocationOutline } from "react-icons/io5";
import { TiContacts } from "react-icons/ti";
import Container from '@/app/Component/Shared/Container/Container';

const specialistsData = {
    "specialists": [
        { id: 1, name: "Dr. Nahidul Islam", degree: "MBBS, MD (Cardiology)", "specialty": "Cardiology", rating: 124, location: "Georgia, USA", image: profile1, category: "Cardiology" },
        { id: 2, name: "Dr. Roksana Rahman", degree: "MBBS, FACC", "specialty": "Cardiology", rating: 132, location: "New York, USA", image: profile1, category: "Cardiology" },
        { id: 3, name: "Dr. Towkib Tanvir", degree: "MBBS, MD (Cardiology)", "specialty": "Cardiology", rating: 140, location: "California, USA", image: profile1, category: "Cardiology" },
        { id: 4, name: "Dr. Nasai Eshal", degree: "MBBS, MD (Internal Medicine)", "specialty": "Cardiology", rating: 110, location: "Texas, USA", image: profile1, category: "Cardiology" },
        { id: 5, name: "Dr. Sarah Khan", degree: "MBBS, MRCP (UK)", "specialty": "Cardiology", rating: 98, location: "Florida, USA", image: profile1, category: "Cardiology" },
        { id: 6, name: "Dr. John Doe", degree: "MBBS, MD", "specialty": "Cardiology", rating: 85, location: "Washington, USA", image: profile1, category: "Cardiology" },
        
        { id: 7, name: "Dr. Alice Brown", degree: "MBBS, MD (Hematology)", "specialty": "Hematology", rating: 100, location: "Ohio, USA", image: profile1, category: "Hematology" },
        { id: 8, name: "Dr. Emily Clark", degree: "MBBS, PhD (Hematology)", "specialty": "Hematology", rating: 120, location: "Georgia, USA", image: profile1, category: "Hematology" },
        { id: 9, name: "Dr. Michael Smith", degree: "MBBS, MD (Hematology)", "specialty": "Hematology", rating: 115, location: "California, USA", image: profile1, category: "Hematology" },
        { id: 10, name: "Dr. Olivia Taylor", degree: "MBBS, FCPS", "specialty": "Hematology", rating: 105, location: "New York, USA", image: profile1, category: "Hematology" },
        { id: 11, name: "Dr. Sophia Wilson", degree: "MBBS, MD", "specialty": "Hematology", rating: 99, location: "Texas, USA", image: profile1, category: "Hematology" },
        { id: 12, name: "Dr. James Lee", degree: "MBBS, MD", "specialty": "Hematology", rating: 102, location: "Washington, USA", image: profile1, category: "Hematology" },
        
        { id: 13, name: "Dr. Henry Adams", degree: "MBBS, MD (Pulmonology)", "specialty": "Pulmonology", rating: 130, location: "Georgia, USA", image: profile1, category: "Pulmonology" },
        { id: 14, name: "Dr. Rachel Green", degree: "MBBS, FCPS (Pulmonology)", "specialty": "Pulmonology", rating: 125, location: "New York, USA", image: profile1, category: "Pulmonology" },
        { id: 15, name: "Dr. Monica Bing", degree: "MBBS, MD (Pulmonology)", "specialty": "Pulmonology", rating: 110, location: "California, USA", image: profile1, category: "Pulmonology" },
        { id: 16, name: "Dr. Chandler Bing", degree: "MBBS, MRCP (Pulmonology)", "specialty": "Pulmonology", rating: 108, location: "Texas, USA", image: profile1, category: "Pulmonology" },
        { id: 17, name: "Dr. Joey Tribbiani", degree: "MBBS, MD (Pulmonology)", "specialty": "Pulmonology", rating: 99, location: "Florida, USA", image: profile1, category: "Pulmonology" },
        { id: 18, name: "Dr. Ross Geller", degree: "MBBS, FCCP (Pulmonology)", "specialty": "Pulmonology", rating: 105, location: "Washington, USA", image: profile1, category: "Pulmonology" },
    
        { id: 19, name: "Dr. Emily White",  degree: "MBBS, MD (Pulmonology)", specialty: "Dermatology", rating: 112, location: "Chicago, USA", image: profile1, category: "Dermatology" },
        { id: 20, name: "Dr. Liam Scott", degree: "MBBS, MD (Pulmonology)", specialty: "Dermatology", rating: 117, location: "San Francisco, USA", image: profile1, category: "Dermatology" },
        { id: 21, name: "Dr. Mia Johnson",  degree: "MBBS, MD (Pulmonology)", specialty: "Dermatology", rating: 109, location: "Seattle, USA", image: profile1, category: "Dermatology" },
        { id: 22, name: "Dr. Noah Carter",  degree: "MBBS, MD (Pulmonology)", specialty: "Dermatology", rating: 113, location: "Boston, USA", image: profile1, category: "Dermatology" },
        { id: 23, name: "Dr. Ava Wilson",  degree: "MBBS, MD (Pulmonology)", specialty: "Dermatology", rating: 105, location: "Denver, USA", image: profile1, category: "Dermatology" },
        { id: 24, name: "Dr. William Brown",  degree: "MBBS, MD (Pulmonology)", specialty: "Dermatology", rating: 118, location: "Phoenix, USA", image: profile1, category: "Dermatology" }
      ]
};

const categories = [
    "Cardiology", "Hematology", "Pulmonology", "Dermatology"
];

const TopRatedSpecialists = () => {
    const [selectedCategory, setSelectedCategory] = useState("Cardiology");
    
    const filteredSpecialists = specialistsData.specialists.filter(
        specialist => specialist.category === selectedCategory
    );

    return (
        <section className="py-16 bg-[#F4F7FC] text-center">
            <h4 className="text-red-500 uppercase font-bold text-sm">Meet Our Professionals</h4>
            <h2 className="text-4xl font-extrabold text-[#24285B] mt-2">Top Rated Specialists</h2>
            
           <Container>
               {/* Category Filters */}
            <ul className="flex justify-center gap-4 mt-6 bg-[#2E2E88] text-white py-3 px-5 rounded-lg">
                {categories.map((category, index) => (
                    <li
                        key={index}
                        className={`px-4 py-2 rounded-md ${selectedCategory === category ? 'bg-white text-[#24285B]' : 'bg-transparent'}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
            
            {/* Specialists Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-10">
                {filteredSpecialists.length > 0 ? (
                    filteredSpecialists.map((specialist) => (
                        <div key={specialist.id} className="relative bg-white rounded-lg shadow-md transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-lg">
                          <div className='flex items-start gap-8 p-8'>
                            <Image
                                    src={specialist.image}
                                    alt={specialist.name}
                                    width={80}
                                    height={80}
                                    className="rounded-full"
                                />
                           <div className='flex flex-col items-start text-left'>
                                <div className='flex items-center gap-2'>
                                    <p className="text-sm px-3 py-1 rounded text-green-600 border border-[#00224F4D]">{specialist.specialty}</p>
                                    {/* Ratings with React Icons */}
                                    <div className="flex items-center gap-1 bg-[#323290] p-1 px-2 rounded">
                                        <FaStar className="text-yellow-500 h-3 w-3" />
                                        <span className="text-sm text-white">({specialist.rating})</span>
                                    </div>
                                </div>
                               <h3 className="text-lg font-bold text-[#24285B] py-3">{specialist.name}</h3>
                               <span className='flex items-center pt-1 gap-2'><TiContacts /><span className="text-sm text-gray-500"> {specialist.degree}</span></span>
                               <span className='flex items-center pt-1 gap-2'><IoLocationOutline /><span className="text-sm text-gray-500"> {specialist.location}</span></span>
                           </div>
                          </div>
                            <div className="w-full py-4 mt-4 bg-[#E8EEF4] text-[#323290] hover:text-white font-bold rounded-b-md hover:bg-green-500  transition-all">
                            <Link href="#">
                                Book An Appointment
                            </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 mt-6">No specialists available in this category.</p>
                )}
            </div>
           </Container>
        </section>
    );
};

export default TopRatedSpecialists;
