"use client";

import { useEffect, useState } from 'react';
import Script from 'next/script';
import axios from 'axios';
import "../globals.css";
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper and SwiperSlide
import { Navigation, Pagination } from 'swiper/modules'; // Import modules correctly

export function Slider() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-20 font-sans max-md:max-w-md">
      <h1 className="text-4xl font-extrabold text-center text-[#116A7B] my-10">
        Products
      </h1>

      <div className="relative w-full">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500">No products available.</div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]} // Use modules array correctly
            loop={true}
  
            pagination={{ clickable: true }}
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="multiple-slide-carousel py-52"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="flex items-center justify-center rounded-2xl ">
                  <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] border p-2 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4 ">
                    <div className="min-h-[10rem]">
                      <img
                        className="w-full rounded-lg h-80"
                        src={product.images[0]} // Assuming each product has an image property
                        alt={product.name} // Assuming each product has a name property
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold">{product.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-gray-500">
                        {product.price} JD{/* Assuming description property */}
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
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Adding Swiper.js with next/script */}
      <Script src="https://unpkg.com/swiper/swiper-bundle.min.js" strategy="beforeInteractive" />
    </div>
  );
}
