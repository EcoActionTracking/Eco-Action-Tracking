"use client";

import { useEffect } from 'react';
import Script from 'next/script';
import "../globals.css";
export function Slider() {
  useEffect(() => {
    const swiper = new Swiper('.swiper', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      slidesPerView: 1,
      spaceBetween: 30,
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-20 font-sans max-md:max-w-md">
        <h1 className="text-4xl font-extrabold text-center text-[#116A7B]  my-20">
        Products
        </h1>

      <div className="relative w-full ">
        <div className="relative swiper multiple-slide-carousel">
          <div className="mb-7 swiper-wrapper">
            <div className="swiper-slide">
              <div className="flex items-center justify-center rounded-2xl h-96">
              <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] border p-2 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
                <div className="min-h-[245px]">
                    <img
                    className="w-full rounded-lg"
                    src="https://readymadeui.com/cardImg.webp"
                    />
                </div>
                <div className="p-6 text-center">
                    <h3 className="text-xl font-bold">
                    Heading
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor          arcu,          at fermentum dui. Maecenas
                    </p>
                    <button
                    className="mt-6 bg-[#116A7B] hover:bg-transparent hover:text-[#116A7B] border-2 border-[#116A7B] transition-all text-white font-semibold text-sm tracking-wide rounded-md px-6 py-2.5 w-full"
                    type="button"
                    >
                    View
                    </button>
                </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="flex items-center justify-center rounded-2xl h-96">
              <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] border p-2 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
                <div className="min-h-[245px]">
                    <img
                    className="w-full rounded-lg"
                    src="https://readymadeui.com/cardImg.webp"
                    />
                </div>
                <div className="p-6 text-center">
                    <h3 className="text-xl font-bold">
                    Heading
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor          arcu,          at fermentum dui. Maecenas
                    </p>
                    <button
                    className="mt-6 bg-[#116A7B] hover:bg-transparent hover:text-[#116A7B] border-2 border-[#116A7B] transition-all text-white font-semibold text-sm tracking-wide rounded-md px-6 py-2.5 w-full"
                    type="button"
                    >
                    View
                    </button>
                </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="flex items-center justify-center rounded-2xl h-96">
              <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] border p-2 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
                <div className="min-h-[245px]">
                    <img
                    className="w-full rounded-lg"
                    src="https://readymadeui.com/cardImg.webp"
                    />
                </div>
                <div className="p-6 text-center">
                    <h3 className="text-xl font-bold">
                    Heading
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor          arcu,          at fermentum dui. Maecenas
                    </p>
                    <button
                    className="mt-6 bg-[#116A7B] hover:bg-transparent hover:text-[#116A7B] border-2 border-[#116A7B] transition-all text-white font-semibold text-sm tracking-wide rounded-md px-6 py-2.5 w-full"
                    type="button"
                    >
                    View
                    </button>
                </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="flex items-center justify-center rounded-2xl h-96">
              <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] border p-2 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
                <div className="min-h-[245px]">
                    <img
                    className="w-full rounded-lg"
                    src="https://readymadeui.com/cardImg.webp"
                    />
                </div>
                <div className="p-6 text-center">
                    <h3 className="text-xl font-bold">
                    Heading
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor          arcu,          at fermentum dui. Maecenas
                    </p>
                    <button
                    className="mt-6 bg-[#116A7B] hover:bg-transparent hover:text-[#116A7B] border-2 border-[#116A7B] transition-all text-white font-semibold text-sm tracking-wide rounded-md px-6 py-2.5 w-full"
                    type="button"
                    >
                    View
                    </button>
                </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="flex items-center justify-center rounded-2xl h-96">
              <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] border p-2 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
                <div className="min-h-[245px]">
                    <img
                    className="w-full rounded-lg"
                    src="https://readymadeui.com/cardImg.webp"
                    />
                </div>
                <div className="p-6 text-center">
                    <h3 className="text-xl font-bold">
                    Heading
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor          arcu,          at fermentum dui. Maecenas
                    </p>
                    <button
                    className="mt-6 bg-[#116A7B] hover:bg-transparent hover:text-[#116A7B] border-2 border-[#116A7B] transition-all text-white font-semibold text-sm tracking-wide rounded-md px-6 py-2.5 w-full"
                    type="button"
                    >
                    View
                    </button>
                </div>
                </div>
              </div>
            </div>
          </div>

          <div className="swiper-pagination"></div>

          <div className="absolute left-0 right-0 flex items-center justify-center hidden m-auto w-fit bottom-12">
            <button className="swiper-button-prev group !p-2 flex justify-center items-center border border-solid border-indigo-600 !w-12 !h-12 transition-all duration-500 rounded-full hover:bg-indigo-600 !-translate-x-16">
              <svg className="w-5 h-5 text-indigo-600 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="swiper-button-next group !p-2 flex justify-center items-center border border-solid border-indigo-600 !w-12 !h-12 transition-all duration-500 rounded-full hover:bg-indigo-600 !translate-x-16">
              <svg className="w-5 h-5 text-indigo-600 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Adding Swiper.js with next/script */}
      <Script src="https://unpkg.com/swiper/swiper-bundle.min.js" strategy="beforeInteractive" />
    </div>
  );
}
