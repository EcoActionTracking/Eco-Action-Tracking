"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import axios from "axios";
import "../globals.css";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper and SwiperSlide
import { Navigation, Pagination } from "swiper/modules"; // Import modules correctly
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, X, Check } from "lucide-react";


function ProductPopup({ product, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#EEF7FF] rounded-lg p-10 max-w-5xl w-11/12 max-h-[95vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#4D869C] hover:text-[#7AB2B2]"
        >
          <X size={28} />
        </button>
        <div className="flex flex-col gap-10 lg:flex-row">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full lg:w-1/2 h-80 lg:h-[500px] object-cover rounded-lg"
          />
          <div className="flex flex-col justify-between lg:w-1/2">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-[#4D869C]">
                {product.name}
              </h2>
              <p className="text-[#7AB2B2] mb-4">{product.description}</p>
              <span className="text-sm font-semibold text-[#4D869C] bg-[#CDE8E5] px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-[#4D869C] mb-4">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}



export function Slider() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
          Eco Products
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
              <>
              
            
              <SwiperSlide key={product.id}>
                <div onClick={() => setSelectedProduct(product)} className="relative z-50 overflow-hidden rounded-lg shadow-md cursor-pointer group hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all w-72 h-80">
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
                
      
              </>
            ))}
          </Swiper>
        )}
      </div>
      {selectedProduct  && (
          <ProductPopup
             product={selectedProduct}
             onClose={() => setSelectedProduct(null)} 
             />
        )}
      {/* Adding Swiper.js with next/script */}
      <Script
        src="https://unpkg.com/swiper/swiper-bundle.min.js"
        strategy="beforeInteractive"
      />

    </div>
  );
}