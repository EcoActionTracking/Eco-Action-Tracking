import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function OrderUser({ userId }) {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noOrders, setNoOrders] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  const limit = 1; // Number of orders per page

  const handleUserOrders = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/order/${userId}?page=${page}&limit=${limit}`);
      const { orders, currentPage, totalPages } = response.data;
      if (orders.length === 0) {
        setNoOrders(true);
      } else {
        setUserOrders(orders);
        setCurrentPage(currentPage);
        setTotalPages(totalPages);
      }
    } catch (error) {
      console.error('Error fetching user Orders:', error);
      toast.error('Failed to get Orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      handleUserOrders(currentPage);
    }
  }, [userId, currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <p className="text-center text-[#116A7B]">Loading orders...</p>;
  }

  if (noOrders) {
    return <p className="text-[#116A7B] flex items-center justify-center mt-24">No orders found for this user.</p>;
  }

  return (
    <section className="relative pt-20">
      <ToastContainer />
      <div className="w-full px-4 md:px-5 lg-6">
        <div className="flex items-start justify-center gap-6 xl:flex-row">
          {userOrders.map((order) => (
            <div
              key={order._id}
              className="flex flex-col items-start w-full gap-8 "
            >
              <div className="w-full p-6 transition-all duration-500 border border-[#116A7B] rounded-md group hover:border-gray-400">
               
                <h2 className="pb-6 text-3xl font-bold leading-10 text-center text-[#116A7B] border-b border-gray-200 font-manrope">
                  Order Summary
                </h2>

                <div className='flex flex-col'>
                    
        
                <div>
                <div className="py-6 border-b border-gray-200 data">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="text-lg font-normal leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Stripe Payment Status
                    </p>
                    <p className="text-lg font-medium leading-8 text-gray-900">
                      {order.stripePaymentStatus}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="text-lg font-normal leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                      Phone Number
                    </p>
                    <p className="text-lg font-medium leading-8 text-gray-600">
                      {order.shippingAddress.phoneNumber || "Not provided"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 ">
                    <p className="text-lg font-normal leading-8 text-gray-400 transition-all duration-500 group-hover:text-gray-700 ">
                      City
                    </p>
                    <p className="text-lg font-medium leading-8 text-gray-600">
                      {order.shippingAddress.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6 total">
                  <p className="text-xl font-normal leading-8 text-black ">
                    Total Amount
                  </p>
                  <h5 className="text-2xl font-bold leading-9 text-[#116A7B] font-manrope">
                    ${order.totalAmount.toFixed(2)}
                  </h5>
                </div>
                </div>

                {/* Products Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold leading-8 text-black">
                    Products:
                  </h3>
                  <div className="grid gap-4 mt-3">
                    {order.products.map((item) => (
                      <div
                      key={item._id}
                      className="flex items-center justify-between gap-4 p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-black">{item.product.name}</p>
                        <p className="text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <img src={item.product.images[0]} className='w-40 h-20 ml-4' alt={item.product.name} />
                    </div>
                    
                    ))}
                  </div>
                </div>
                
                </div>
                
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-4 mt-20">
          <button
          className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-gradient-to-r from-[#116A7B] to-[#B2EBF2] text-white hover:bg-[#137B8E]'}`}
          onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg font-medium text-[#116A7B]">
            Page {currentPage} of {totalPages}
          </span>
          <button
          className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-gradient-to-r from-[#116A7B] to-[#B2EBF2] text-white hover:bg-[#137B8E]'}`}
          onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
