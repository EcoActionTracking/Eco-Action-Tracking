// "use client";

// import { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );

// function CheckoutForm({ cart, total }) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//     zipCode: "",
//     phoneNumber: "",
//   });

//   const stripe = useStripe();
//   const elements = useElements();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!stripe || !elements) {
//       setLoading(false);
//       return;
//     }

//     const { error: stripeError, paymentMethod } =
//       await stripe.createPaymentMethod({
//         type: "card",
//         card: elements.getElement(CardElement),
//       });

//     if (stripeError) {
//       setError(stripeError.message);
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch("/api/checkout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           paymentMethodId: paymentMethod.id,
//           amount: parseInt(total * 100), // Convert to cents
//           products: cart.map((item) => ({
//             product: item.productId._id,
//             quantity: item.quantity,
//           })),
//           shippingAddress: formData,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Payment failed");
//       }

//       const { clientSecret } = await response.json();

//       const { error: confirmError, paymentIntent } =
//         await stripe.confirmCardPayment(clientSecret);

//       if (confirmError) {
//         throw new Error(confirmError.message);
//       }

//       if (paymentIntent.status === "succeeded") {
//         // Clear the cart after successful payment
//         await fetch("/api/cart", { method: "DELETE" });

//         // Redirect to order confirmation page
//         window.location.href = "/order-confirmation";
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label
//             htmlFor="street"
//             className="block mb-2 text-sm font-medium text-[#4D869C]"
//           >
//             Street
//           </label>
//           <input
//             type="text"
//             id="street"
//             name="street"
//             value={formData.street}
//             onChange={handleInputChange}
//             required
//             className="w-full p-2 border rounded-md border-[#CDE8E5] focus:border-[#7AB2B2] focus:ring focus:ring-[#7AB2B2] focus:ring-opacity-50"
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="city"
//             className="block mb-2 text-sm font-medium text-[#4D869C]"
//           >
//             City
//           </label>
//           <input
//             type="text"
//             id="city"
//             name="city"
//             value={formData.city}
//             onChange={handleInputChange}
//             required
//             className="w-full p-2 border rounded-md border-[#CDE8E5] focus:border-[#7AB2B2] focus:ring focus:ring-[#7AB2B2] focus:ring-opacity-50"
//           />
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label
//             htmlFor="state"
//             className="block mb-2 text-sm font-medium text-[#4D869C]"
//           >
//             State
//           </label>
//           <input
//             type="text"
//             id="state"
//             name="state"
//             value={formData.state}
//             onChange={handleInputChange}
//             required
//             className="w-full p-2 border rounded-md border-[#CDE8E5] focus:border-[#7AB2B2] focus:ring focus:ring-[#7AB2B2] focus:ring-opacity-50"
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="country"
//             className="block mb-2 text-sm font-medium text-[#4D869C]"
//           >
//             Country
//           </label>
//           <input
//             type="text"
//             id="country"
//             name="country"
//             value={formData.country}
//             onChange={handleInputChange}
//             required
//             className="w-full p-2 border rounded-md border-[#CDE8E5] focus:border-[#7AB2B2] focus:ring focus:ring-[#7AB2B2] focus:ring-opacity-50"
//           />
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label
//             htmlFor="zipCode"
//             className="block mb-2 text-sm font-medium text-[#4D869C]"
//           >
//             Zip Code
//           </label>
//           <input
//             type="text"
//             id="zipCode"
//             name="zipCode"
//             value={formData.zipCode}
//             onChange={handleInputChange}
//             required
//             className="w-full p-2 border rounded-md border-[#CDE8E5] focus:border-[#7AB2B2] focus:ring focus:ring-[#7AB2B2] focus:ring-opacity-50"
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="phoneNumber"
//             className="block mb-2 text-sm font-medium text-[#4D869C]"
//           >
//             Phone Number
//           </label>
//           <input
//             type="tel"
//             id="phoneNumber"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleInputChange}
//             required
//             className="w-full p-2 border rounded-md border-[#CDE8E5] focus:border-[#7AB2B2] focus:ring focus:ring-[#7AB2B2] focus:ring-opacity-50"
//           />
//         </div>
//       </div>
//       <div>
//         <label
//           htmlFor="card-element"
//           className="block mb-2 text-sm font-medium text-[#4D869C]"
//         >
//           Credit Card
//         </label>
//         <CardElement
//           id="card-element"
//           className="p-2 border rounded-md border-[#CDE8E5] focus:border-[#7AB2B2] focus:ring focus:ring-[#7AB2B2] focus:ring-opacity-50"
//         />
//       </div>
//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#4D869C] hover:bg-[#7AB2B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7AB2B2] transition-colors duration-200 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:hover:scale-100"
//       >
//         {loading ? "Processing..." : `Pay $${total}`}
//       </button>
//     </form>
//   );
// }

// export default function CheckoutFormWrapper(props) {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm {...props} />
//     </Elements>
//   );
// }
////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function CheckoutForm({ cart, total, searchParams }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phoneNumber: "",
  });
  const discount = JSON.parse(
    new URLSearchParams(window.location.search).get("discount")
  );
  const stripe = useStripe();
  const elements = useElements();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: parseInt(total * 100), // Convert to cents
          products: cart.map(item => ({
            product: item.productId._id,
            quantity: item.quantity,
          })),
          shippingAddress: formData,
          discountId: discount.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      const { clientSecret } = await response.json();

      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret);

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent.status === "succeeded") {
        // Clear the cart after successful payment
        await fetch("/api/cart", { method: "DELETE" });

        // Redirect to order confirmation page
        window.location.href = "/order-confirmation";
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="street"
            className="block mb-2 text-sm font-medium text-[#4D869C]"
          >
            Street
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md border-[#CDE8E5] focus:border-[#7AB2B2] focus:ring focus:ring-[#7AB2B2] focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-[#4D869C]"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md border-[#CDE8E5] focus:border-[#7AB2B2] focus:ring focus:ring-[#7AB2B2] focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="state"
            className="block mb-2 text-sm font-medium text-[#4D869C]"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md border-[#CDE8E5] focus:border-[#7AB2B2] focus:ring focus:ring-[#7AB2B2] focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="country"
            className="block mb-2 text-sm font-medium text-[#4D869C]"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md border-[#CDE8E5] focus:border-[#7AB2B2] focus:ring focus:ring-[#7AB2B2] focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="zipCode"
            className="block mb-2 text-sm font-medium text-[#4D869C]"
          >
            Zip Code
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md border-[#CDE8E5] focus:border-[#7AB2B2] focus:ring focus:ring-[#7AB2B2] focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block mb-2 text-sm font-medium text-[#4D869C]"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded-md border-[#CDE8E5] focus:border-[#7AB2B2] focus:ring focus:ring-[#7AB2B2] focus:ring-opacity-50"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="card-element"
          className="block mb-2 text-sm font-medium text-[#4D869C]"
        >
          Credit Card
        </label>
        <CardElement
          id="card-element"
          className="p-2 border rounded-md border-[#CDE8E5] focus:border-[#7AB2B2] focus:ring focus:ring-[#7AB2B2] focus:ring-opacity-50"
        />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#4D869C] hover:bg-[#7AB2B2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7AB2B2] transition-colors duration-200 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:hover:scale-100"
      >
        {loading ? "Processing..." : `Pay $${total}`}
      </button>
    </form>
  );
}

export default function CheckoutFormWrapper(props) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
}
