"use client";
import React from 'react';
import HeroSection from './Home/HeroSection';
import CompanyForm from './Home/companyform';
import { FAQ } from './Home/FAQ';
import { Slider } from './Home/Slider';
import {Image} from './Home/image';


const HomePage = () => {
  return (
   <>
   <HeroSection/>
   <CompanyForm/>
   <Slider/>
   <Image/>
   <FAQ/>
   </>
  );
};

export default HomePage;