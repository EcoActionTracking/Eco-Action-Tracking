"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangePassword from './ChangePassword';
import UserChallenges from './UserChallenges';
import { Leaf, User, Mail, Image, Save, X } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../lib/firebase'; 
import { OrderUser } from './OrdersUser';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [view, setView] = useState('challenges'); 
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        image: "",
    });
    const [imageFile, setImageFile] = useState(null);
    
    const handleImageUpload = async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        try {
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            setFormData(prevData => ({ ...prevData, image: downloadURL }));
            toast.success('Image uploaded successfully!');
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error('Failed to upload image.');
        }
    };

  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('/api/user');
          setUser(response.data.user);
          setFormData({
            username: response.data.user.username,
            email: response.data.user.email,
            image: response.data.user.image,
        });

        } catch (err) {
          setError('Failed to load user data');
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserData();
    }, []);


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleProfileEdit = async () => {
        try {
            await axios.put(`/api/user/${user._id}`, formData);
            setUser({ ...user, ...formData });
            setView('challenges');
            toast.success('successfully!'); 
        } catch (err) {
            if (err.response && err.response.status === 401) {
                toast.error("You are not authorized. Please log in to continue.");
          
                 window.location.href = '/login'; 
            } else {
                console.error("Error updating profile", err);
            }
        }
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // Save the selected file
            handleImageUpload(file); // Call the upload function
        }
    };

    const handleCancelEdit = () => {
     
        setView('challenges');
    };
    
        if (loading) {
            return <div className="flex items-center justify-center h-screen">Loading...</div>;
        }

        if (error) {
            return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
        }

    
    return (
        <>
         <ToastContainer />
            {user ? (
        <section className="relative min-h-screen pt-40 pb-24">
            <img
                src="https://i.pinimg.com/564x/47/e2/a2/47e2a2e4d258edaf1f521055b69df293.jpg"
                alt="cover-image"
                className="absolute top-0 left-0 z-0 object-cover w-full h-60"
            />
            <div className="w-full px-6 mx-auto max-w-7xl md:px-8">
                <div className="relative z-10 flex items-center justify-center mb-5 sm:justify-start">
                    <img
                        src={user.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                        alt="user-avatar-image"
                        className="object-cover w-48 h-48 border-4 border-white border-solid rounded-full"
                    />
                </div>
                <div className="flex flex-col items-center justify-between mb-5 sm:flex-row max-sm:gap-5">
                    <div className="block">
                        <h3 className="mb-1 text-4xl font-bold text-gray-900 font-manrope">{user.username}</h3>
                        <p className="text-base font-normal leading-7 text-gray-500">{user.email}</p>
                    </div>
                    <button className="rounded-md py-3.5 px-5 bg-[#C2DEDC] flex items-center group transition-all duration-500 hover:bg-[#bfc7c6] ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                className="transition-all duration-500 stroke-gray-700 group-hover:stroke-[#116A7B]"
                                d="M14.1667 11.6666V13.3333C14.1667 14.9046 14.1667 15.6903 13.6785 16.1785C13.1904 16.6666 12.4047 16.6666 10.8333 16.6666H7.50001C5.92866 16.6666 5.14299 16.6666 4.65483 16.1785C4.16668 15.6903 4.16668 14.9047 4.16668 13.3333V11.6666M16.6667 9.16663V13.3333M11.0157 10.434L12.5064 9.44014C14.388 8.18578 15.3287 7.55861 15.3287 6.66663C15.3287 5.77466 14.388 5.14749 12.5064 3.89313L11.0157 2.8993C10.1194 2.3018 9.67131 2.00305 9.16668 2.00305C8.66205 2.00305 8.21393 2.3018 7.31768 2.8993L5.82693 3.89313C3.9454 5.14749 3.00464 5.77466 3.00464 6.66663C3.00464 7.55861 3.9454 8.18578 5.82693 9.44014L7.31768 10.434C8.21393 11.0315 8.66205 11.3302 9.16668 11.3302C9.67131 11.3302 10.1194 11.0315 11.0157 10.434Z"
                                stroke="#374151"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="px-2 text-base font-medium leading-7 text-[#116A7B] transition-all duration-500 group-hover:text-[#116A7B]">
                            Software Engineer
                        </span>
                    </button>
                </div>
                <div className="flex flex-col lg:flex-row max-lg:gap-5 items-center justify-between py-0.5">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setView('edit')} className={`py-3.5 px-5 rounded-md ${view === 'edit' ? 'bg-gradient-to-r from-[#116A7B] to-[#B2EBF2] text-white' : 'bg-[#C2DEDC] text-[#116A7B]'}   font-semibold text-base leading-7 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-400 hover:bg-[#58938e]`}>
                            Edit Profile
                        </button>
                        <button onClick={() => setView('changePassword')} 
                        className={`py-3.5 px-5 rounded-md ${view === 'changePassword' ? 'bg-gradient-to-r from-[#116A7B] to-[#B2EBF2] text-white' : 'bg-[#C2DEDC] text-[#116A7B]'} font-semibold text-base leading-7 shadow-sm shadow-transparent transition-all duration-500 hover:bg-[#58938e]`}
                                >
                          Change Password
                        </button>
                    </div>
                    <div className="flex flex-col items-center gap-6 md:flex-row">
                        <p onClick={() => setView('challenges')} 
                                    className={`py-3.5 px-5 rounded-md ${view === 'challenges' ? 'bg-gradient-to-r from-[#116A7B] to-[#B2EBF2] text-white' : 'bg-[#C2DEDC] text-[#116A7B]'} font-semibold text-base leading-7 shadow-sm shadow-transparent transition-all duration-500 hover:bg-[#58938e]`}
                        >
                            Challenges |
                        </p>
                        <p onClick={() => setView('Orders')}   className={`py-3.5 px-5 rounded-md ${view === 'Orders' ? 'bg-gradient-to-r from-[#116A7B] to-[#B2EBF2] text-white' : 'bg-[#C2DEDC] text-[#116A7B]'} font-semibold text-base leading-7 shadow-sm shadow-transparent transition-all duration-500 hover:bg-[#58938e]`}>
                            Orders |
                        </p>
                        <p className="flex items-center gap-2 text-lg font-medium leading-8 text-[#116A7B]">
                            Discount
                        </p>
                    </div>
                </div>
                {view === 'edit' ? (
                            <div className="flex flex-col items-center justify-center mt-20">
                             <div className="p-8 space-y-8 bg-white rounded-lg shadow-xl w-[40rem]">
                                    <div className="text-center">
                                        <Leaf className="w-16 h-16 mx-auto text-[#116A7B]" />
                                        <h2 className="mt-6 text-3xl font-extrabold text-[#116A7B]">Edit Profile</h2>
                                    </div>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleProfileEdit();
                            }} className="flex flex-col gap-4">
                            <div className="relative">
                              <User className="absolute w-5 h-5 text-[#116A7B] top-3 left-3" />
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#116A7B] focus:border-[#116A7B]"
                                    placeholder="Username"
                                />
                            </div>
                            <div className="relative">
                             <Mail className="absolute w-5 h-5 text-[#116A7B] top-3 left-3" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#116A7B] focus:border-[#116A7B]"
                                    placeholder="Email"
                                />
                             </div>   
                            <div className="relative">
                              <Image className="absolute w-5 h-5 text-[#116A7B] top-3 left-3" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full pl-10 pr-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#116A7B] focus:border-[#116A7B]"
                                />
                            </div>
                                <div className="flex gap-2">
                                    <button type="submit"  className="w-full px-4  bg-gradient-to-r from-[#116A7B] to-[#67cbd8] text-white hover:bg-[#137B8E] rounded-md flex justify-center items-center gap-2"> <Save />
                                    Save Changes</button>
                                    <button onClick={handleCancelEdit} className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white rounded-md bg-gradient-to-r from-red-500 to-red-400 hover:bg-red-600"> <X />
                                    Cancel</button>
                                </div>
                                </form>
                             </div>
                            </div>
                        ) : view === 'changePassword' ? (
                            <ChangePassword id={user._id}/>
                        ) : view === 'Orders' ? (
                            <OrderUser userId={user._id}/>
                        ) : (
                            <UserChallenges userId={user._id} />
                        )}
            </div>
        </section>
           ) : (
            <p>No user data found.</p>
          )}
        </>
    );
};

export default Profile;
