"use client";
import React from 'react';
import HeroSection from './Home/HeroSection';
import CompanyForm from './Home/companyform';
import { FAQ } from './Home/FAQ';
import { Slider } from './Home/Slider';
import {Image} from './Home/image';
import { AboutUs } from './Home/AboutUs';

const HomePage = () => {
  return (
   <>
   <HeroSection/>
   <Slider/>
   <CompanyForm/>
   <AboutUs/>
   <Image/>
   <FAQ/>
   </>
  );
};

export default HomePage;