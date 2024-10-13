'use client';
import { useState, useEffect,useRef } from 'react';
import { useParams } from 'next/navigation';
import Cookies from "js-cookie"; // Import js-cookie
import Swal from 'sweetalert2';

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
  Share2,
  Upload,
  Check
} from "lucide-react";

export default function ChallengeDetails() {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStage, setActiveStage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [uploadCount, setUploadCount] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
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
      // Load uploadCount from localStorage on page load
      const savedUploadCount = localStorage.getItem('uploadCount');
      if (savedUploadCount) {
        setUploadCount(parseInt(savedUploadCount, 10)); // Convert to number
      }
  }, [params.id]);
  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }
  
    const formData = new FormData();
    formData.append("img", selectedImage);
    formData.append("user_id", "670955cd48dd94ad979bf8c3");
  
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", errorText);
        throw new Error(errorText || "Something went wrong");
      }
  
      const data = await response.json();
      alert(data.message);
  
      setUploadCount((prevCount) => {
        const newCount = prevCount + 1;
        localStorage.setItem('uploadCount', newCount); // Save to localStorage
        return newCount;
      });
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred: " + error.message);
    }
  };
  
  const progressPercentage = (uploadCount / challenge?.targetValue) * 100;
  if (progressPercentage === 100) {
    Swal.fire({
      title: '🎁 Congratulations!',
      html: `
        <p class="text-lg font-semibold">Here’s your special coupon code:</p>
        <div class="mt-2 p-4 bg-green-100 rounded-lg border-2 border-green-400 text-green-900 font-bold">
        ${challenge?.discount?.discountCode || 'No code available'}  <!-- Using optional chaining -->
        </div>
        <p class="mt-2">Use it on your next purchase and enjoy </p>${challenge?.discount?.disc || 'No code available'}  <!-- Using optional chaining -->

      `,
      icon: 'gift',
      showConfirmButton: true,
      confirmButtonText: 'Claim Now',
      background: '#f9f9f9',
      customClass: {
        popup: 'shadow-lg rounded-lg',
        confirmButton: 'bg-[#116A7B] text-white px-4 py-2 rounded hover:bg-[#0e5c69]',
      },
    });
    
  }

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
                  <span>{challenge.discount.discountCode}% Off Reward</span>
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
                  challenge.difficultyLevel === 'beginner' 
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

           
            {/* upload files */}
            <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-[#116A7B] mb-4 flex items-center">
                <Upload className="ml-2" size={24} />
                 upload the Proof 
              </h2>
              <div className="flex flex-col space-y-4">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                    className="hidden"
                    ref={fileInputRef}
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-[#116A7B]/10 text-[#116A7B] py-2 px-4 rounded-lg flex items-center justify-center hover:bg-[#116A7B]/20 transition-colors"
                  >
                    {selectedImage ? <Check className="ml-2" size={20} /> : <Upload className="ml-2" size={20} />}
                    {selectedImage ? 'image is selected ' : 'choose image'}
                  </label>
                </div>
                <button
                  onClick={handleImageUpload}
                  className="bg-[#116A7B] text-white py-2 px-4 rounded-lg hover:bg-[#116A7B]/90 transition-colors"
                  disabled={!selectedImage}
                >
                upload image
                </button>
             
              </div>
            </div>

            {/* proogress*/}
            <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-[#116A7B] mb-4 flex items-center">
                  <Target className="mr-2" size={24} /> Progress
                </h2>
                <div className="overflow-hidden h-2 mb-4 bg-[#116A7B]/10 rounded">
                  <div
                    style={{ width: `${progressPercentage}%` }}
                    className="bg-[#116A7B] h-2 transition-all"
                    
                  ></div>
                </div>
                <p>{uploadCount} / {challenge.targetValue}</p>
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
               <div className="flex items-center justify-between">
                 <h3 className="font-semibold text-lg">Stage {stage.stageNumber}</h3>
                 <div className="w-16 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                   <img 
                     src={stage.imageUrl} 
                     className="w-full h-full object-cover" 
                     alt={`Stage ${stage.stageNumber}`} 
                   />
                 </div>
               </div>
             
               <p
                 className={`mt-1 text-sm ${
                   activeStage === stage.stageNumber
                     ? 'text-white/90'
                     : 'text-[#116A7B]/70'
                 }`}
               >
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