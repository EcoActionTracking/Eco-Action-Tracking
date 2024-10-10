// import Link from "next/link";
// import { Menu } from "lucide-react";
// import LogoutButton from "../LogoutButton";

// export default function Navbar({ token }) {
//   return (
//     <nav className="bg-gradient-to-r from-green-500 to-blue-500">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <span className="text-white text-xl font-bold">
//               Eco-Action Tracking
//             </span>
//           </div>
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-4">
//               <Link
//                 className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md"
//                 href="/"
//               >
//                 Home
//               </Link>
//               <Link
//                 className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md"
//                 href="/products"
//               >
//                 products
//               </Link>

//               {!token && (
//                 <Link
//                   className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md"
//                   href="/login"
//                 >
//                   Login
//                 </Link>
//               )}
//             </div>
//           </div>
//           <div className="flex items-center justify-end space-x-4 w-full">
//             {token && <LogoutButton />}
//             <button className="text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 ml-4 md:hidden">
//               <Menu className="h-6 w-6" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
// //////////////////////////////////ok top////
// import Link from "next/link";
// import { Menu, ShoppingCart } from "lucide-react";
// import LogoutButton from "../LogoutButton";

// export default function Navbar({ token }) {
//   return (
//     <nav className="bg-green-500 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link href="/" className="text-white text-2xl font-bold">
//           Eco-Action Tracking
//         </Link>
//         <div className="flex items-center space-x-4">
//           <Link href="/" className="text-white">
//             Home
//           </Link>
//           <Link href="/products" className="text-white">
//             Products
//           </Link>
//           <Link href="/cart" className="text-white">
//             <ShoppingCart className="inline-block mr-1" />
//             Cart
//           </Link>
//           {!token && (
//             <Link href="/login" className="text-white">
//               Login
//             </Link>
//           )}
//           {token && <LogoutButton />}
//         </div>
//       </div>
//     </nav>
//   );
// }
///////////////////////////
// import Link from "next/link";
// import { Menu, ShoppingCart } from "lucide-react";
// import LogoutButton from "../LogoutButton";

// export default function Navbar({ token }) {
//   return (
//     <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-sans min-h-[70px] tracking-wide relative z-50">
//       <div className="flex flex-wrap items-center justify-between w-full gap-4">
//         <Link href="/">
//           <img
//             src="https://readymadeui.com/readymadeui.svg"
//             alt="logo"
//             className="w-36"
//           />
//         </Link>

//         <div
//           id="collapseMenu"
//           className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
//         >
//           <button
//             id="toggleClose"
//             className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="w-4 fill-black"
//               viewBox="0 0 320.591 320.591"
//             >
//               <path
//                 d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
//                 data-original="#000000"
//               ></path>
//               <path
//                 d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
//                 data-original="#000000"
//               ></path>
//             </svg>
//           </button>

//           <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
//             <li className="hidden mb-6 max-lg:block">
//               <Link href="/">
//                 <img
//                   src="https://readymadeui.com/readymadeui.svg"
//                   alt="logo"
//                   className="w-36"
//                 />
//               </Link>
//             </li>
//             <li className="px-3 max-lg:border-b max-lg:py-3">
//               <Link
//                 href="/"
//                 className="hover:text-[#116A7B] text-[#116A7B] font-bold block text-base"
//               >
//                 Home
//               </Link>
//             </li>
//             <li className="px-3 max-lg:border-b max-lg:py-3">
//               <Link
//                 href="/products"
//                 className="hover:text-[#116A7B] text-gray-600 font-bold block text-base"
//               >
//                 Products
//               </Link>
//             </li>
//             <li className="px-3 max-lg:border-b max-lg:py-3">
//               <Link
//                 href="/cart"
//                 className="hover:text-[#116A7B] text-gray-600 font-bold block text-base"
//               >
//                 <ShoppingCart className="inline-block mr-1" />
//                 Cart
//               </Link>
//             </li>
//             {/* Other menu items... */}
//           </ul>
//         </div>

//         <div className="flex items-center space-x-5 max-lg:ml-auto">
//           {!token && (
//             <Link
//               className="px-3 py-2 rounded-md text-black hover:bg-white hover:bg-opacity-20"
//               href="/login"
//             >
//               Login
//             </Link>
//           )}
//           {token && <LogoutButton />}
//           <button className="p-2 ml-4 text-black rounded-full hover:bg-white hover:bg-opacity-20 md:hidden">
//             <Menu className="w-6 h-6" />
//           </button>

//           <Link href="/cart" className="relative">
//             <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-[#116A7B]" />
//             <span className="absolute top-0 left-auto px-1 py-0 -ml-1 text-xs text-white bg-red-500 rounded-full">
//               0
//             </span>
//           </Link>

//           <button id="toggleOpen" className="lg:hidden !ml-7">
//             <svg
//               className="w-7 h-7"
//               fill="#000"
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//                 clipRule="evenodd"
//               ></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }
// ///////////الي فوق سستم////
// "use client";

// import Link from "next/link";
// import { Menu, ShoppingCart } from "lucide-react";
// import LogoutButton from "../LogoutButton";
// import { useCart } from "../context/CartContext";

// export default function Navbar({ token }) {
//   const { cartQuantity } = useCart();

//   return (
//     <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-sans min-h-[70px] tracking-wide relative z-50">
//       <div className="flex flex-wrap items-center justify-between w-full gap-4">
//         <Link href="/">
//           <img
//             src="https://readymadeui.com/readymadeui.svg"
//             alt="logo"
//             className="w-36"
//           />
//         </Link>

