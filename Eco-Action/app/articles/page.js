"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-lg p-4 h-full">
    <div className="animate-pulse">
      <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    </div>
  </div>
);

const ArticleCard = ({ article, handleReadMore }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
  >
    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden">
      <CardHeader className="p-0 relative">
        <Image
          src={
            !article.media.photos[0] ||
            "data:image/jpeg;base64,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"
          }
          alt={article.title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-[#116A7B] text-white px-2 py-1 rounded-full text-xs">
          {article.category || "Environment"}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-semibold text-[#116A7B] mb-2 line-clamp-2">
          {article.title}
        </CardTitle>
        <p className="text-gray-600 text-sm line-clamp-3">
          {article.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <Button
          className="bg-[#116A7B] hover:bg-[#0D5563] text-white transition-colors duration-300"
          onClick={() => handleReadMore(article._id)}
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
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
              : "bg-white text-[#116A7B] hover:bg-[#116A7B] hover:bg-opacity-10"
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
    <div className="min-h-screen bg-gradient-to-br from-[#116A7B] to-[#0D5563] overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <Leaf
            key={i}
            className="text-white absolute animate-float"
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
          className="text-5xl font-bold text-center text-white mb-6"
        >
          Eco-Friendly Living Articles
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-center text-white mb-12"
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {articles.map(article => (
                <ArticleCard
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
              className="mx-1 bg-white text-[#116A7B] hover:bg-[#0D5563] hover:text-white rounded-full p-2"
            >
              <ChevronLeft size={24} />
            </Button>
            {renderPaginationButtons()}
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="mx-1 bg-white text-[#116A7B] hover:bg-[#0D5563] hover:text-white rounded-full p-2"
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
