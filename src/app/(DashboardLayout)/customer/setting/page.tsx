import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Clock, Check, AlertCircle, Loader2 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

interface UserData {
  _id?: string;
  name?: string;
  email?: string;
  image?: string;
}

// Mock user context for demonstration
const mockUserContext = {
  user: {
    _id: '123456',
    name: 'John Doe',
    email: 'john.doe@example.com',
    image: ''
  } as UserData,
  setUser: (user: UserData) => {}
};

const useUser = () => {
  const [user, setUser] = useState<UserData>(mockUserContext.user);
  
  // In a real app, this would fetch from context or API
  const updateUser = (newUserData: UserData) => {
    setUser(prev => ({ ...prev, ...newUserData }));
  };
  
  return { user, setUser: updateUser };
};

function App() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { user, setUser } = useUser();
  
  useEffect(() => {
    // Initialize name field with current user name
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?._id) {
      return toast.error("User not found!", {
        icon: <AlertCircle className="text-red-500" />
      });
    }
    
    if (!name.trim()) {
      return toast.warning("Please enter a valid name", {
        icon: <AlertCircle className="text-amber-500" />
      });
    }
    
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
      setLastUpdated(new Date());
      setIsEditing(false);
      
      toast.success(response.data.message || "Name updated successfully", {
        icon: <Check className="text-green-500" />
      });
    } catch (err: any) {
      console.error("Update Error:", err);
      toast.error(err.response?.data?.message || "Failed to update name", {
        icon: <AlertCircle className="text-red-500" />
      });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name.split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };
  
  const formatLastUpdated = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const initial = getInitials(user?.name);
  const randomGradient = user?._id ? 
    `bg-gradient-to-br from-blue-500 to-teal-400` : 
    `bg-gradient-to-br from-gray-500 to-gray-400`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white">
          <h1 className="text-2xl font-bold text-center">Account Settings</h1>
          <p className="text-blue-100 text-center mt-1">MediMart Healthcare Portal</p>
        </div>
        
        <div className="p-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8 relative">
            <div className="relative">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name || 'User'}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div className={`w-24 h-24 rounded-full ${randomGradient} flex items-center justify-center text-2xl font-bold text-white border-4 border-white shadow-md`}>
                  {initial}
                </div>
              )}
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                <User className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold text-gray-800">{user?.name || 'User'}</h2>
              <p className="text-gray-500 text-sm">{user?.email || 'No email available'}</p>
            </div>
          </div>
          
          {/* Last Updated */}
          {lastUpdated && (
            <div className="flex items-center justify-center mb-6 text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span>Last updated: {formatLastUpdated(lastUpdated)}</span>
            </div>
          )}
          
          {/* Form Section */}
          <div className="bg-gray-50 rounded-xl p-5 mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-500" />
              Personal Information
            </h3>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onFocus={() => setIsEditing(true)}
                    className={`w-full p-3 border ${isEditing ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-300'} 
                    rounded-lg focus:outline-none transition-all duration-200`}
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg 
                  hover:from-blue-700 hover:to-blue-600 transition-all duration-200 font-medium flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Update Profile
                    </>
                  )}
                </button>
                
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setName(user?.name || '');
                      setIsEditing(false);
                    }}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 
                    transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
          
          {/* Additional Info */}
          <div className="text-center text-sm text-gray-500">
            <p>Need help? <a href="#" className="text-blue-600 hover:underline">Contact Support</a></p>
          </div>
        </div>
      </div>

      <ToastContainer 
        position="top-right" 
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-container"
        toastClassName="toast-item"
        bodyClassName="toast-body"
        theme="light"
      />
    </div>
  );
}

export default Setting