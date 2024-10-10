// // scripts/seedProducts.js
// import mongoose from "mongoose";
// import Product from "../models/Product";
// import dbConnect from "../lib/mongodb";

// const productData = [
//   {
//     name: "Eco-friendly Water Bottle",
//     description: "Reusable water bottle made from recycled materials",
//     price: 15.99,
//     category: "Home",
//     images: ["bottle1.jpg", "bottle2.jpg"],
//   },
//   {
//     name: "Organic Cotton T-shirt",
//     description: "Comfortable t-shirt made from 100% organic cotton",
//     price: 29.99,
//     category: "Clothing",
//     images: ["tshirt1.jpg", "tshirt2.jpg"],
//   },
//   {
//     name: "Bamboo Toothbrush Set",
//     description: "Set of 4 biodegradable bamboo toothbrushes",
//     price: 12.99,
//     category: "Personal Care",
//     images: ["toothbrush1.jpg", "toothbrush2.jpg"],
//   },
//   // Add more product objects as needed
// ];

// async function seedProducts() {
//   try {
//     await dbConnect();
//     console.log("Connected to database");

//     // Delete existing products
//     await Product.deleteMany({});
//     console.log("Deleted existing products");

//     // Insert new products
//     const insertedProducts = await Product.insertMany(productData);
//     console.log(`Inserted ${insertedProducts.length} products`);

//     console.log("Seeding completed successfully");
//   } catch (error) {
//     console.error("Error seeding products:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// seedProducts();
/////////

import mongoose from "mongoose";
import Product from "../models/Product.js"; // Make sure to add .js extension here
import dbConnect from "../lib/mongodb.js"; // And here

const productData = [
  {
    name: "Eco-friendly Water Bottle",
    description: "Reusable water bottle made from recycled materials",
    price: 15.99,
    category: "Home",
    images: ["bottle1.jpg", "bottle2.jpg"],
  },
  {
    name: "Organic Cotton T-shirt",
    description: "Comfortable t-shirt made from 100% organic cotton",
    price: 29.99,
    category: "Clothing",
    images: ["tshirt1.jpg", "tshirt2.jpg"],
  },
  {
    name: "Bamboo Toothbrush Set",
    description: "Set of 4 biodegradable bamboo toothbrushes",
    price: 12.99,
    category: "Personal Care",
    images: ["toothbrush1.jpg", "toothbrush2.jpg"],
  },
  // Add more product objects as needed
];

async function seedProducts() {
  try {
    await dbConnect();
    console.log("Connected to database");

    // Delete existing products
    await Product.deleteMany({});
    console.log("Deleted existing products");

    // Insert new products
    const insertedProducts = await Product.insertMany(productData);
    console.log(`Inserted ${insertedProducts.length} products`);

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedProducts();
