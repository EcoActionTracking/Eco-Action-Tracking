"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Challenge = () => {
  const [challenges, setChallenges] = useState([]); // State to hold the challenges
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch('/api/challenge'); // API endpoint to fetch challenges
        if (!response.ok) {
          throw new Error('Failed to fetch challenges');
        }
        const data = await response.json();
        setChallenges(data); // Set the challenges in state
      } catch (error) {
        setError(error.message); // Handle error
      }
    };

    fetchChallenges(); // Call the function to fetch challenges
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Render error message if there's an error
  }

  return (
    <div className="bg-white font-sans p-4">
      <div className="max-w-5xl max-lg:max-w-3xl max-md:max-w-sm mx-auto">
        <div>
          <h2 className="text-3xl ml-16 font-extrabold text-gray-800 inline-block">
          "Challenge Yourself: Discover What You're Capable Of!"
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {challenges.map((challenge) => (
            <div key={challenge._id} className="flex max-lg:flex-col bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] hover:scale-[1.03] transition-all duration-300">
              <div className="relative h-64 lg:w-full">
                <Image
                  src={challenge.image || 'https://via.placeholder.com/150'} // Default image if not available
                  alt={challenge.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{challenge.title}</h3>
                <span className="text-sm block text-gray-400 mt-2">{new Date(challenge.createdAt).toLocaleDateString()} | BY SOME AUTHOR</span>
                <p className="text-sm text-gray-500 mt-4">{challenge.description}</p>
                <a href="#" className="mt-4 inline-block text-blue-600 font-semibold text-sm hover:underline">Read More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Challenge;
