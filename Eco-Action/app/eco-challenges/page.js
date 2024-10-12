"use client";
import React, { useEffect, useState } from "react";
import { Leaf, Wind, Droplets, Sun } from "lucide-react";
import Link from "next/link";

const Challenge = () => {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch("/api/challenge");
        if (!response.ok) throw new Error("Failed to fetch challenges");
        const data = await response.json();
        setChallenges(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchChallenges();
  }, []);

  const GrowingLeafButton = ({ text, link }) => (
    <Link href={link} passHref>
      <button className="w-full relative overflow-hidden group bg-gradient-to-r from-[#116A7B] via-[#1DAA8D] to-[#116A7B] hover:from-[#137B8E] hover:via-[#1DAA8D] hover:to-[#2BDBB5] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
        <span className="relative z-10 flex items-center justify-center">
          {text}
          <svg
            className="w-5 h-5 ml-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="group-hover:animate-grow-leaf"
              d="M12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3ZM12 19C15.86 19 19 15.86 19 12C19 8.14 15.86 5 12 5C8.14 5 5 8.14 5 12C5 15.86 8.14 19 12 19Z"
              fill="currentColor"
            />
            <path
              className="group-hover:animate-grow-leaf delay-100"
              d="M12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <div className="absolute inset-0 flex justify-around">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="h-1 w-1 bg-green-200 rounded-full transform -translate-y-full group-hover:translate-y-full transition-transform duration-1000"
              style={{ transitionDelay: `${i * 50}ms` }}
            />
          ))}
        </div>
      </button>
    </Link>
  );

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-b ">
      <header className="text-center mb-12 relative">
        <div className="absolute inset-0 flex justify-between items-center pointer-events-none opacity-30">
          <Wind className="text-[#116A7B] animate-float" size={32} />
          <Droplets
            className="text-blue-400 animate-float"
            size={32}
            style={{ animationDelay: "0.5s" }}
          />
          <Sun
            className="text-yellow-400 animate-float"
            size={32}
            style={{ animationDelay: "1s" }}
          />
        </div>

        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#116A7B] to-[#116A7B] mb-4">
          Every Action Counts: Be a Part of the Solution!
        </h1>
        <p className="text-lg text-[#116A7B]">
          Join us in making a difference, one challenge at a time
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
        {challenges.map((challenge, index) => (
          <div
            key={index}
            className="bg-white grid sm:grid-cols-2 items-center shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-2xl max-sm:max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4"
          >
            <div className="min-h-[280px] h-full">
              <img
                src={challenge.image}
                alt={challenge.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold">{challenge.title}</h3>
              <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                {challenge.description}
              </p>
              <div className="flex justify-between items-center mb-6 mt-2">
                <span className="px-3 py-1 bg-gradient-to-r from-[#116A7B] to-[#B2EBF2] rounded-lg text-sm text-white font-medium">
                  Target: {challenge.targetValue}
                </span>
              </div>
              {/* Use the GrowingLeafButton with the link prop */}
              <GrowingLeafButton
                text="Know more"
                link={`/challengeDetails/${challenge._id}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenge;
