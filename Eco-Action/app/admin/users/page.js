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
import Pagination from "../components/pagintaion"; // Import the Pagination component

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
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `You are about to ${
        currentStatus ? "deactivate" : "activate"
      } this user.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#116A7B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
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
          confirmButtonColor: "#116A7B",
        });
      } catch (error) {
        console.error("Error updating user status:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update the user status.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#116A7B",
        });
      }
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
      className="min-h-screen p-8 bg-gradient-to-br from-C2DEDC to-gray-600"
    >
      <div className="container mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-600">
        <h2 className="text-4xl font-bold mb-8 text-[#122e33] text-center">
          User Management
        </h2>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full p-4 pl-12 border-2 border-[#116A7B] rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#116A7B] focus:border-transparent transition duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-5 left-4 text-[#116A7B] text-xl" />
        </div>

        {loading ? (
          <div className="text-center text-xl text-[#122e33]">
            Loading users...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-xl">{error}</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full table-auto bg-white rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-[#116A7B] to-[#122e33]">
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
                          className="hover:bg-C2DEDC transition-colors duration-300"
                        >
                          <td className="py-4 px-6 text-[#333] flex items-center">
                            <FaUserAlt className="text-[#116A7B] mr-3" />
                            {user.username}
                          </td>
                          <td className="py-4 px-6 text-[#333]">
                            <div className="flex items-center">
                              <FaEnvelope className="text-[#116A7B] mr-3" />
                              {user.email}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-[#333]">
                            <span
                              className={`flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                                user.isActive
                                  ? "bg-[#116A7B] text-white"
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
                                  : "bg-[#116A7B] hover:bg-[#122e33] text-white"
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
                          className="py-8 px-6 text-center text-gray-600 text-lg"
                        >
                          No users found
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Pagination Component */}
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default UsersManagement;
