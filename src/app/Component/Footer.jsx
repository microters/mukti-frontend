import React from 'react';
import { fetchDoctors } from '../api/doctor';
import FooterProvider from './FooterProvider/FooterProvider';
import { fetchFooterData } from '../api/dynamicData,';

const Footer = async() => {
  const doctors = await fetchDoctors();
  const footer = await fetchFooterData()
  return <FooterProvider doctors={doctors} footer={footer}/>;
};

export default Footer;

