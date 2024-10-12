"use client";

import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const homeImage = "/images/section.svg";

export default function CompanyForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    address: '',
    contact_number: '',
    email: '',
    website: ''
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const token = Cookies.get('token');  
  
    try {
      const response = await axios.post('/api/company', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Make sure token is present
      },
      });
      toast.success('Company registered successfully!'); 
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
  
      // Check for 400 status and display the appropriate message
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message || 'Email already exists. Please change the email.'; 
        toast.error(errorMessage); // Toast error message
      } else {
        toast.error('Failed to create company'); // General error message for other statuses
      }
    }
  }


  const handleSubscribeClick = () => {
    const token = Cookies.get('token'); // Check if token exists
  
    if (!token) {
      toast.info('Please log in to subscribe.'); // Notify user to log in
    } else {
      setIsModalOpen(true); // Open the modal if token is present
    }
  };

  return (
  
      
    <div className={`flex items-center text-center  min-h-[10rem] bg-gradient-to-t from-[#116A7B] to-gray-600 w-full font-[sans-serif] mt-20 `} 
    style={{
        backgroundImage: `url(${homeImage})`, // Use the image URL directly
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }}>
  <div className="max-w-full p-6 mx-auto bg-[#116A7B] bg-opacity-50  px-20">
    <h1 className="my-10 text-sm font-bold text-white sm:text-lg">
    Join us in our mission to reduce food waste! Sign up your company or restaurant to provide excess food and enjoy exclusive discounts on our services. Together, we can make a difference!
    </h1>
  
    <button
          className="px-6 py-3 text-sm font-semibold text-[#116A7B] bg-white rounded hover:bg-slate-100"
          type="button"
          onClick={handleSubscribeClick}
        >
          Subscribe Now
        </button>
  </div>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-[#116A7B] to-[#122e33] sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 text-white bg-[#116A7B] shadow-lg sm:rounded-3xl sm:p-20">
              <div className="pb-6 text-center">
                <h1 className="text-3xl">Company Registration</h1>
                <p className="text-gray-300">
                  Fill up the form below to register your company.
                </p>
              </div>

       

              <form onSubmit={handleSubmit}>
                <input
                  className="w-full px-3 py-2 mb-4 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Company Name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  required
                />

                <input
                  className="w-full px-3 py-2 mb-4 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />

                <input
                  className="w-full px-3 py-2 mb-4 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Contact Number"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleInputChange}
                  required
                />

                <input
                  className="w-full px-3 py-2 mb-4 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

                <input
                  className="w-full px-3 py-2 mb-4 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Website (optional)"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                />

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="px-4 py-2 font-bold text-white bg-red-500 rounded shadow hover:bg-red-600 focus:outline-none focus:shadow-outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 font-bold text-[#116A7B] bg-white rounded shadow border-2 border-transparent hover:bg-[#116A7B] hover:text-white hover:border-white focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
          <ToastContainer />
    </div>
  );
}
