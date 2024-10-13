// components/CheckoutNavigation.js
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutNavigation({ currentStep }) {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  const getButtonStyle = (step) => {
    const baseStyle =
      "px-6 py-3 rounded-full font-semibold transition duration-300 ease-in-out transform";
    if (step === currentStep) {
      return `${baseStyle} bg-blue-500 text-white shadow-lg scale-105 relative`;
    }
    if (step > currentStep) {
      return `${baseStyle} bg-gray-300 text-gray-500 cursor-not-allowed`;
    }
    return `${baseStyle} bg-white text-gray-700 border border-gray-300 hover:bg-gray-100`;
  };

  return (
    <div className="flex justify-center items-center space-x-8 py-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        {currentStep === 1 && (
          <Image
            src="https://i.pinimg.com/originals/9a/1f/7a/9a1f7a4c3c1778cf8daa8787f7f32f61.jpg"
            alt="Eco Icon"
            width={40}
            height={40}
            className="mb-2"
          />
        )}
        <button
          onClick={() => navigateTo("/cart")}
          className={getButtonStyle(1)}
          disabled={currentStep > 2}
        >
          <div className="flex items-center">
            <span className="mr-2 text-lg">1</span>
            <span>Eco Basket</span>
          </div>
        </button>
      </div>
      <div className="w-12 h-1 bg-gray-300"></div> {/* Divider between steps */}
      <div className="flex flex-col items-center">
        {currentStep === 2 && (
          <Image
            src="https://i.pinimg.com/originals/9a/1f/7a/9a1f7a4c3c1778cf8daa8787f7f32f61.jpg"
            alt="Eco Icon"
            width={40}
            height={40}
            className="mb-2"
          />
        )}
        <button
          onClick={() => navigateTo("/checkout")}
          className={getButtonStyle(2)}
          disabled={true}
        >
          <div className="flex items-center">
            <span className="mr-2 text-lg">2</span>
            <span>Eco-Friendly Checkout</span>
          </div>
        </button>
      </div>
      <div className="w-12 h-1 bg-gray-300"></div> {/* Divider between steps */}
      <div className="flex flex-col items-center">
        {currentStep === 3 && (
          <Image
            src="https://i.pinimg.com/originals/9a/1f/7a/9a1f7a4c3c1778cf8daa8787f7f32f61.jpg"
            alt="Eco Icon"
            width={40}
            height={40}
            className="mb-2"
          />
        )}
        <button
          onClick={() => navigateTo("/order-confirmation")}
          className={getButtonStyle(3)}
          disabled={true}
        >
          <div className="flex items-center">
            <span className="mr-2 text-lg">3</span>
            <span>Eco Confirmation</span>
          </div>
        </button>
      </div>
    </div>
  );
}
