"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { useLogIn } from "../context/loginContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setIsLoggedIn } = useLogIn();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const data = res.data;

      if (data.error) {
        setError(data.error);
      } else if (data.success && data.redirect) {
        console.log("Redirecting to:", data.redirect);
        router.push(data.redirect);
        setIsLoggedIn(true);
      } else {
        setError("Unexpected error occurred.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await axios.get("/api/auth/google");
      const { url } = res.data;
      window.location.href = url; // Redirect to Google OAuth URL
    } catch (error) {
      setError("An error occurred with Google Sign-In. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-10 space-y-8 bg-white shadow-2xl bg-opacity-90 rounded-xl backdrop-filter backdrop-blur-lg"
      >
        <div className="text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <Leaf className="w-12 h-12 mx-auto text-[#116A7B]" />
          </motion.div>
          <h2 className="mt-6 text-3xl font-extrabold text-[#116A7B]">
            Sign in to your eco-account
          </h2>
        </div>
        <motion.form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-[#B2EBF2] focus:border-[#116A7B] focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-[#B2EBF2] focus:border-[#116A7B] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-2 text-sm text-red-500 bg-red-100 border border-red-400 rounded"
            >
              {error}
            </motion.div>
          )}

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out transform border border-transparent rounded-md group bg-gradient-to-r from-[#116A7B] to-[#B2EBF2] hover:to-[#B2EBF2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:scale-105"
            >
              Sign in
            </button>
          </div>
        </motion.form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09v-2.84H2.18C1.06 10.68 0 11.88 0 12.25c0 1.51.55 2.96 1.52 4.09l3.32-2.25z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c-1.73 0-3.32.58-4.67 1.58l3.32 2.25c.54-.36 1.2-.58 1.9-.58 1.68 0 3.09.78 3.91 1.97H22C20.67 5.55 16.77 4.75 12 4.75z"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/signup"
            className="font-medium text-[#116A7B] transition-colors duration-200 hover:text-[#8bbec8]"
          >
            Don't have an account? Sign up to go green
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

Login.displayName = "Login";
