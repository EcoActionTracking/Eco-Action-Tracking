"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    fetchCartQuantity();
  }, []);

  const fetchCartQuantity = async () => {
    try {
      const response = await fetch("/api/cart");
      if (response.ok) {
        const cartItems = await response.json();
        const totalQuantity = cartItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setCartQuantity(totalQuantity);
      }
    } catch (error) {
      console.error("Error fetching cart quantity:", error);
    }
  };

  const updateCartQuantity = quantity => {
    setCartQuantity(prevQuantity => prevQuantity + quantity);
  };

  return (
    <CartContext.Provider
      value={{
        cartQuantity,
        updateCartQuantity,
        fetchCartQuantity,
        setCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
