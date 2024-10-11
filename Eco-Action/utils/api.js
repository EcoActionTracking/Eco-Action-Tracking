// utils/api.js
import axios from "axios";

export const fetchProducts = async () => {
  try {
    const response = await axios.get("/api/admin/products"); // Replace with your actual API endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
