// "use client";

// import Link from "next/link";
// import { Menu, ShoppingCart } from "lucide-react";
// import LogoutButton from "../LogoutButton";
// import { useCart } from "../context/CartContext";
// import { usePathname } from "next/navigation";

// export default function Navbar({ token }) {
//   const { cartQuantity } = useCart();
//   const pathName = usePathname();
//   const isAuth = pathName.startsWith("/admin");
//   if (isAuth) return null;
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
//           <button className="ml-4 lg:hidden">
//             <Menu className="w-6 h-6" />
//           </button>
//         </div>
//         <div
//           className="w-full lg:flex lg:items-center lg:w-auto lg:order-1 max-lg:hidden"
//           id="mobile-menu-2"
//         >
//           <nav>
//             <ul className="items-center justify-between pt-4 text-base text-gray-700 lg:flex lg:pt-0">
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
///////////////////////////

"use client";

import Link from "next/link";
import { Menu, ShoppingCart, User } from "lucide-react";
import LogoutButton from "../LogoutButton";
import { useCart } from "../context/CartContext";
import { usePathname } from "next/navigation";

export default function Navbar({ token }) {
  const cartContext = useCart(); // Store the context in a variable
  const cartQuantity = cartContext?.cartQuantity || 0; // Safely access cartQuantity
  const pathName = usePathname();
  const isAuth = pathName.startsWith("/admin");

  if (isAuth) return null;

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
          {!token && (
            <Link
              href="/login"
              className="px-4 py-2 text-sm rounded-full font-bold text-white bg-[#116A7B] hover:bg-[#0E5A6A] transition-colors"
            >
              Login
            </Link>
          )}
          {token && (
            <>
              <Link href="/Profile" className="relative mr-5">
                <User className="w-6 h-6 cursor-pointer hover:text-[#116A7B]" />
              </Link>
              <Link href="/cart" className="relative mr-4">
                <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-[#116A7B]" />
                <span className="absolute -top-2 -right-2 px-1 py-0.5 text-xs text-white bg-red-500 rounded-full">
                  {cartQuantity}
                </span>
              </Link>
              <div className="px-4 py-2 text-sm rounded-full font-bold text-white bg-[#116A7B] hover:bg-[#0E5A6A] transition-colors cursor-pointer">
                <LogoutButton />
              </div>
            </>
          )}
          <button className="ml-4 lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <div
          className="w-full lg:flex lg:items-center lg:w-auto lg:order-1 max-lg:hidden"
          id="mobile-menu-2"
        >
          <nav>
            <ul className="items-center justify-between pt-4 text-base text-gray-700 lg:flex lg:pt-0">
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

                  href="/contactus"
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
