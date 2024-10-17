"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Carousel3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef(null);
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/articles`);
        setArticles(response.data.articles || []); // Ensure it is an array
      } catch (err) {
        setError("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!dragging && articles.length > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [dragging, articles]);

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
          (prevIndex) => (prevIndex - 1 + articles.length) % articles.length
        );
      } else {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
      }
    }
    setTranslateX(0);
  };

  const renderSlide = (index) => {
    if (articles.length === 0) return null; // Prevent rendering if no articles

    let offset = index - currentIndex;
    if (offset < -Math.floor(articles.length / 2)) offset += articles.length;
    if (offset > Math.floor(articles.length / 2)) offset -= articles.length;

    const slide = articles[index];
    return (
      <div
        key={index}
        className="absolute w-[250px] h-[350px] transition-all duration-300"
        style={{
          transform: `translateX(${offset * 60}%) scale(${
            1 - Math.abs(offset) * 0.2
          }) perspective(1000px) rotateY(${offset * 45}deg)`,
          zIndex: articles.length - Math.abs(offset),
          opacity: 1 - Math.abs(offset) * 0.3,
        }}
      >
        <div className="h-full p-4 bg-white rounded-lg shadow-lg">
          <div className="relative mb-4 h-3/4">
            <Image
              src={slide.media?.photos[0]}
              alt={slide.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <h2 className="text-xl font-bold text-right">{slide.title}</h2>
        </div>
      </div>
    );
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (articles.length === 0) {
    return <p>No articles available.</p>;
  }

  function handleReadMore(articleId){
    router.push(`/articles/${articleId}`);
  }
  return (
   
    
    <div className="bg-gradient-to-t from-[#69aab6] to-gray-200 py-20" onClick={() => handleReadMore(articles[currentIndex]?._id)}>
         <h2 className="mb-20 text-4xl font-bold text-center text-[#116A7B]">Eco articles</h2>

    <div className="flex mx-auto max-w-7xl ">
      {/* Slider Section */}
      <div
        className="relative h-[400px] w-1/2 rounded-lg overflow-hidden cursor-grab"
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
          {articles.map((_, index) => renderSlide(index))}
        </div>
      </div>

      {/* Article Description Section */}
      <div className="flex flex-col justify-center w-1/2 p-4 text-white" >

        <h2 className="mb-4 text-2xl font-bold">{articles[currentIndex]?.title}</h2>
        <p className="text-lg">
          {articles[currentIndex]?.description || "No description available."}
        </p>
      </div>
    </div>

    </div>
        

  );
}
