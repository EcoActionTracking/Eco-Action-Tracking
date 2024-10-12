// components/CheckoutNavigation.js
"use client";

import { useRouter } from "next/navigation";

export default function CheckoutNavigation({ currentStep }) {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  const getButtonStyle = (step) => {
    const baseStyle = "px-4 py-2 rounded-lg font-semibold";
    if (step === currentStep) {
      return `${baseStyle} bg-blue-600 text-white`;
    }
    if (step > currentStep) {
      return `${baseStyle} bg-gray-300 text-gray-500 cursor-not-allowed`;
    }
    return `${baseStyle} bg-gray-300 text-gray-700`;
  };

  return (
    <div className="flex justify-center space-x-4 mb-6">
      <button
        onClick={() => navigateTo("/cart")}
        className={getButtonStyle(1)}
        disabled={currentStep > 2}
      >
        1 Shipping Address
      </button>
      <button
        onClick={() => navigateTo("/checkout")}
        className={getButtonStyle(2)}
        // disabled={currentStep > 2}
        disabled={true}
      >
        2 Shipping Options
      </button>
      <button
        onClick={() => navigateTo("/order-confirmation")}
        className={getButtonStyle(3)}
        disabled={true}
      >
        3 Payment
      </button>
    </div>
  );
}
