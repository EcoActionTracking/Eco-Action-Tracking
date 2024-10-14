"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdAdd, MdEdit } from "react-icons/md";
import { FaTrashAlt, FaTimes } from "react-icons/fa";
import axios from "axios"; 
import SearchBar from "../components/searchbar";
import Pagination from "../components/pagintaion";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageModal = ({ isOpen, onClose, imageSrc, articleDescription }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg p-4 max-w-3xl max-h-[90vh] overflow-auto ml-40 h-[40rem] w-[40rem]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Article Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <img
          src={imageSrc}
          alt="Article Image"
          className="rounded w-[40rem] h-[35rem]"
        />
        <p className="mt-4 text-gray-800">{articleDescription}</p> {/* Display description here */}
      </div>
    </div>
  );
};

export default function ArticlesTable() {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalImage, setModalImage] = useState(null);
    const [modalDescription, setModalDescription] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [totalPages, setTotalPages] = useState(1); // Total pages state

    useEffect(() => {
      const fetchArticles = async () => {
        try {
          const res = await axios.get(`/api/articles?page=${currentPage}&limit=5`);
          setArticles(res.data.articles);
          setFilteredArticles(res.data.articles);
          setTotalPages(res.data.totalPages);
        } catch (error) {
          console.error("Error fetching articles:", error);
        }
      };
  
      fetchArticles();
    }, [currentPage]); // Refetch data when currentPage changes
  
    useEffect(() => {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArticles(filtered);
    }, [searchTerm, articles]);

    const openModal = (image, description) => {
      setModalImage(image);
      setModalDescription(description);
    };
  
    const closeModal = () => {
      setModalImage(null);
      setModalDescription(null);
    };

    const handlePageChange = (page) => {
      setCurrentPage(page); // Update the current page state
    };


   
    const handleSoftDelete = async (_id) => {
      try {
        const response = await axios.put(`/api/admin/articles/${_id}`);
    
        // Check for a successful response
        if (response.status === 200) {
          // Update state to remove the deleted article from the list
          setArticles((prevArticles) => prevArticles.filter(article => article._id !== _id));
          setFilteredArticles((prevFiltered) => prevFiltered.filter(article => article._id !== _id));
          toast.success('Article deleted successfully!');
        } else {
          toast.error('Failed to delete the article');
          throw new Error('Failed to soft delete the article');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error occurred while deleting the article');
      }
    };
    

    return (
      <div className="min-h-screen p-8 bg-gradient-to-br from-green-50 to-teal-50">
        <ToastContainer/>
        <div className="container p-8 mx-auto bg-white border border-green-200 shadow-lg rounded-2xl">
          <h2 className="mb-8 text-4xl font-bold text-center text-green-800">
            Articles Management
          </h2>

          <div className="flex items-center justify-between mb-8">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Link href="/admin/AddArticles">
              <div
                className="flex items-center px-4 py-2 text-white transition-transform duration-300 transform bg-green-500 rounded-full shadow-lg hover:bg-green-600 hover:scale-105 active:scale-95"
              >
                <MdAdd className="mr-2" />
                Add New Article
              </div>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full overflow-hidden bg-white rounded-lg table-auto">
              <thead className="bg-gradient-to-r from-green-600 to-teal-600">
                <tr>
                  <th className="px-6 py-4 font-semibold text-left text-white">
                    Title
                  </th>
                  <th className="px-6 py-4 font-semibold text-left text-white">
                    Category
                  </th>
                  <th className="px-6 py-4 font-semibold text-left text-white">
                    Media
                  </th>
                  <th className="px-6 py-4 font-semibold text-left text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredArticles.map((article) => (
                    <motion.tr
                      key={article._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="transition-colors duration-300 hover:bg-green-50"
                    >
                      <td className="px-6 py-4 text-gray-800">{article.title}</td>
                      <td className="px-6 py-4 text-gray-800">{article.category}</td>
                      <td className="px-6 py-4 text-gray-800">
                        {article.media?.photos?.length > 0 ? (
                          <div className="flex space-x-2">
                            {article.media.photos.map((photo, index) => (
                              <img
                                key={index}
                                src={photo || "/placeholder/80/80"}
                                alt={`Photo ${index + 1}`}
                                className="object-cover w-20 h-20 rounded cursor-pointer"
                                onClick={() => openModal(photo, article.description)}
                              />
                            ))}
                          </div>
                        ) : (
                          <p>No media available</p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-800">
                        <div className="flex items-center space-x-4">
                        <Link href={`/admin/Articles/Update/${article._id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-500 transition duration-300 hover:text-blue-700"
                          >
                            <MdEdit className="text-2xl" />
                          </motion.button>
                          </Link>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSoftDelete(article._id)}
                            className="text-red-500 transition duration-300 hover:text-red-700"
                          >
                            <FaTrashAlt className="text-xl" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>

            <ImageModal
              isOpen={!!modalImage}
              onClose={closeModal}
              imageSrc={modalImage}
              articleDescription={modalDescription}
            />
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    );
}
