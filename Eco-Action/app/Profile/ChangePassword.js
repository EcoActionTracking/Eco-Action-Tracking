import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = ({id}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const response = await axios.put(`/api/user/ChangePassword/${id}`, {
        oldPassword,
        newPassword,
      });

      toast.success(response.data.message);
      // Clear the form or perform any additional actions

    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to change password");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mt-20 mp-10">
      <ToastContainer />
      <form
        onSubmit={handleChangePassword}
        className="px-8 py-6 mb-4 bg-white rounded-md shadow-md w-[30rem]"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-[#116A7B]">
          Change Password
        </h2>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#116A7B]"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#116A7B]"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#116A7B]"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 font-bold text-white transition duration-300 hover:bg-[#637473] bg-[#116A7B] rounded-md "
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
