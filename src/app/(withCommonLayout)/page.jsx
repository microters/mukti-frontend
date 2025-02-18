import React from 'react';
import Hero from '../Component/UI/HomePage/Hero/Hero';
import Features from '../Component/UI/HomePage/Features/Features';
import Appointment from '../Component/UI/HomePage/Appointment/Appointment';
import About from '../Component/UI/HomePage/About/About';
import Category from '../Component/UI/HomePage/Category/Category';
import BestDoctors from '../Component/UI/HomePage/BestDoctors/BestDoctors';
import WhyChooseUs from '../Component/UI/HomePage/WhyChooseUs/WhyChooseUs';
import MobileApp from '../Component/UI/HomePage/MobileApp/MobileApp';
import Testimonials from '../Component/UI/HomePage/Testimonials/Testimonials';
import AppointmentProcess from '../Component/UI/HomePage/AppointmentProcess/AppointmentProcess';
import Blog from '../Component/UI/HomePage/Blog/Blog';


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
            <MobileApp/>
            <Testimonials/>
            <AppointmentProcess/>
            <Blog/>
        </div>
    );
};

export default HomePage;