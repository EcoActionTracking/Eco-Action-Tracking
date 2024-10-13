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

export const fetchContacts = async () => {
  try {
    const res = await axios.get("/api/admin/contacts"); // Correct endpoint
    return res.data;
  } catch (error) {
    console.error("Error fetching contacts:", error); // Log error details
    throw new Error("Failed to fetch contacts: " + error.message);
  }
};
