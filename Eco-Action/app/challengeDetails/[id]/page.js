'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Cookies from "js-cookie"; // Import js-cookie

import { 
  Wind, 
  Droplets, 
  Sun, 
  Leaf, 
  TreePine, 
  Users, 
  Target, 
  Award,
  ArrowLeft,
  Share2
} from "lucide-react";

export default function ChallengeDetails() {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStage, setActiveStage] = useState(1);
  const params = useParams();

  useEffect(() => {
    async function fetchChallenge() {
      try {
        const response = await fetch(`/api/challenge/${params.id}`);
        const data = await response.json();
        setChallenge(data);
      } catch (error) {
        console.error('Failed to fetch challenge:', error);
      } finally {
        setLoading(false);
      }
    }
   
    if (params.id) {
      fetchChallenge();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#116A7B]/10 backdrop-blur-sm flex justify-center items-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-[#116A7B]/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-[#116A7B] rounded-full animate-spin"></div>
          <Leaf className="absolute inset-0 m-auto text-[#116A7B] animate-pulse" size={24} />
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <TreePine className="text-[#116A7B] mb-4" size={48} />
        <h2 className="text-2xl font-semibold text-[#116A7B]">Challenge Not Found</h2>
        <p className="mt-2 text-[#116A7B]/70">The eco challenge you're looking for seems to have wandered off.</p>
        <button onClick={() => window.history.back()} className="mt-6 flex items-center text-[#116A7B] hover:underline">
          <ArrowLeft className="mr-2" size={20} />
          Return to Challenges
        </button>
      </div>
    );
  }
  const handleTakeAction = async (challengeId) => {
    console.log("Challenge ID:", challengeId);
    try {
      // Retrieve the token from cookies
      const token = Cookies.get('token'); // Adjust this based on your cookie name

      if (!token) {
        alert("No token found. Please log in.");
        return;
      }

      const response = await fetch(`/api/userChallenges/${challengeId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`, // Pass the token
          'Content-Type': 'application/json', // Ensure the content type is correct
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");
      alert(data.message);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#116A7B]/5 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Bar */}
        <nav className="flex justify-between items-center mb-8">
          <button onClick={() => window.history.back()} className="flex items-center text-[#116A7B] hover:underline">
            <ArrowLeft className="mr-2" size={20} />
            Back to Challenges
          </button>
         
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#116A7B] rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
            <img
              src={challenge.image}
              alt={challenge.title}
              className="relative rounded-2xl w-full h-[400px] object-cover transform group-hover:rotate-0 transition-transform duration-300"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl">
              <div className="flex items-center justify-between text-[#116A7B]">
                <div className="flex items-center">
                  <Users className="mr-2" size={20} />
                  <span>{challenge.participationCount} Participants</span>
                </div>
                <div className="flex items-center">
                  <Award className="mr-2" size={20} />
                  <span>{challenge.discount.amount}% Off Reward</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-[#116A7B] mb-4">{challenge.title}</h1>
            <p className="text-lg text-[#116A7B]/70 mb-6">{challenge.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Target className="text-[#116A7B] mb-2" size={24} />
                <h3 className="font-semibold text-[#116A7B]">Target Impact</h3>
                <p className="text-[#116A7B]/70">{challenge.targetValue}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <TreePine className="text-[#116A7B] mb-2" size={24} />
                <h3 className="font-semibold text-[#116A7B]">Difficulty Level</h3>
                <p className={`capitalize font-bold ${
                  challenge.difficultyLevel === 'easy' 
                    ? 'text-green-500' 
                    : challenge.difficultyLevel === 'intermediate' 
                    ? 'text-yellow-500' 
                    : 'text-red-500'
                  }`}>
                  {challenge.difficultyLevel}
                </p>          
              </div>

            </div>

            <button className="w-full bg-[#116A7B] text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-[#116A7B]/90 hover:shadow-lg hover:shadow-[#116A7B]/20 flex items-center justify-center group"
            onClick={() => handleTakeAction(challenge._id)}
            >
              Join This Challenge
              <Leaf className="ml-2 group-hover:rotate-[360deg] transition-transform duration-500" size={20} />
            </button>
          </div>
        </div>

        {/* Challenge Stages */}
        {challenge.stages && challenge.stages.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
            <h2 className="text-2xl font-bold text-[#116A7B] mb-6 flex items-center">
              <TreePine className="mr-2" size={24} />
              Challenge Journey
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {challenge.stages.map((stage) => (
                <div 
                  key={stage.stageNumber}
                  className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeStage === stage.stageNumber 
                    ? 'bg-[#116A7B] text-white shadow-lg' 
                    : 'bg-[#116A7B]/5 text-[#116A7B] hover:bg-[#116A7B]/10'
                  }`}
                  onClick={() => setActiveStage(stage.stageNumber)}
                >
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-white text-[#116A7B] font-semibold">
                    {stage.stageNumber}
                  </div>
                  <h3 className="font-semibold mb-2">Stage {stage.stageNumber}</h3>
                  <p className={activeStage === stage.stageNumber ? 'text-white/90' : 'text-[#116A7B]/70'}>
                    {stage.stageDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Environmental Impact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Leaf, title: 'Carbon Footprint', value: '-2.5 kg CO2' },
            { icon: Droplets, title: 'Water Saved', value: '100 Liters' },
            { icon: Sun, title: 'Energy Conserved', value: '5 kWh' },
            { icon: Users, title: 'Community Impact', value: `${challenge.participationCount}+ People` }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <item.icon className="text-[#116A7B] mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="font-semibold text-[#116A7B] mb-2">{item.title}</h3>
              <p className="text-2xl font-bold text-[#116A7B]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}