// src/houser/components/RequestRecycleForm.jsx
import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Recycle, Plus, Trash, Send, Loader2, ImagePlus, X } from 'lucide-react';
import { compressImage } from '../../utilis/compressImage';

const RECYCLE_CATEGORIES = [
  "General",
  "Paper",
  "Plastic",
  "Glass",
  "Metal",
  "Organic",
  "E-waste",
];

const UNIT_OPTIONS = ['kg', 'items', 'liters'];

export default function RequestRecycleForm({ onSuccess }) {
  const { token, user } = useContext(AuthContext);
  const fileInputRef = useRef(null);

  const [materials, setMaterials] = useState([
    { recycleType: 'General', quantity: '', unit: 'kg' }
  ]);
  const [location, setLocation] = useState(user?.location || '');
  const [address, setAddress] = useState('');
  const [collectionNote, setCollectionNote] = useState('');
  const [imageBase64, setImageBase64] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleMaterialChange = (index, field, value) => {
    const updated = [...materials];
    updated[index][field] = value;
    setMaterials(updated);
  };

  const addMaterialRow = () => {
    setMaterials([...materials, { recycleType: 'General', quantity: '', unit: 'kg' }]);
  };

  const removeMaterialRow = (index) => {
    if (materials.length === 1) return;
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const handleImageFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };

    try {
          // Compress image to max width 800px and 70% JPEG quality (~50-150KB)
          const compressedBase64 = await compressImage(file, 800, 0.7);
          setImageBase64(compressedBase64);
        } catch (err) {
          console.error('Failed to process image:', err);
        }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!location.trim()) {
      setErrorMsg('Location is required.');
      return;
    }

    const formattedMaterials = materials.map(m => ({
      recycleType: m.recycleType,
      quantity: Number(m.quantity) || 1,
      unit: m.unit || 'kg'
    }));

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        'https://waste-management-3-iw0g.onrender.com/api/recycle',
        {
          userId: user?._id || user?.id,
          materials: formattedMaterials,
          location: location.trim(),
          address: address.trim() || null,
          collectionNote: collectionNote.trim() || null,
          images: imageBase64 || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSuccessMsg('Recycling request created successfully!');
      setMaterials([{ recycleType: 'General', quantity: '', unit: 'kg' }]);
      setAddress('');
      setCollectionNote('');
      setImageBase64(null);
      if (onSuccess) onSuccess(response.data);
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || err?.response?.data?.error || 'Failed to create recycling request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-2xl mx-auto my-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="p-2.5 bg-teal-50 rounded-xl">
          <Recycle className="h-6 w-6 text-teal-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Request Recycling</h2>
          <p className="text-sm text-gray-500">Submit recyclable materials to earn reward points</p>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-3 bg-teal-50 text-teal-700 text-sm rounded-xl border border-teal-100">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Recyclable Materials
          </label>
          <div className="space-y-3">
            {materials.map((mat, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-full sm:w-1/2">
                  <select
                    value={mat.recycleType}
                    onChange={(e) => handleMaterialChange(idx, 'recycleType', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {RECYCLE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="w-full sm:w-1/4">
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    placeholder="Qty"
                    value={mat.quantity}
                    onChange={(e) => handleMaterialChange(idx, 'quantity', e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="w-full sm:w-1/4 flex items-center gap-2">
                  <select
                    value={mat.unit}
                    onChange={(e) => handleMaterialChange(idx, 'unit', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {UNIT_OPTIONS.map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>

                  {materials.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMaterialRow(idx)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="Remove item"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addMaterialRow}
            className="mt-3 text-sm text-teal-700 font-medium flex items-center gap-1.5 hover:underline cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Add another item
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Service Area / Location *
            </label>
            <input
              type="text"
              placeholder="e.g. ilorin"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Street Address (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. 12 Fate Road, Off Tanke"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Collection Notes (Optional)
          </label>
          <textarea
            rows="2"
            placeholder="Special instructions regarding your recyclables..."
            value={collectionNote}
            onChange={(e) => setCollectionNote(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Upload Image (Optional)
          </label>
          {imageBase64 ? (
            <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200">
              <img src={imageBase64} alt="Recycling preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setImageBase64(null)}
                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition cursor-pointer"
            >
              <ImagePlus className="h-6 w-6 mb-1 text-teal-600" />
              <span className="text-xs font-medium">Click to upload photo of recyclables</span>
            </button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageFile}
            accept="image/*"
            className="hidden"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-forest-900 text-white font-medium rounded-xl hover:bg-forest-800 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Submit Recycling Request
            </>
          )}
        </button>
      </form>
    </div>
  );
}