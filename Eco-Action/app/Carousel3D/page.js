"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const slides = [
  { image: "/path/to/image1.jpg", title: "#متى_نقدرها" },
  { image: "/path/to/image2.jpg", title: "70 مليون ريال" },
  { image: "/path/to/image3.jpg", title: "عنوان آخر" },
  // أضف المزيد من الشرائح حسب الحاجة
];

export default function Carousel3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!dragging) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [dragging]);

  const handleMouseDown = (e) => {
    setDragging(true);
    setStartX(e.pageX - translateX);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const x = e.pageX - startX;
    setTranslateX(x);
  };

  const handleMouseUp = () => {
    setDragging(false);
    const moveThreshold = 100;
    if (Math.abs(translateX) > moveThreshold) {
      if (translateX > 0) {
        setCurrentIndex(
          (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
        );
      } else {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }
    }
    setTranslateX(0);
  };

  const renderSlide = (index) => {
    let offset = index - currentIndex;
    if (offset < -Math.floor(slides.length / 2)) offset += slides.length;
    if (offset > Math.floor(slides.length / 2)) offset -= slides.length;

    const slide = slides[index];
    return (
      <div
        key={index}
        className="absolute w-[250px] h-[350px] transition-all duration-300"
        style={{
          transform: `translateX(${offset * 60}%) scale(${
            1 - Math.abs(offset) * 0.2
          }) perspective(1000px) rotateY(${offset * 45}deg)`,
          zIndex: slides.length - Math.abs(offset),
          opacity: 1 - Math.abs(offset) * 0.3,
        }}
      >
        <div className="h-full p-4 bg-white rounded-lg shadow-lg">
          <div className="relative mb-4 h-3/4">
            <Image
              src={slide.image}
              alt={slide.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <h2 className="text-xl font-bold text-right">{slide.title}</h2>
          <div className="flex items-center justify-between mt-2">
            <Image src="/path/to/logo.png" alt="Logo" width={50} height={25} />
            <div className="px-4 py-1 text-sm text-white bg-yellow-400 rounded-full">
              اقرأ المزيد
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="mb-6 text-4xl font-bold text-right text-orange-500">
        المنشورات المصورة:
      </h1>
      <div
        className="relative h-[400px] bg-teal-400 rounded-lg overflow-hidden cursor-grab"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {slides.map((_, index) => renderSlide(index))}
        </div>
      </div>
    </div>
  );
}