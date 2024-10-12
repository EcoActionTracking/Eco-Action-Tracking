import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Leaf } from 'lucide-react';

const ChangePassword = ({ id }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordRequirements = {
    length: newPassword.length >= 8,
    number: /[0-9]/.test(newPassword),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
  };

  const isPasswordValid = Object.values(passwordRequirements).every(Boolean);

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
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');

    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to change password");
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <ToastContainer />
      <div className="  p-8 space-y-8 bg-white rounded-lg shadow-xl w-[40rem]">
        <div className="text-center">
          <Leaf className="w-16 h-16 mx-auto text-[#116A7B]" />
          <h2 className="mt-6 text-3xl font-extrabold text-[#116A7B]">Change Password</h2>
        </div>
        <form onSubmit={handleChangePassword} className="w-full mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm ">
            <div>
              <label htmlFor="old-password" className="sr-only">Old Password</label>
              <input
                id="old-password"
                name="old-password"
                type="password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-[#116A7B] focus:border-[#116A7B] focus:z-10 sm:text-sm"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>


            
            <div className='flex w-full gap-2 '>

                
         
            <div className='w-1/2'>
              <label htmlFor="new-password" className="sr-only">New Password</label>
              <input
                id="new-password"
                name="new-password"
                type="password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-[#116A7B] focus:border-[#116A7B] focus:z-10 sm:text-sm"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div className="mt-2 text-sm text-gray-600">
                <ul>
                  <li className={passwordRequirements.length ? "text-green-600" : "text-red-600"}>
                    {passwordRequirements.length ? "✓" : "✗"} At least 8 characters
                  </li>
                  <li className={passwordRequirements.number ? "text-green-600" : "text-red-600"}>
                    {passwordRequirements.number ? "✓" : "✗"} At least one number
                  </li>
                  <li className={passwordRequirements.specialChar ? "text-green-600" : "text-red-600"}>
                    {passwordRequirements.specialChar ? "✓" : "✗"} At least one special character
                  </li>
                  <li className={passwordRequirements.uppercase ? "text-green-600" : "text-red-600"}>
                    {passwordRequirements.uppercase ? "✓" : "✗"} At least one uppercase letter
                  </li>
                  <li className={passwordRequirements.lowercase ? "text-green-600" : "text-red-600"}>
                    {passwordRequirements.lowercase ? "✓" : "✗"} At least one lowercase letter
                  </li>
                </ul>
              </div>
            </div>
            <div className='w-1/2'>
              <label htmlFor="confirm-password" className="sr-only">Confirm New Password</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-[#116A7B] focus:border-[#116A7B] focus:z-10 sm:text-sm"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={!isPasswordValid}
              className={`relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white ${isPasswordValid ? 'bg-gradient-to-r from-[#116A7B] to-[#B2EBF2]' : 'bg-gray-400 cursor-not-allowed'} rounded-md group hover:bg-[#87abb2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#116A7B]`}
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Leaf className="w-5 h-5 text-white " aria-hidden="true" />
              </span>
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
