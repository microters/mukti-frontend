import React from 'react';
import Hero from '../Component/UI/HomePage/Hero/Hero';
import Features from '../Component/UI/HomePage/Features/Features';
import Appointment from '../Component/UI/HomePage/Appointment/Appointment';


const HomePage = () => {
    return (
        <div>
            <Hero/>
            <Features/>
            <Appointment/>
        </div>
    );
};

export default HomePage;