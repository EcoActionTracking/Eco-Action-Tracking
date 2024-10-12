"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

// Import the components
import ChallengeForm from "../components/ChallengeForm";
import ChallengeList from "../components/ChallengeList";
import SearchBar from "../components/searchbar";
import Pagination from "../components/pagintaion";

const ChallengeManagement = () => {
  const [challenges, setChallenges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingChallenge, setEditingChallenge] = useState(null);
  const [addingChallenge, setAddingChallenge] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [challengesPerPage] = useState(5); // Number of challenges per page

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/admin/challenges");
      setChallenges(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching challenges");
      setLoading(false);
    }
  };

  const handleAddChallenge = async (newChallenge) => {
    try {
      await axios.post("/api/admin/challenges", newChallenge);
      setAddingChallenge(false);
      fetchChallenges();
      Swal.fire({
        title: "Challenge added!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add the challenge.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleEditChallenge = async (formData) => {
    try {
      if (!formData._id) {
        throw new Error("Challenge ID is missing");
      }

      const { __v, createdAt, updatedAt, ...cleanedData } = formData;

      const response = await axios.put(
        `/api/admin/challenges/${formData._id}`,
        cleanedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      setEditingChallenge(null);
      await fetchChallenges();

      Swal.fire({
        title: "Challenge updated!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message || "Failed to update the challenge.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDeleteChallenge = async (_id) => {
    try {
      await axios.patch(`/api/admin/challenges/${_id}`, { isDeleted: true });
      fetchChallenges();
      Swal.fire({
        title: "Challenge deleted!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the challenge.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Pagination Logic
  const indexOfLastChallenge = currentPage * challengesPerPage;
  const indexOfFirstChallenge = indexOfLastChallenge - challengesPerPage;
  const currentChallenges = challenges.slice(
    indexOfFirstChallenge,
    indexOfLastChallenge
  );
  const totalPages = Math.ceil(challenges.length / challengesPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredChallenges = currentChallenges.filter((challenge) =>
    challenge.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="container mx-auto bg-white p-8 rounded-2xl shadow-lg border border-green-200">
        <h2 className="text-4xl font-bold mb-8 text-green-800 text-center">
          Challenge Management
        </h2>

        <div className="mb-8 flex justify-between items-center">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <button
            onClick={() => setAddingChallenge(true)}
            className="py-2 px-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-transform duration-300 transform hover:scale-105 active:scale-95 flex items-center"
          >
            <MdAdd className="mr-2" />
            Add New Challenge
          </button>
        </div>

        {loading ? (
          <div className="text-center text-xl text-green-700">
            Loading challenges...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-xl">{error}</div>
        ) : (
          <>
            <ChallengeList
              challenges={filteredChallenges} // Use filtered challenges
              onEdit={setEditingChallenge}
              onDelete={handleDeleteChallenge}
            />
            {totalPages > 1 && ( // Only show pagination if there's more than one page
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>

      {addingChallenge && (
        <ChallengeForm
          onSave={handleAddChallenge}
          onClose={() => setAddingChallenge(false)}
        />
      )}

      {editingChallenge && (
        <ChallengeForm
          challenge={editingChallenge}
          onSave={handleEditChallenge}
          onClose={() => setEditingChallenge(null)}
        />
      )}
    </div>
  );
};

export default ChallengeManagement;
