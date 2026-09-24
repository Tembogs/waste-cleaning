// src/collector/CollectorDashboard.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { 
  Truck, Navigation, MapPin, AlertTriangle, Recycle, 
  Trash2, Check, Loader2, X, Image as ImageIcon, Eye,
  User, Bell, Clock, CheckCircle2, ShieldCheck
} from 'lucide-react';
import CollectorMobileNav from './Collector';


export default function CollectorDashboard() {
  const { user, token } = useContext(AuthContext);
  
  const [activeCategory, setActiveCategory] = useState('waste'); // 'waste' | 'recycle' | 'dump'
  const [activeTab, setActiveTab] = useState('assigned'); // 'assigned' | 'completed' | 'profile' | 'notifications'
  
  const [requests, setRequests] = useState([]);
  const [collectorStats, setCollectorStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Image Preview State
  const [previewImage, setPreviewImage] = useState(null);

  // Detail Drawer State
  const [detailReq, setDetailReq] = useState(null);

  // Action Modal State
  const [selectedReq, setSelectedReq] = useState(null);
  const [actionType, setActionType] = useState(null); // 'accept' | 'reject' | 'route' | 'collect'
  const [rejectionReason, setRejectionReason] = useState('');
  const [collectionNote, setCollectionNote] = useState('');
  const [collectedMaterials, setCollectedMaterials] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const collectorAssayId = user?.collectorAssayId;
  const userId = user?._id;

  const fetchCategoryRequests = async () => {
    if (!collectorAssayId) return;
    try {
      setLoading(true);
      setErrorMsg('');

      const basePath = activeCategory === 'waste' ? 'waste' : activeCategory === 'recycle' ? 'recycle' : 'dump';
      
      const response = await axios.get(
        `https://waste-management-3-iw0g.onrender.com/api/${basePath}/${collectorAssayId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setRequests(
        Array.isArray(response.data?.data)
          ? response.data.data
          : []
      );
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || err?.response?.data?.error || `Failed to fetch ${activeCategory} requests.`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCollectorStats = async () => {
    if (!collectorAssayId) return;

    try {
      const response = await axios.get(
        `https://waste-management-3-iw0g.onrender.com/api/waste/collector/${collectorAssayId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
          },
        }
      );

      const statsData = response.data?.data || response.data?.stats || response.data;
      setCollectorStats(statsData);
    } catch (err) {
      console.error('Failed to fetch collector stats:', err?.response?.data || err);
    }
  };

  useEffect(() => {
    if (token && collectorAssayId) {
      fetchCategoryRequests();
      fetchCollectorStats();
    }
  }, [collectorAssayId, token, activeCategory]);

  const openActionModal = (req, type) => {
    setSelectedReq(req);
    setActionType(type);
    setRejectionReason('');
    setCollectionNote('');

    if (type === 'collect' && req.materials) {
      setCollectedMaterials(
        req.materials.map(m => ({
          wasteType: m.wasteType || m.recycleType || m.dumpType,
          collectedQuantity: m.quantity
        }))
      );
    }
  };

  const handleStatusAction = async () => {
    if (!selectedReq || !actionType) return;

    const reqId = selectedReq._id || selectedReq.id || selectedReq[activeCategory === 'waste' ? 'wasteId' : activeCategory === 'recycle' ? 'recycleId' : 'dumpId'];
    const basePath = activeCategory === 'waste' ? 'waste' : activeCategory === 'recycle' ? 'recycle' : 'dump';
    const idKey = activeCategory === 'waste' ? 'wasteId' : activeCategory === 'recycle' ? 'recycleId' : 'dumpId';

    let endpoint = `https://waste-management-3-iw0g.onrender.com/api/${basePath}/${actionType}`;
    
    let payload = {
      [idKey]: reqId,
      collectorAssayId: collectorAssayId,
    };

    if (actionType === 'reject') {
      if (!rejectionReason.trim()) {
        alert('Rejection reason is required.');
        return;
      }
      payload.rejectionReason = rejectionReason.trim();
    }

    if (actionType === 'collect') {
      payload.collectionNote = collectionNote.trim() || null;
      payload.collectedMaterials = collectedMaterials;
    }

    try {
      setIsSubmitting(true);
      await axios.post(endpoint, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSelectedReq(null);
      setActionType(null);
      setDetailReq(null);
      fetchCategoryRequests();
      fetchCollectorStats();
    } catch (err) {
      alert(err?.response?.data?.message || err?.response?.data?.error || `Operation ${actionType} failed.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Status Counts for Today's Route Bar
  const pendingCount = requests.filter(r => r.status === 'Pending').length;
  const acceptedCount = requests.filter(r => r.status === 'Accepted').length;
  const enRouteCount = requests.filter(r => r.status === 'En Route').length;
  const collectedCount = requests.filter(r => r.status === 'Collected').length;

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 sm:pb-12">
      {/* Desktop App Bar */}
      <header className="bg-forest-900 text-white px-4 sm:px-8 py-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 rounded-xl">
            <Truck className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Collector Field Operations</h1>
            <p className="text-xs text-emerald-300">
              Service Area: {collectorStats?.serviceArea || user?.location || 'Ilorin Zone'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('notifications')}
            className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition cursor-pointer relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-400"></span>
          </button>
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold">{user?.name || 'Collector'}</p>
            <p className="text-[10px] text-emerald-300">Authorized Personnel</p>
          </div>
          <button
            onClick={() => setActiveTab('profile')}
            className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm cursor-pointer hover:ring-2 hover:ring-emerald-400 transition"
          >
            {user?.name?.charAt(0) || 'C'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Today's Route Summary Cards (Matching Wireframe) */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <h2 className="text-lg font-bold text-gray-900">Today's Route</h2>
            <span className="text-xs text-gray-500 font-medium">
              {collectorStats?.serviceArea || 'Ilorin Service Area'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase">Pending</span>
                <p className="text-2xl font-extrabold text-gray-800 mt-0.5">{pendingCount}</p>
              </div>
              <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
                <Clock className="h-5 w-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase">Accepted</span>
                <p className="text-2xl font-extrabold text-blue-600 mt-0.5">{acceptedCount}</p>
              </div>
              <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                <Check className="h-5 w-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase">En Route</span>
                <p className="text-2xl font-extrabold text-purple-600 mt-0.5">{enRouteCount}</p>
              </div>
              <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600">
                <Navigation className="h-5 w-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase">Collected</span>
                <p className="text-2xl font-extrabold text-emerald-600 mt-0.5">{collectedCount}</p>
              </div>
              <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
          {[
            { id: 'waste', label: 'Waste Collections', icon: Trash2 },
            { id: 'recycle', label: 'Recycling Requests', icon: Recycle },
            { id: 'dump', label: 'Illegal Dump Reports', icon: AlertTriangle },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex-1 justify-center ${
                  isActive
                    ? 'bg-forest-900 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-400' : 'text-gray-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('assigned')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'assigned' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'text-gray-500'
              }`}
            >
              Active Queue ({requests.filter(r => r.status !== 'Collected' && r.status !== 'Rejected').length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'completed' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'text-gray-500'
              }`}
            >
              Completed ({requests.filter(r => r.status === 'Collected').length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'profile' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'text-gray-500'
              }`}
            >
              Profile
            </button>
          </div>
        </div>

        {/* Profile Tab Render */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-xl mx-auto space-y-4 shadow-sm">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                {user?.name?.charAt(0) || 'C'}
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">{user?.name || 'Collector Account'}</h3>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">Service Area</span>
                <span className="font-bold text-gray-800">{collectorStats?.serviceArea || user?.location || 'Ilorin Central'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">Account Status</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> Active
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">Assigned Vehicle</span>
                <span className="font-bold text-gray-800">EC-VAN-042</span>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab Render */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-xl mx-auto space-y-3 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Bell className="h-4 w-4 text-emerald-600" /> Notifications
            </h3>
            <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 border border-emerald-100">
              <p className="font-bold mb-0.5">Route Assigned</p>
              <p>You have {requests.length} total requests assigned in {user?.location || 'Ilorin'}.</p>
            </div>
          </div>
        )}

        {/* Requests List Render */}
        {(activeTab === 'assigned' || activeTab === 'completed') && (
          <>
            {errorMsg && (
              <div className="p-4 bg-red-50 text-red-700 rounded-xl text-xs border border-red-100">
                {errorMsg}
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mb-2" />
                <p className="text-xs font-medium">Fetching field requests...</p>
              </div>
            ) : requests.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl text-center border border-gray-100">
                <p className="text-sm font-semibold text-gray-500">No {activeCategory} requests found in this queue.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {requests
                  .filter(req => activeTab === 'completed' ? req.status === 'Collected' : req.status !== 'Collected')
                  .map((req, a) => {
                    const reqId = req[activeCategory === 'waste' ? 'wasteId' : activeCategory === 'recycle' ? 'recycleId' : 'dumpId'] || req._id || req.id;
                    const reqImage = req.images || req.image || (Array.isArray(req.images) ? req.images[0] : null);

                    return (
                      <div
                        key={a}
                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                              ID: {reqId ? reqId.slice(-6) : 'N/A'}
                            </span>
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                              req.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                              req.status === 'Accepted' ? 'bg-blue-100 text-blue-800' :
                              req.status === 'En Route' ? 'bg-purple-100 text-purple-800' :
                              req.status === 'Collected' ? 'bg-emerald-100 text-emerald-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {req.status}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs text-gray-400 font-medium">Location & Address</p>
                            <p className="text-sm font-bold text-gray-800 flex items-start gap-1">
                              <MapPin className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{req.location || 'N/A'}</span>
                            </p>
                            {req.address && (
                              <p className="text-xs font-semibold text-gray-600 pl-5">
                                Street: {req.address}
                              </p>
                            )}
                          </div>

                          {reqImage && (
                            <div className="pt-1">
                              <div 
                                onClick={() => setPreviewImage(reqImage)}
                                className="relative group w-full h-32 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer"
                              >
                                <img 
                                  src={reqImage} 
                                  alt="Request attachment" 
                                  className="w-full h-full object-cover group-hover:scale-105 transition duration-200"
                                />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-semibold gap-1">
                                  <Eye className="h-4 w-4" /> View Image
                                </div>
                              </div>
                            </div>
                          )}

                          {req.materials?.length > 0 && (
                            <div className="bg-gray-50 p-3 rounded-xl space-y-1">
                              <p className="text-[11px] font-bold text-gray-500 uppercase">Items / Materials</p>
                              {req.materials.map((m, i) => (
                                <div key={i} className="flex justify-between text-xs text-gray-700">
                                  <span>{m.wasteType || m.recycleType || m.dumpType}</span>
                                  <span className="font-semibold">{m.quantity} {m.unit || 'kg'}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Actions according to Service Layer Workflow */}
                        <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                          <button
                            onClick={() => setDetailReq(req)}
                            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-200 transition"
                          >
                            Review Details
                          </button>

                          {req.status === 'Pending' && (
                            <button
                              onClick={() => openActionModal(req, 'accept')}
                              className="flex-1 py-2 bg-forest-900 text-white rounded-xl text-xs font-bold hover:bg-forest-800 transition cursor-pointer"
                            >
                              Accept Request
                            </button>
                          )}

                          {req.status === 'Accepted' && (
                            <button
                              onClick={() => openActionModal(req, 'route')}
                              className="flex-1 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Navigation className="h-3.5 w-3.5" /> Start Route
                            </button>
                          )}

                          {req.status === 'En Route' && (
                            <button
                              onClick={() => openActionModal(req, 'collect')}
                              className="flex-1 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Check className="h-3.5 w-3.5" /> Complete Pickup
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </>
        )}
      </main>

      {/* Detail & Step Progress Bar Modal (Matching Wireframe) */}
      {detailReq && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Request Details</h3>
              <button onClick={() => setDetailReq(null)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* 4-Step Progress Bar (Assigned -> Accepted -> En Route -> Collected) */}
            <div className="py-2 border-b border-gray-100">
              <p className="text-[11px] font-bold text-gray-400 uppercase mb-3">Status Progress</p>
              <div className="grid grid-cols-4 gap-1 text-center">
                {['Pending', 'Accepted', 'En Route', 'Collected'].map((step, idx) => {
                  const currentIdx = ['Pending', 'Accepted', 'En Route', 'Collected'].indexOf(detailReq.status);
                  const isDone = currentIdx >= idx;
                  return (
                    <div key={step} className="flex flex-col items-center">
                      <div className={`h-6 w-6 rounded-full text-[10px] font-bold flex items-center justify-center mb-1 ${
                        isDone ? 'bg-forest-900 text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {idx + 1}
                      </div>
                      <span className="text-[10px] font-semibold text-gray-600">{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <p><strong>Customer:</strong> {detailReq.userName || 'Resident'}</p>
              <p><strong>Location:</strong> {detailReq.location}</p>
              {detailReq.address && <p><strong>Street:</strong> {detailReq.address}</p>}
              {detailReq.collectionNote && <p><strong>Notes:</strong> "{detailReq.collectionNote}"</p>}
            </div>

            <div className="flex gap-2 pt-2">
              {detailReq.status === 'Pending' && (
                <>
                  <button
                    onClick={() => { const r = detailReq; setDetailReq(null); openActionModal(r, 'accept'); }}
                    className="flex-1 py-2.5 bg-forest-900 text-white rounded-xl text-xs font-bold"
                  >
                    Accept Request
                  </button>
                  <button
                    onClick={() => { const r = detailReq; setDetailReq(null); openActionModal(r, 'reject'); }}
                    className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Lightbox */}
      {previewImage && (
        <div 
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-3xl w-full">
            <img src={previewImage} alt="Preview" className="max-w-full max-h-[80vh] object-contain rounded-xl mx-auto" />
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      <CollectorMobileNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedReq={selectedReq}
        setSelectedReq={setSelectedReq}
        actionType={actionType}
        setActionType={setActionType}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        collectionNote={collectionNote}
        setCollectionNote={setCollectionNote}
        collectedMaterials={collectedMaterials}
        setCollectedMaterials={setCollectedMaterials}
        handleStatusAction={handleStatusAction}
        isSubmitting={isSubmitting}
        activeCategory={activeCategory}
      />
    </div>
  );
}