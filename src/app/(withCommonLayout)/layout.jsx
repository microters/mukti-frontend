import React from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';

const CommonLayout = ({children}) => {
    return (
        <div>
            <Header/>
            {children}
            <Footer/>
        </div>
    );
};

export default CommonLayout