"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Leaf, ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";

const ITEMS_PER_PAGE = 10;

const SkeletonArticle = () => (
  <div className="animate-pulse bg-white bg-opacity-5 p-6 rounded-2xl mb-8">
    <div className="h-8 bg-white bg-opacity-10 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-white bg-opacity-10 rounded mb-2"></div>
    <div className="h-4 bg-white bg-opacity-10 rounded w-5/6 mb-2"></div>
    <div className="h-4 bg-white bg-opacity-10 rounded w-3/4"></div>
  </div>
);

const ArticleItem = ({ article, handleReadMore }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-br from-[#116A7B] to-[#0D5563] p-6 rounded-2xl mb-8 shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <h2
      className="text-2xl font-bold text-white mb-3 cursor-pointer hover:underline"
      onClick={() => handleReadMore(article._id)}
    >
      {article.title}
    </h2>
    <p className="text-gray-200 mb-4 line-clamp-3">{article.description}</p>
    <div className="flex justify-between items-center text-sm text-gray-300">
      <div className="flex items-center">
        <Calendar size={16} className="mr-2" />
        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center">
        <Tag size={16} className="mr-2" />
        <span>{article.category || "Environment"}</span>
      </div>
    </div>
  </motion.div>
);

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();

  const fetchArticles = useCallback(async page => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/api/articles?page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      setArticles(response.data.articles);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (err) {
      setError("Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles(1);
  }, [fetchArticles]);

  const handleReadMore = useCallback(
    articleId => {
      router.push(`/articles/${articleId}`);
    },
    [router]
  );

  const handlePageChange = useCallback(
    page => {
      fetchArticles(page);
    },
    [fetchArticles]
  );

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <motion.button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-4 py-2 rounded-full ${
            currentPage === i
              ? "bg-[#116A7B] text-white"
              : "bg-white text-[#116A7B] hover:bg-[#116A7B] hover:text-white"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {i}
        </motion.button>
      );
    }
    return buttons;
  };

  return (
    <div className="min-h-screenbg-white overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <Leaf
            key={i}
            className="text-[#116A7B] absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
          />
        ))}
      </div>
      <main className="container mx-auto px-4 py-12 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center text-[#116A7B] mb-6"
        >
          Eco-Friendly Living Articles
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-center text-gray-600 mb-12"
        >
          Discover the latest information and tips about compost,
          sustainability, and environmental impact
        </motion.p>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <SkeletonArticle key={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {articles.map(article => (
                <ArticleItem
                  key={article._id}
                  article={article}
                  handleReadMore={handleReadMore}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mx-1 bg-white text-[#116A7B] hover:bg-[#116A7B] hover:text-white rounded-full p-2"
            >
              <ChevronLeft size={24} />
            </Button>
            {renderPaginationButtons()}
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="mx-1 bg-white text-[#116A7B] hover:bg-[#116A7B] hover:text-white rounded-full p-2"
            >
              <ChevronRight size={24} />
            </Button>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-white bg-red-600 rounded-lg"
          >
            {error}
          </motion.div>
        )}
      </main>
    </div>
  );
}
