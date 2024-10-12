import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const UserChallenges = ({ userId }) => {
  const [userChallenges, setUserChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noChallenges, setNoChallenges] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [challengesPerPage] = useState(2); // Set number of challenges per page

  const handleUserChallenges = async () => {
    try {
    
      const response = await axios.get(`/api/profileChallenges/${userId}?page=${currentPage}&limit=${challengesPerPage}`);
      if (response.data.userChallenges.length === 0) {
        setNoChallenges(true);
      } else {
        setUserChallenges(response.data.userChallenges);
        setTotalPages(response.data.totalPages); // Set total pages from response
      }
    } catch (error) {
      console.error('Error fetching user challenges:', error);
      toast.error("Failed to get challenges");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      handleUserChallenges();
    }
  }, [userId, currentPage]); 

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  // Soft delete handler
  const handleSoftDelete = async (_id) => {
    try {
      const response = await axios.put(`/api/deleteUserChallenges/${_id}`);
      if (response.data.message === 'Challenge soft deleted') {
        toast.success('Challenge deleted successfully');
        // Update local state to remove the deleted challenge
        setUserChallenges((prevChallenges) =>
          prevChallenges.filter((challenge) => challenge._id !== _id)
        );
      }
    } catch (error) {
      toast.error("Failed to delete challenge");
    }
  };

  return (
    <div className="max-w-6xl p-6 mx-auto mt-20 bg-gradient-to-b">
      <ToastContainer />

      {loading ? (
        <div className="text-center text-[#116A7B]">Loading challenges...</div>
      ) : noChallenges ? (
        <div className="text-[#116A7B] flex items-center justify-center mt-24">
          No challenges found for this user. Take action by joining a new challenge today!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2">
          {userChallenges.map((challenge) => (
            <div
              key={challenge._id}
              className="bg-white grid sm:grid-cols-2 items-center shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-2xl max-sm:max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4"
            >
              <div className="min-h-[280px] h-full">
                <img
                  src={challenge.challengeId.image}
                  alt={challenge.challengeId.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{challenge.challengeId.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  {challenge.challengeId.description}
                </p>
                <div className="flex items-center justify-between mt-2 mb-6">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#116A7B] to-[#B2EBF2] rounded-lg text-sm text-white font-medium">
                    Target: {challenge.challengeId.targetValue}
                  </span>
                  <span className="text-sm text-gray-500">
                    <a href={`/challengeDetails/${challenge.challengeId._id}`} className="text-[#aaa123]">
                      Know more
                    </a>
                  </span>
                </div>
                  <button
                  onClick={() => handleSoftDelete(challenge._id)}
                  className="px-4 py-2 mt-4 text-white rounded bg-gradient-to-r from-red-500 to-red-300 hover:bg-red-600"
                >
                  Delete Challenge
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-10">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-gradient-to-r from-[#116A7B] to-[#B2EBF2] text-white hover:bg-[#137B8E]'}`}
        >
          Previous
        </button>
        <span className="flex items-center text-lg text-[#224349]">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-gradient-to-r from-[#116A7B] to-[#B2EBF2] text-white hover:bg-[#137B8E]'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserChallenges;
