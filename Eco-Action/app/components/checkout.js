// // "use client";

// // import { useState, useEffect } from 'react';
// // import { useRouter } from 'next/navigation';

// // export default function CheckoutPage() {
// //   const [cart, setCart] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [formData, setFormData] = useState({
// //     street: '',
// //     city: '',
// //     state: '',
// //     country: '',
// //     zipCode: '',
// //     phoneNumber: '',
// //     paymentMethod: 'Credit Card',
// //   });
// //   const router = useRouter();

// //   useEffect(() => {
// //     async function fetchCart() {
// //       try {
// //         const response = await fetch("/api/cart");
// //         if (!response.ok) {
// //           throw new Error("Failed to fetch cart");
// //         }
// //         const data = await response.json();
// //         setCart(data);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     fetchCart();
// //   }, []);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prevState => ({
// //       ...prevState,
// //       [name]: value
// //     }));
// //   };

// //   const calculateTotal = () => {
// //     return cart.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await fetch('/api/orders', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           products: cart.map(item => ({
// //             product: item.productId._id,
// //             quantity: item.quantity,
// //           })),
// //           totalAmount: calculateTotal(),
// //           shippingAddress: {
// //             street: formData.street,
// //             city: formData.city,
// //             state: formData.state,
// //             country: formData.country,
// //             zipCode: formData.zipCode,
// //             phoneNumber: formData.phoneNumber,
// //           },
// //           paymentMethod: formData.paymentMethod,
// //         }),
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to create order');
// //       }

// //       // Clear the cart after successful order
// //       await fetch('/api/cart', { method: 'DELETE' });

// //       router.push('/order-confirmation');
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   };

// //   if (loading) return <p>Loading...</p>;
// //   if (error) return <p>Error: {error}</p>;

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <h1 className="text-2xl font-bold mb-4">Checkout</h1>
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //         <div>
// //           <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
// //           {cart.map((item) => (
// //             <div key={item.productId._id} className="mb-2">
// //               <p>{item.productId.name} - Quantity: {item.quantity}</p>
// //               <p>Price: ${(item.productId.price * item.quantity).toFixed(2)}</p>
// //             </div>
// //           ))}
// //           <p className="font-bold mt-4">Total: ${calculateTotal()}</p>
// //         </div>
// //         <div>
// //           <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
// //           <form onSubmit={handleSubmit}>
// //             <div className="mb-4">
// //               <label htmlFor="street" className="block mb-2">Street</label>
// //               <input
// //                 type="text"
// //                 id="street"
// //                 name="street"
// //                 value={formData.street}
// //                 onChange={handleInputChange}
// //                 required
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //             <div className="mb-4">
// //               <label htmlFor="city" className="block mb-2">City</label>
// //               <input
// //                 type="text"
// //                 id="city"
// //                 name="city"
// //                 value={formData.city}
// //                 onChange={handleInputChange}
// //                 required
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //             <div className="mb-4">
// //               <label htmlFor="state" className="block mb-2">State</label>
// //               <input
// //                 type="text"
// //                 id="state"
// //                 name="state"
// //                 value={formData.state}
// //                 onChange={handleInputChange}
// //                 required
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //             <div className="mb-4">
// //               <label htmlFor="country" className="block mb-2">Country</label>
// //               <input
// //                 type="text"
// //                 id="country"
// //                 name="country"
// //                 value={formData.country}
// //                 onChange={handleInputChange}
// //                 required
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //             <div className="mb-4">
// //               <label htmlFor="zipCode" className="block mb-2">Zip Code</label>
// //               <input
// //                 type="text"
// //                 id="zipCode"
// //                 name="zipCode"
// //                 value={formData.zipCode}
// //                 onChange={handleInputChange}
// //                 required
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //             <div className="mb-4">
// //               <label htmlFor="phoneNumber" className="block mb-2">Phone Number</label>
// //               <input
// //                 type="tel"
// //                 id="phoneNumber"
// //                 name="phoneNumber"
// //                 value={formData.phoneNumber}
// //                 onChange={handleInputChange}
// //                 required
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //             <div className="mb-4">
// //               <label htmlFor="paymentMethod" className="block mb-2">Payment Method</label>
// //               <select
// //                 id="paymentMethod"
// //                 name="paymentMethod"
// //                 value={formData.paymentMethod}
// //                 onChange={handleInputChange}
// //                 required
// //                 className="w-full p-2 border rounded"
// //               >
// //                 <option value="Credit Card">Credit Card</option>
// //                 <option value="PayPal">PayPal</option>
// //               </select>
// //             </div>
// //             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
// //               Place Order
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// ///////////////

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
