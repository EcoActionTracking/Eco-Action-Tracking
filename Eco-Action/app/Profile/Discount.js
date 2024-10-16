import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

// Main Discount component
const Discount = ({ user }) => {
  const [discounts, setDiscounts] = useState([]); // State to store discounts
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error messages
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  const handleUserOrders = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const response = await axios.get(`/api/discount/${user}`);
      console.log("Discounts", response.data.discounts);
      setDiscounts(response.data.discounts); // Assuming response structure contains discounts array
    } catch (error) {
      setError("Failed to fetch discounts."); // Set error message
      console.error(error); // Log error for debugging
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      handleUserOrders(); // Fetch discounts when the user prop changes
    }
  }, [user]);

  // Function to copy the discount code to the clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setShowPopup(true); // Show popup when code is copied
        setTimeout(() => setShowPopup(false), 2000); // Hide the popup after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy: ', err); // Log error if copying fails
      });
  };

  return (
    <div className="container px-4 py-8 mx-auto ">
      <h1 className="mb-6 text-2xl font-bold text-center text-[#116A7B]">Your Discounts</h1>
      {loading && <p className="text-gray-600">Loading discounts...</p>} {/* Loading indicator */}
      {error && <p className="text-red-600">{error}</p>} {/* Error message */}
      <div className='flex justify-center '>
        {discounts.length > 0 ? (
          discounts.map((discount) => (
            <div className="p-4 mb-4 bg-white border rounded-lg shadow-sm w-[20rem] my-10" key={discount._id}>
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">Discount Code:</div>
                <div className="text-lg font-semibold text-[#54ded0]">{discount.discountCode}</div>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600">Amount: 
                  <span className="font-bold text-green-500"> ${discount.amount}%</span>
                </p>
              </div>
              <div className="relative">
                <button
                  onClick={() => copyToClipboard(discount.discountCode)} // Call copy function with the discount code
                  className="mt-4 px-2 py-1 bg-[#54ded0] text-white rounded hover:bg-[#45c8c4] text-xs"
                >
                  Copy Code
                </button>
                {showPopup && (
                  <div className="absolute px-2 py-1 text-xs text-white transform -translate-x-1/2 bg-green-500 rounded left-1 -top-3">
                    Copied!
                  </div>
                )} {/* Popup message */}
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="text-[#116A7B]">You have no discounts available.</p> // Show no discounts message if not loading
        )}
      </div>
    </div>
  );
};

export default Discount;
