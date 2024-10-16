"use client";
import React from "react";
import dynamic from "next/dynamic";

const ProductsList = dynamic(() => import("../components/productsList.js"), {
  loading: () => <p>Loading...</p>,
  ssr: true,
});

export default function ProductsPage() {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="mt-8 text-3xl font-bold text-center text-[#116A7B]">Products</h1>
      <ProductsList />
    </div>
  );
}
