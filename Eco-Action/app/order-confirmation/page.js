"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutNavigation from "../components/CheckoutNavigation";
import { motion } from "framer-motion";

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchLatestOrder() {
      try {
        const response = await fetch("/api/orders/latest");
        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestOrder();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#EEF7FF] text-[#4D869C] text-xl">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-[#EEF7FF] text-red-500 text-xl">
        Error: {error}
      </div>
    );
  if (!order)
    return (
      <div className="flex justify-center items-center h-screen bg-[#EEF7FF] text-[#4D869C] text-xl">
        No order found
      </div>
    );

  return (
    <div className="min-h-screen bg-[#EEF7FF] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#CDE8E5] to-[#7AB2B2] p-6">
          <CheckoutNavigation currentStep={3} />
          <h1 className="text-3xl font-bold text-[#4D869C] text-center mt-4">
            Order Confirmation
          </h1>
          <p className="text-[#4D869C] text-center mt-2">
            Thank you for your order!
          </p>
        </div>

        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="border-b border-[#CDE8E5] pb-4 mb-6"
          >
            <div className="flex justify-between">
              <span className="font-semibold text-[#4D869C]">Order Date:</span>
              <span className="text-[#7AB2B2]">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-[#4D869C]">
              Order Details:
            </h2>
            <div className="bg-[#EEF7FF] rounded-lg p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#CDE8E5]">
                    <th className="text-left py-2 text-[#4D869C]">Item</th>
                    <th className="text-right py-2 text-[#4D869C]">Qty</th>
                    <th className="text-right py-2 text-[#4D869C]">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((item, index) => (
                    <tr key={index} className="border-b border-[#CDE8E5]">
                      <td className="py-2 text-[#7AB2B2]">
                        {item.product.name}
                      </td>
                      <td className="text-right py-2 text-[#7AB2B2]">
                        {item.quantity}
                      </td>
                      <td className="text-right py-2 text-[#7AB2B2]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2" className="text-right py-2 text-[#4D869C]">
                      Subtotal:
                    </td>
                    <td className="text-right py-2 text-[#4D869C]">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                  </tr>
                  {order.discount && (
                    <tr>
                      <td
                        colSpan="2"
                        className="text-right py-2 text-[#4D869C]"
                      >
                        Discount ({order.discount.code}):
                      </td>
                      <td className="text-right py-2 text-green-600">
                        -${order.discount.amount.toFixed(2)}
                      </td>
                    </tr>
                  )}
                  <tr className="font-semibold">
                    <td colSpan="2" className="text-right py-2 text-[#4D869C]">
                      Total:
                    </td>
                    <td className="text-right py-2 text-[#4D869C]">
                      $
                      {(
                        order.totalAmount -
                        (order.discount ? order.discount.amount : 0)
                      ).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
          >
            <div className="bg-[#EEF7FF] rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2 text-[#4D869C]">
                Shipping Address:
              </h2>
              <p className="text-[#7AB2B2]">{order.shippingAddress.street}</p>
              <p className="text-[#7AB2B2]">
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zipCode}
              </p>
              <p className="text-[#7AB2B2]">{order.shippingAddress.country}</p>
            </div>
            <div className="bg-[#EEF7FF] rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2 text-[#4D869C]">
                Payment Information:
              </h2>
              <p className="text-[#7AB2B2]">Method: {order.paymentMethod}</p>
              <p className="text-[#7AB2B2]">
                Status: {order.stripePaymentStatus}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/")}
              className="bg-[#4D869C] text-white px-8 py-3 rounded-lg hover:bg-[#7AB2B2] transition duration-300 text-lg font-semibold"
            >
              Return to Home
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