//         <div className="flex items-center lg:order-2 max-lg:ml-auto">
//           <Link href="/cart" className="relative mr-4">
//             <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-[#116A7B]" />
//             <span className="absolute -top-2 -right-2 px-1 py-0.5 text-xs text-white bg-red-500 rounded-full">
//               {cartQuantity}
//             </span>
//           </Link>

//           {!token && (
//             <Link
//               href="/login"
//               className="px-4 py-2 text-sm rounded-full font-bold text-white bg-[#116A7B] hover:bg-[#0E5A6A] transition-colors"
//             >
//               Login
//             </Link>
//           )}
//           {token && <LogoutButton />}

//           <button className="lg:hidden ml-4">
//             <Menu className="w-6 h-6" />
//           </button>
//         </div>

//         <div
//           className="lg:flex lg:items-center lg:w-auto w-full lg:order-1 max-lg:hidden"
//           id="mobile-menu-2"
//         >
//           <nav>
//             <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
//               <li>
//                 <Link
//                   href="/"
//                   className="lg:p-4 py-2 block hover:text-[#116A7B]"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/products"
//                   className="lg:p-4 py-2 block hover:text-[#116A7B]"
//                 >
//                   Products
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/about"
//                   className="lg:p-4 py-2 block hover:text-[#116A7B]"
//                 >
//                   About
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/contact"
//                   className="lg:p-4 py-2 block hover:text-[#116A7B]"
//                 >
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }
// /////////////////////////////////

// "use client";

// import Link from "next/link";
// import { Menu, ShoppingCart } from "lucide-react";
// import LogoutButton from "../LogoutButton";
// import { useCart } from "../context/CartContext";

// export default function Navbar({ token }) {
//   const { cartQuantity } = useCart();

//   return (
//     <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-sans min-h-[70px] tracking-wide relative z-50">
//       <div className="flex flex-wrap items-center justify-between w-full gap-4">
//         <Link href="/">
//           <img
//             src="https://readymadeui.com/readymadeui.svg"
//             alt="logo"
//             className="w-36"
//           />
//         </Link>

//         <div className="flex items-center lg:order-2 max-lg:ml-auto">
//           <Link href="/cart" className="relative mr-4">
//             <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-[#116A7B]" />
//             <span className="absolute -top-2 -right-2 px-1 py-0.5 text-xs text-white bg-red-500 rounded-full">
//               {cartQuantity}
//             </span>
//           </Link>

//           {!token && (
//             <Link
//               href="/login"
//               className="px-4 py-2 text-sm rounded-full font-bold text-white bg-[#116A7B] hover:bg-[#0E5A6A] transition-colors"
//             >
//               Login
//             </Link>
//           )}

//           {token && (
//             <div className="px-4 py-2 text-sm rounded-full font-bold text-white bg-[#116A7B] hover:bg-[#0E5A6A] transition-colors cursor-pointer">
//               <LogoutButton />
//             </div>
//           )}

//           <button className="lg:hidden ml-4">
//             <Menu className="w-6 h-6" />
//           </button>
//         </div>

//         <div
//           className="lg:flex lg:items-center lg:w-auto w-full lg:order-1 max-lg:hidden"
//           id="mobile-menu-2"
//         >
//           <nav>
//             <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
//               <li>
//                 <Link
//                   href="/"
//                   className="lg:p-4 py-2 block hover:text-[#116A7B]"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/products"
//                   className="lg:p-4 py-2 block hover:text-[#116A7B]"
//                 >
//                   Products
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/about"
//                   className="lg:p-4 py-2 block hover:text-[#116A7B]"
//                 >
//                   About
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/contact"
//                   className="lg:p-4 py-2 block hover:text-[#116A7B]"
//                 >
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }
///////////////////////
////////
//////////////////////
"use client";
import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import LogoutButton from "../LogoutButton";
import { useCart } from "../context/CartContext";

export default function Navbar({ token }) {
  const { cartQuantity } = useCart();

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-sans min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between w-full gap-4">
        <Link href="/">
          <img
            src="https://readymadeui.com/readymadeui.svg"
            alt="logo"
            className="w-36"
          />
        </Link>
        <div className="flex items-center lg:order-2 max-lg:ml-auto">
          <Link href="/cart" className="relative mr-4">
            <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-[#116A7B]" />
            <span className="absolute -top-2 -right-2 px-1 py-0.5 text-xs text-white bg-red-500 rounded-full">
              {cartQuantity}
            </span>
          </Link>
          {!token && (
            <Link
              href="/login"
              className="px-4 py-2 text-sm rounded-full font-bold text-white bg-[#116A7B] hover:bg-[#0E5A6A] transition-colors"
            >
              Login
            </Link>
          )}
          {token && (
            <div className="px-4 py-2 text-sm rounded-full font-bold text-white bg-[#116A7B] hover:bg-[#0E5A6A] transition-colors cursor-pointer">
              <LogoutButton />
            </div>
          )}
          <button className="lg:hidden ml-4">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <div
          className="lg:flex lg:items-center lg:w-auto w-full lg:order-1 max-lg:hidden"
          id="mobile-menu-2"
        >
          <nav>
            <ul className="lg:flex items-center justify-between text-base text-gray-700 pt-4 lg:pt-0">
              <li>
                <Link
                  href="/"
                  className="lg:p-4 py-2 block hover:text-[#116A7B]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="lg:p-4 py-2 block hover:text-[#116A7B]"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="lg:p-4 py-2 block hover:text-[#116A7B]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="lg:p-4 py-2 block hover:text-[#116A7B]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
