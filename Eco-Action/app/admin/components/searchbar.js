// SearchBar.js
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-1/2">
      <input
        type="text"
        placeholder="Search by name..."
        className="w-full p-4 pl-12 border-2 border-green-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <FaSearch className="absolute top-5 left-4 text-green-500 text-xl" />
    </div>
  );
};

export default SearchBar;
