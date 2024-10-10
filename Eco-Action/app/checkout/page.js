// "use client";

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function CheckoutPage() {
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     street: '',
//     city: '',
//     state: '',
//     country: '',
//     zipCode: '',
//     phoneNumber: '',
//     paymentMethod: 'Credit Card',
//   });
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

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const calculateTotal = () => {
//     return cart.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           products: cart.map(item => ({
//             product: item.productId._id,
//             quantity: item.quantity,
//           })),
//           totalAmount: calculateTotal(),
//           shippingAddress: {
//             street: formData.street,
//             city: formData.city,
//             state: formData.state,
//             country: formData.country,
//             zipCode: formData.zipCode,
//             phoneNumber: formData.phoneNumber,
//           },
//           paymentMethod: formData.paymentMethod,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create order');
//       }

//       // Clear the cart after successful order
//       await fetch('/api/cart', { method: 'DELETE' });

//       router.push('/order-confirmation');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
//           {cart.map((item) => (
//             <div key={item.productId._id} className="mb-2">
//               <p>{item.productId.name} - Quantity: {item.quantity}</p>
//               <p>Price: ${(item.productId.price * item.quantity).toFixed(2)}</p>
//             </div>
//           ))}
//           <p className="font-bold mt-4">Total: ${calculateTotal()}</p>
//         </div>
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="street" className="block mb-2">Street</label>
//               <input
//                 type="text"
//                 id="street"
//                 name="street"
//                 value={formData.street}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="city" className="block mb-2">City</label>
//               <input
//                 type="text"
//                 id="city"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="state" className="block mb-2">State</label>
//               <input
//                 type="text"
//                 id="state"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="country" className="block mb-2">Country</label>
//               <input
//                 type="text"
//                 id="country"
//                 name="country"
//                 value={formData.country}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="zipCode" className="block mb-2">Zip Code</label>
//               <input
//                 type="text"
//                 id="zipCode"
//                 name="zipCode"
//                 value={formData.zipCode}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
//               <input
//                 type="tel"
//                 id="phoneNumber"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="paymentMethod" className="block mb-2">Payment Method</label>
//               <select
//                 id="paymentMethod"
//                 name="paymentMethod"
//                 value={formData.paymentMethod}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               >
//                 <option value="Credit Card">Credit Card</option>
//                 <option value="PayPal">PayPal</option>
//               </select>
//             </div>
//             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//               Place Order
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

///////////////

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function CheckoutPage() {
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//     zipCode: "",
//     phoneNumber: "",
//     paymentMethod: "Credit Card",
//   });
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

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const calculateTotal = () => {
//     return cart
//       .reduce((total, item) => total + item.productId.price * item.quantity, 0)
//       .toFixed(2);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           products: cart.map((item) => ({
//             product: item.productId._id,
//             quantity: item.quantity,
//           })),
//           totalAmount: calculateTotal(),
//           shippingAddress: {
//             street: formData.street,
//             city: formData.city,
//             state: formData.state,
//             country: formData.country,
//             zipCode: formData.zipCode,
//             phoneNumber: formData.phoneNumber,
//           },
//           paymentMethod: formData.paymentMethod,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create order");
//       }

//       // Clear the cart after successful order
//       await fetch("/api/cart", { method: "DELETE" });

//       router.push("/order-confirmation");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
//           {cart.map((item) => (
//             <div key={item.productId._id} className="mb-2">
//               <p>
//                 {item.productId.name} - Quantity: {item.quantity}
//               </p>
//               <p>Price: ${(item.productId.price * item.quantity).toFixed(2)}</p>
//             </div>
//           ))}
//           <p className="font-bold mt-4">Total: ${calculateTotal()}</p>
//         </div>
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="street" className="block mb-2">
//                 Street
//               </label>
//               <input
//                 type="text"
//                 id="street"
//                 name="street"
//                 value={formData.street}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="city" className="block mb-2">
//                 City
//               </label>
//               <input
//                 type="text"
//                 id="city"
//                 name="city"
//                 value={formData.city}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="state" className="block mb-2">
//                 State
//               </label>
//               <input
//                 type="text"
//                 id="state"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="country" className="block mb-2">
//                 Country
//               </label>
//               <input
//                 type="text"
//                 id="country"
//                 name="country"
//                 value={formData.country}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="zipCode" className="block mb-2">
//                 Zip Code
//               </label>
//               <input
//                 type="text"
//                 id="zipCode"
//                 name="zipCode"
//                 value={formData.zipCode}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="phoneNumber" className="block mb-2">
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 id="phoneNumber"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="paymentMethod" className="block mb-2">
//                 Payment Method
//               </label>
//               <select
//                 id="paymentMethod"
//                 name="paymentMethod"
//                 value={formData.paymentMethod}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full p-2 border rounded"
//               >
//                 <option value="Credit Card">Credit Card</option>
//                 <option value="PayPal">PayPal</option>
//               </select>
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Place Order
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
////////////////////

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useRouter } from "next/router";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [order, setOrder] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phoneNumber: "",
  });

  // Assume you have a way to get the cart items and total amount
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Function to handle shipping address changes
  const handleAddressChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  // Function to handle successful payment
  const handlePaymentSuccess = async (stripePaymentId) => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: cartItems.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          })),
          totalAmount,
          shippingAddress,
          paymentMethod,
          stripePaymentId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOrder(data.order);
        // Clear cart or perform any other necessary actions
        router.push("/order-confirmation");
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle error (show error message to user)
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (paymentMethod !== "Stripe") {
      // Handle other payment methods
      // For now, we'll just call handlePaymentSuccess without a Stripe payment ID
      handlePaymentSuccess();
    }
    // For Stripe, the payment is handled in the CheckoutForm component
  };

  if (!session) {
    return <div>Please sign in to access the checkout page.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="street"
              value={shippingAddress.street}
              onChange={handleAddressChange}
              placeholder="Street Address"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="city"
              value={shippingAddress.city}
              onChange={handleAddressChange}
              placeholder="City"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="state"
              value={shippingAddress.state}
              onChange={handleAddressChange}
              placeholder="State"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="country"
              value={shippingAddress.country}
              onChange={handleAddressChange}
              placeholder="Country"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="zipCode"
              value={shippingAddress.zipCode}
              onChange={handleAddressChange}
              placeholder="Zip Code"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="tel"
              name="phoneNumber"
              value={shippingAddress.phoneNumber}
              onChange={handleAddressChange}
              placeholder="Phone Number"
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Stripe">Stripe</option>
          </select>
        </div>

        {paymentMethod === "Stripe" ? (
          <Elements stripe={stripePromise}>
            <CheckoutForm
              amount={totalAmount}
              onSuccess={handlePaymentSuccess}
            />
          </Elements>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Place Order
          </button>
        )}
      </form>

      {order && (
        <div className="mt-8 p-4 bg-green-100 border border-green-400 rounded">
          <h2 className="text-xl font-semibold text-green-800">
            Order Placed Successfully!
          </h2>
          <p>Order ID: {order._id}</p>
          {/* Display other order details as needed */}
        </div>
      )}
    </div>
  );
}
