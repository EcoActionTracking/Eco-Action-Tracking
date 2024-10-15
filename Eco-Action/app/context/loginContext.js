"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogIn = () => useContext(LoginContext);
