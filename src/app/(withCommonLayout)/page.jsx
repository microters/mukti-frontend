import React from 'react';
import Hero from '../Component/UI/HomePage/Hero/Hero';
import Features from '../Component/UI/HomePage/Features/Features';
import About from '../Component/UI/HomePage/About/About';
import Category from '../Component/UI/HomePage/Category/Categroy';
import Specialists from '../Component/UI/HomePage/Specialists/Specialists';
import Appointment from '../Component/UI/HomePage/Appointment/Appointment';


const HomePage = () => {
    return (
        <div>
            <Hero/>
            <Features/>
            <About/>
            <Category/>
            <Specialists/>
            <Appointment/>
        </div>
    );
};

export default HomePage;