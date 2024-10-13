"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/pagintaion";
import SearchBar from "../components/searchbar";

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(5); // Number of contacts per page

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/admin/contacts");
        if (
          response.data &&
          response.data.success &&
          Array.isArray(response.data.data)
        ) {
          setContacts(response.data.data);
        } else {
          throw new Error("Invalid data structure received from API");
        }
      } catch (err) {
        setError(
          "Failed to load contacts: " +
            (err.response?.data?.error || err.message)
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // Pagination Logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;

  // Apply search filter BEFORE slicing for pagination
  const filteredContacts = contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Slice the filtered results for the current page
  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  // Use the length of filteredContacts for calculating total pages
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="text-center text-xl text-green-700">
        Loading contacts...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="container mx-auto bg-white p-8 rounded-2xl shadow-lg border border-green-200">
        <h2 className="text-4xl font-bold mb-8 text-green-800 text-center">
          Contact Messages
        </h2>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full p-4 pl-12 border-2 border-green-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />{" "}
        </div>

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
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Use currentContacts here to render paginated results */}
              {currentContacts.map((contact) => (
                <tr key={contact._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contact.firstName} {contact.lastName}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-blue-500 hover:underline"
                    >
                      {contact.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contact.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {filteredContacts.length > contactsPerPage && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactManagement;
