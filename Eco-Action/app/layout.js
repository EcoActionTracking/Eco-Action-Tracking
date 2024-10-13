import localFont from "next/font/local";
import "./globals.css";
import { cookies } from "next/headers";
import Navbar from "../app/Navbar/Navbar";
import { Footer } from "./Footer/Footer";
import { CartProvider } from "./context/CartContext";

import { SessionProvider } from "next-auth/react";
import { NotificationProvider } from "./context/NotificationContext";
import NotificationAlert from "./components/NotificationAlert";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Eco-Action Tracking",
  description:
    "A platform for tracking environmental actions and promoting sustainability.",
};

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  // Check if the current page is the login page
  const isLoginPage = children.type.name === "Login";

  return (
    <html lang="en">
      <head>
        {/* Include Swiper's CSS */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper/swiper-bundle.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <NotificationProvider> */}
          <CartProvider>
            {!isLoginPage && <Navbar token={token} />}
            {/* <NotificationAlert /> */}

            {children}
            <Footer />
          </CartProvider>
        {/* </NotificationProvider> */}
      </body>
    </html>
  );
}
