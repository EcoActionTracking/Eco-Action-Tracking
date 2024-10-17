"use client";
import React from 'react';
import HeroSection from './Home/HeroSection';
import CompanyForm from './Home/companyform';
import { FAQ } from './Home/FAQ';
import { Slider } from './Home/Slider';
import {Image} from './Home/image';
import { AboutUs } from './Home/AboutUs';
import Carousel3D from './Carousel3D/page';
// import CalculatorPage from './calculator/CalculatorPage';
import { CalculatorHome } from './Home/CalculatorHome';

const HomePage = () => {
  return (
   <>
   <HeroSection/>
   <Slider/>
   <CompanyForm/>
   <AboutUs/>
   <Carousel3D/>
   <CalculatorHome/>
   <FAQ/>
   </>
  );
};

export default HomePage;