import React from 'react';
import { fetchDoctors } from '../api/doctor';
import FooterProvider from './FooterProvider/FooterProvider';

const Footer = async() => {
  const doctors = await fetchDoctors();
  const footerData = await fetch
  return <FooterProvider doctors={doctors} />;
};

export default Footer;