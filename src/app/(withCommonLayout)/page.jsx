import React from 'react';
import Hero from '../Component/UI/HomePage/Hero/Hero';
import Features from '../Component/UI/HomePage/Features/Features';
import Appointment from '../Component/UI/HomePage/Appointment/Appointment';
import About from '../Component/UI/HomePage/About/About';
import Category from '../Component/UI/HomePage/Category/Category';
import BestDoctors from '../Component/UI/HomePage/BestDoctors/BestDoctors';
import WhyChooseUs from '../Component/UI/HomePage/WhyChooseUs/WhyChooseUs';


const HomePage = () => {
    return (
        <div>
            <Hero/>
            <Features/>
            <About/>
            <Category/>
            <BestDoctors/>
            <Appointment/>
            <WhyChooseUs/>
        </div>
    );
};

export default HomePage;