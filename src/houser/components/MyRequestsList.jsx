// src/houser/components/MyRequestsList.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { RefreshCw, Clock, CheckCircle2, XCircle, User, MapPin, Package } from 'lucide-react';

export default function MyRequestsList() {
  const { token } = useContext(AuthContext);
  const [activeType, setActiveType] = useState('waste'); // 'waste' | 'recycle' | 'dump'
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRequests = async (type) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://waste-management-3-iw0g.onrender.com/api/${type}/status-v2`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setRequests(response.data || []);
    } catch (err) {
      console.error(`Error fetching ${type} status:`, err);
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRequests(activeType);
    }
  }, [token, activeType]);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return (
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full flex items-center gap-1 w-fit">
            <CheckCircle2 className="h-3.5 w-3.5" /> Completed
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full flex items-center gap-1 w-fit">
            <XCircle className="h-3.5 w-3.5" /> Rejected
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full flex items-center gap-1 w-fit">
            <Clock className="h-3.5 w-3.5" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Track Request Status</h2>
          <p className="text-sm text-gray-500">Monitor collectors assigned to your submissions</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
          {['waste', 'recycle', 'dump'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition cursor-pointer ${
                activeType === type
                  ? 'bg-forest-900 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {type === 'dump' ? 'Illegal Dumps' : `${type} Requests`}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12 text-gray-400 gap-2">
          <RefreshCw className="h-5 w-5 animate-spin" /> Loading status history...
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No {activeType} requests found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((item) => (
            <div
              key={item.id}
              className="border border-gray-100 rounded-xl p-4 bg-neutral-50/50 hover:bg-white hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-3">
                {getStatusBadge(item.status)}
                <span className="text-xs text-gray-400">
                  {item.requestDate ? new Date(item.requestDate).toLocaleDateString() : 'Recent'}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="capitalize font-medium text-gray-800">{item.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>
                    Collector: <strong className="text-gray-800">{item.collectorName}</strong>
                  </span>
                </div>

                {item.materials?.length > 0 && (
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                      <Package className="h-3.5 w-3.5" /> Items:
                    </div>
                    <ul className="list-disc list-inside text-xs space-y-0.5 text-gray-700 pl-1">
                      {item.materials.map((m, idx) => (
                        <li key={idx}>
                          {m.quantity} {m.unit || 'kg'} - {m.wasteType || m.recycleType || 'Material'}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}