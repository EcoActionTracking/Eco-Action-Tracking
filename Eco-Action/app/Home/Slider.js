"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import axios from "axios";
import "../globals.css";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper and SwiperSlide
import { Navigation, Pagination } from "swiper/modules"; // Import modules correctly

export function Slider() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto my-20 font-sans max-md:max-w-md max-w-7xl">
      <h1 className="text-4xl font-extrabold text-center text-[#116A7B] my-10 mb-20">
        Products
      </h1>

      <div className="relative w-full">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500">
            No products available.
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            loop={true}
            pagination={{ clickable: true }}
            slidesPerView={1}
            spaceBetween={5}
            breakpoints={{
              640: {
                slidesPerView: 4, // Show 4 products on small screens
              },
              768: {
                slidesPerView: 4, // Show 4 products on medium screens
              },
              1024: {
                slidesPerView: 4, // Show 4 products on large screens
              },
              1280: {
                slidesPerView: 4, // Show 4 products on extra-large screens
              },
              1536: {
                slidesPerView: 4, // Show 4 products on ultra-wide screens
              },
            }}
            className="multiple-slide-carousel py-52"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="relative z-50 overflow-hidden rounded-lg shadow-md cursor-pointer group hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all w-72 h-80">
                  <div className="w-full mx-auto overflow-hidden h-80 aspect-w-16 aspect-h-8">
                    <img
                      src={product.images[0]}
                      alt="product3"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="absolute left-0 right-0 w-11/12 p-3 mx-auto transition-all duration-300 bg-white rounded-lg -bottom-80 group-hover:bottom-2">
                    <div className="text-center">
                      <h3 className="text-base font-bold text-gray-800">
                        {product.name}
                      </h3>
                      <h4 className="text-lg text-[#116A7B] font-bold mt-2">
                        {product.price} JD
                      </h4>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Adding Swiper.js with next/script */}
      <Script
        src="https://unpkg.com/swiper/swiper-bundle.min.js"
        strategy="beforeInteractive"
      />
    </div>
  );
}