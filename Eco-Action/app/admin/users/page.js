"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaUserAlt,
  FaEnvelope,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/users");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      await axios.put(`/api/admin/users/${id}/status`, {
        isActive: !currentStatus,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isActive: !currentStatus } : user
        )
      );

      Swal.fire({
        title: `User ${!currentStatus ? "activated" : "deactivated"}!`,
        text: `The user has been ${
          !currentStatus ? "activated" : "deactivated"
        } successfully.`,
        icon: !currentStatus ? "success" : "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#2F855A", // Darker green for eco-friendly theme
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update the user status.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#2F855A", // Darker green for eco-friendly theme
      });
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-8 bg-gradient-to-br from-green-50 to-teal-50"
    >
      <div className="container mx-auto bg-white p-8 rounded-2xl shadow-lg border border-green-200">
        <h2 className="text-4xl font-bold mb-8 text-green-800 text-center">
          User Management
        </h2>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full p-4 pl-12 border-2 border-green-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-5 left-4 text-green-500 text-xl" />
        </div>

        {loading ? (
          <div className="text-center text-xl text-green-700">
            Loading users...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-xl">{error}</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full table-auto bg-white rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-green-600 to-teal-600">
                  <tr>
                    <th className="py-4 px-6 text-left text-white font-semibold">
                      Name
                    </th>
                    <th className="py-4 px-6 text-left text-white font-semibold">
                      Email
                    </th>
                    <th className="py-4 px-6 text-left text-white font-semibold">
                      Status
                    </th>
                    <th className="py-4 px-6 text-left text-white font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {currentUsers.length > 0 ? (
                      currentUsers.map((user) => (
                        <motion.tr
                          key={user.email}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="hover:bg-green-50 transition-colors duration-300"
                        >
                          <td className="py-4 px-6 text-gray-800 flex items-center">
                            <FaUserAlt className="text-green-500 mr-3" />
                            {user.username}
                          </td>
                          <td className="py-4 px-6 text-gray-800">
                            <div className="flex items-center">
                              <FaEnvelope className="text-green-500 mr-3" />
                              {user.email}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-gray-800">
                            <span
                              className={`flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                                user.isActive
                                  ? "bg-green-200 text-green-800"
                                  : "bg-red-200 text-red-800"
                              }`}
                            >
                              {user.isActive ? (
                                <FaCheckCircle className="mr-2" />
                              ) : (
                                <FaTimesCircle className="mr-2" />
                              )}
                              {user.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                toggleStatus(user._id, user.isActive)
                              }
                              className={`py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out flex items-center ${
                                user.isActive
                                  ? "bg-red-500 hover:bg-red-600 text-white"
                                  : "bg-green-500 hover:bg-green-600 text-white"
                              }`}
                            >
                              <MdEdit className="mr-2" />
                              {user.isActive ? "Deactivate" : "Activate"}
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="py-8 px-6 text-center text-gray-500 text-lg"
                        >
                          No users found
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-center mt-8 space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                className="py-2 px-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                First
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="py-2 px-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </motion.button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(page)}
                    className={`py-2 px-4 rounded-full shadow-lg transition duration-300 ${
                      currentPage === page
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-green-600 hover:bg-green-500 hover:text-white"
                    }`}
                  >
                    {page}
                  </motion.button>
                )
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="py-2 px-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
                className="py-2 px-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Last
              </motion.button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default UsersManagement;
