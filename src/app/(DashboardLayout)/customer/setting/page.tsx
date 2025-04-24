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
  const { user, setUser } = useUser() ;

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

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      {/* Avatar */}
      <div className="flex justify-center mb-6">
        {user?.image ? (
          <img
            src={user.image}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white">
            {initial}
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold mb-4 text-center">Update Your Name</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Enter new name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Updating...' : 'Update Name'}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Setting;
