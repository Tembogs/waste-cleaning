// src/houser/components/HouserProfile.jsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { User, Mail, Phone, MapPin, Save, Loader2, Camera, Shield } from 'lucide-react';

export default function HouserProfile({ user, onProfileUpdated }) {
  const { token } = useContext(AuthContext);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    location: user?.location || '',
    gender: user?.gender || 'Other',
    bio: user?.bio || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        location: user.location || '',
        gender: user.gender || 'Other',
        bio: user.bio || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Profile Picture Upload Handler
  // Profile Picture Upload Handler (Base64 String)
// src/houser/components/HouserProfile.jsx

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setErrorMsg('');
  setSuccessMsg('');

  const userId = user?._id || user?.id;
  if (!userId) {
    setErrorMsg('User ID not found.');
    return;
  }

  // Convert image file to Base64 Data URL string
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = async () => {
    const base64ImageUrl = reader.result;

    try {
      setIsUploadingImage(true);
      const response = await axios.put(
        `https://waste-management-3-iw0g.onrender.com/api/users/${userId}/profile-picture`,
        { avatarUrl: base64ImageUrl }, // Key updated to avatarUrl to match backend controller
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccessMsg('Profile picture updated successfully!');
      if (onProfileUpdated) {
        // Pass updated user object returned from backend
        onProfileUpdated(response.data.user || response.data);
      }
    } catch (err) {
      setErrorMsg(
        err?.response?.data?.error || err?.response?.data?.message || 'Failed to upload profile picture.'
      );
    } finally {
      setIsUploadingImage(false);
    }
  };
};

  // General Profile Text Info Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const userId = user?._id || user?.id;
    if (!userId) {
      setErrorMsg('User ID not found.');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.put(
        `https://waste-management-3-iw0g.onrender.com/api/users/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMsg('Profile updated successfully!');
      if (onProfileUpdated) onProfileUpdated(response.data);
    } catch (err) {
      setErrorMsg(
        err?.response?.data?.message || 'Failed to update profile. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-3xl mx-auto my-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="p-2.5 bg-emerald-50 rounded-xl">
          <User className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Account Profile & Settings</h2>
          <p className="text-sm text-gray-500">Manage your personal information and preferences</p>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-sm rounded-xl border border-emerald-100">
          {successMsg}
        </div>
      )}

      {/* Profile Picture Upload Avatar Section */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-2xl border-2 border-emerald-500 overflow-hidden">
            {isUploadingImage ? (
              <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
            ) : user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={formData.name}
                className="h-full w-full object-cover"
              />
            ) : (
              formData.name?.charAt(0)?.toUpperCase() || 'U'
            )}
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploadingImage}
            className="absolute bottom-0 right-0 p-1.5 bg-forest-900 text-white rounded-full shadow hover:bg-forest-800 transition cursor-pointer disabled:opacity-50"
            title="Upload image"
          >
            <Camera className="h-3.5 w-3.5" />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div>
          <h3 className="font-bold text-gray-900 text-lg">{user?.name || 'Houser User'}</h3>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md border border-emerald-100">
            <Shield className="h-3 w-3" /> Role: {user?.role || 'Houser'}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Service Location / Area</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bio / Address Details</label>
          <textarea
            rows="3"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Add additional details about your location or household..."
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-forest-900 text-white font-medium rounded-xl hover:bg-forest-800 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving Changes...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Save Settings
            </>
          )}
        </button>
      </form>
    </div>
  );
}