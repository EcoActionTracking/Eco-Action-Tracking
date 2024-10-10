"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (!article) {
    return <div className="text-center py-8">Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="container mx-auto px-4">
        <Link href="/articles" passHref>
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
          </Button>
        </Link>
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-green-800">
              {article.title}
            </CardTitle>
            <p className="text-sm text-gray-500">
              Category: {article.category}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">{article.description}</p>
            {article.media.photos.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-green-700 mb-2">
                  Photos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {article.media.photos.map((photo, index) => (
                    <Image
                      key={index}
                      src={photo}
                      alt={`Photo ${index + 1} for ${article.title}`}
                      width={400}
                      height={300}
                      className="rounded-lg object-cover w-full h-64"
                    />
                  ))}
                </div>
              </div>
            )}
            {article.media.videos.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-green-700 mb-2">
                  Videos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {article.media.videos.map((video, index) => (
                    <div key={index} className="aspect-w-16 aspect-h-9">
                      <video
                        src={video}
                        controls
                        className="rounded-lg w-full h-full object-cover"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
