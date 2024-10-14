"use client";
import React from "react";
import dynamic from "next/dynamic";

const ProductsList = dynamic(() => import("../components/productsList.js"), {
  loading: () => <p>Loading...</p>,
  ssr: true,
});

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ProductsList />
    </div>
  );
}
