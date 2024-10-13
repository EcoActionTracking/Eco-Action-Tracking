"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Leaf } from "lucide-react";
import Link from "next/link";

const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-[#116A7B] bg-opacity-20 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-[#116A7B] bg-opacity-10 rounded w-1/4 mb-6"></div>
    <div className="h-4 bg-[#116A7B] bg-opacity-10 rounded w-full mb-2"></div>
    <div className="h-4 bg-[#116A7B] bg-opacity-10 rounded w-full mb-2"></div>
    <div className="h-4 bg-[#116A7B] bg-opacity-10 rounded w-3/4 mb-6"></div>
    <div className="grid grid-cols-2 gap-4">
      <div className="h-48 bg-[#116A7B] bg-opacity-20 rounded"></div>
      <div className="h-48 bg-[#116A7B] bg-opacity-20 rounded"></div>
    </div>
  </div>
);

export default function ArticleDetailsPage() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${params.id}`);
        setArticle(response.data.article);
      } catch (err) {
        setError("Failed to fetch article details");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#116A7B] via-[#116A7B] to-[#0D5563] bg-opacity-10 py-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        {[...Array(30)].map((_, i) => (
          <Leaf
            key={i}
            className="text-[#116A7B] absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 24 + 12}px`,
            }}
          />
        ))}
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/articles" passHref>
            <Button
              variant="outline"
              className="mb-6 bg-white hover:bg-[#116A7B] hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
            </Button>
          </Link>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <SkeletonLoader />
                </CardContent>
              </Card>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8 text-red-600 bg-white rounded-lg shadow-lg"
            >
              {error}
            </motion.div>
          ) : article ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#116A7B] to-[#0D5563] text-white p-6">
                  <CardTitle className="text-3xl font-bold">
                    {article.title}
                  </CardTitle>
                  <p className="text-sm opacity-80">
                    Category: {article.category}
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <motion.p
                    className="text-gray-700 mb-6 text-lg leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {article.description}
                  </motion.p>
                  {article.media.photos.length > 0 && (
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h2 className="text-2xl font-semibold text-[#116A7B] mb-4">
                        Photos
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {article.media.photos.map((photo, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {console.log(photo)}
                            <Image
                              src={photo}
                              alt={`Photo ${index + 1} for ${article.title}`}
                              width={400}
                              height={300}
                              className="rounded-lg object-cover w-full h-64 shadow-md"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {article.media.videos.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h2 className="text-2xl font-semibold text-[#116A7B] mb-4">
                        Videos
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {article.media.videos.map((video, index) => (
                          <div
                            key={index}
                            className="relative w-full aspect-video"
                          >
                            {/* <iframe
                              class="absolute top-0 left-0 w-full h-full"
                              src={video}
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerpolicy="strict-origin-when-cross-origin"
                              allowfullscreen
                            ></iframe> */}
                            <video
                              src={video}
                              controls
                              className="w-full h-64"
                            ></video>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="not-found"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8 text-gray-600 bg-white rounded-lg shadow-lg"
            >
              Article not found
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
