/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useUser } from '@/contexts/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const Setting = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUser();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?._id) {
      return toast.error("User not found!");
    }
    console.log(Cookies.get('accessToken'))
    setLoading(true);

    try {
      const response = await axios.put(
        `https://medi-mart-backend-eight.vercel.app/api/users/${user._id}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setUser({ ...user, name });
      toast.success(response.data.message);
    } catch (err: any) {
      console.error("Update Error:", err);
      toast.error(err.response?.data?.message || "Failed to update name.");
    } finally {
      setLoading(false);
    }
  };

  const initial = user?.name?.charAt(0).toUpperCase() || '?';
console.log(initial)
  return (
    <div className="h-screen bg-gradient-to-r from-teal-500 to-emerald-500 flex justify-center items-center p-6">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 bg-gradient-to-r">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
              {initial}
            </div>
          )}
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Update Your Name</h2>

        {/* Instructions */}
        <p className="text-center text-gray-600 mb-6">
          To update your account name, please enter a new name below and click Update Name.This will change the name associated with your profile.
        </p>

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            placeholder="Enter new name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-300 transform hover:scale-105"
          >
            {loading ? 'Updating...' : 'Update Name'}
          </button>
        </form>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Need help? Contact our support for assistance with updating your profile.
        </p>

        {/* Toast Notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Setting;
