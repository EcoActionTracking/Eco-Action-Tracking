// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import CheckoutForm from "../components/CheckoutForm";
// import { ShoppingCart, CreditCard } from "lucide-react";
// import CheckoutNavigation from "../components/CheckoutNavigation";
// import { motion } from "framer-motion";

// export default function CheckoutPage() {
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchCart() {
//       try {
//         const response = await fetch("/api/cart");
//         if (!response.ok) {
//           throw new Error("Failed to fetch cart");
//         }
//         const data = await response.json();
//         setCart(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchCart();
//   }, []);

//   const calculateTotal = () => {
//     return cart
//       .reduce((total, item) => total + item.productId.price * item.quantity, 0)
//       .toFixed(2);
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen bg-[#EEF7FF] text-[#4D869C] text-xl">
//         Loading...
//       </div>
//     );
//   if (error)
//     return (
//       <div className="flex justify-center items-center h-screen bg-[#EEF7FF] text-red-500 text-xl">
//         Error: {error}
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-[#EEF7FF] py-12 px-4 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-7xl mx-auto"
//       >
//         <h1 className="text-4xl font-bold mb-8 text-center text-[#4D869C]">
//           Checkout
//         </h1>
//         <CheckoutNavigation currentStep={2} />
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//             className="bg-white rounded-lg shadow-lg overflow-hidden"
//           >
//             <div className="bg-gradient-to-r from-[#CDE8E5] to-[#7AB2B2] p-6">
//               <h2 className="text-2xl font-semibold mb-4 flex items-center text-[#4D869C]">
//                 <ShoppingCart className="mr-2" /> Your Cart
//               </h2>
//             </div>
//             <div className="p-6 space-y-4">
//               {cart.map((item) => (
//                 <div
//                   key={item.productId._id}
//                   className="flex justify-between items-center border-b border-[#CDE8E5] pb-4"
//                 >
//                   <div>
//                     <p className="font-medium text-[#4D869C]">
//                       {item.productId.name}
//                     </p>
//                     <p className="text-sm text-[#7AB2B2]">
//                       Quantity: {item.quantity}
//                     </p>
//                   </div>
//                   <p className="font-semibold text-[#4D869C]">
//                     ${(item.productId.price * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//               ))}
//               <div className="pt-4 border-t border-[#CDE8E5]">
//                 <div className="flex justify-between items-center">
//                   <p className="text-lg font-semibold text-[#4D869C]">Total:</p>
//                   <p className="text-xl font-bold text-[#4D869C]">
//                     ${calculateTotal()}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//             className="bg-white rounded-lg shadow-lg overflow-hidden"
//           >
//             <div className="bg-gradient-to-r from-[#CDE8E5] to-[#7AB2B2] p-6">
//               <h2 className="text-2xl font-semibold mb-4 flex items-center text-[#4D869C]">
//                 <CreditCard className="mr-2" /> Payment Details
//               </h2>
//             </div>
//             <div className="p-6">
//               <CheckoutForm cart={cart} total={calculateTotal()} />
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
//////////////////
////////////////////////////////////////////////////////////////
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckoutForm from "../components/CheckoutForm";
import { ShoppingCart, CreditCard } from "lucide-react";
import CheckoutNavigation from "../components/CheckoutNavigation";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch("/api/cart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }
        const data = await response.json();
        setCart(data);

        // Get discount from URL query
        const discountParam = new URLSearchParams(window.location.search).get(
          "discount"
        );
        if (discountParam) {
          setAppliedDiscount(JSON.parse(discountParam));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  const calculateSubtotal = () => {
    return cart
      .reduce((total, item) => total + item.productId.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const shipping = 4.0;
    const tax = 4.0;
    let total = subtotal + shipping + tax;

    if (appliedDiscount) {
      total -= appliedDiscount.amount;
    }

    return total.toFixed(2);
  };

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

  return (
    <div className="min-h-screen bg-[#EEF7FF] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-[#4D869C]">
          Checkout
        </h1>
        <CheckoutNavigation currentStep={2} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#CDE8E5] to-[#7AB2B2] p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-[#4D869C]">
                <ShoppingCart className="mr-2" /> Your Cart
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {cart.map(item => (
                <div
                  key={item.productId._id}
                  className="flex justify-between items-center border-b border-[#CDE8E5] pb-4"
                >
                  <div>
                    <p className="font-medium text-[#4D869C]">
                      {item.productId.name}
                    </p>
                    <p className="text-sm text-[#7AB2B2]">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-[#4D869C]">
                    ${(item.productId.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="pt-4 border-t border-[#CDE8E5]">
                {/* <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-[#4D869C]">
                    Total Before Discount:
                  </p>
                  <p className="text-xl font-bold text-[#4D869C]">
                    ${calculateSubtotal()}
                  </p>
                </div> */}
                {appliedDiscount && (
                  <div className="flex justify-between items-center text-green-600">
                    <p className="text-lg font-semibold">Discount:</p>
                    <p className="text-xl font-bold">
                      -${appliedDiscount.amount.toFixed(2)}
                    </p>
                  </div>
                )}
                <div className="flex justify-between items-center mt-2">
                  <p className="text-lg font-semibold text-[#4D869C]">Total:</p>
                  <p className="text-xl font-bold text-[#4D869C]">
                    ${calculateTotal()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#CDE8E5] to-[#7AB2B2] p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-[#4D869C]">
                <CreditCard className="mr-2" /> Payment Details
              </h2>
            </div>
            <div className="p-6">
              <CheckoutForm
                cart={cart}
                total={calculateTotal()}
                discount={appliedDiscount}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
