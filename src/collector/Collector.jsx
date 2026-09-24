// src/collector/components/CollectorMobileNav.jsx
import React from 'react';
import { Truck, CheckCircle2, Clock, User, Bell, Navigation, AlertTriangle, X, Check, ArrowRight } from 'lucide-react';

export default function CollectorMobileNav({
  activeTab,
  setActiveTab,
  selectedReq,
  setSelectedReq,
  actionType,
  setActionType,
  rejectionReason,
  setRejectionReason,
  collectionNote,
  setCollectionNote,
  collectedMaterials,
  setCollectedMaterials,
  handleStatusAction,
  isSubmitting,
  activeCategory
}) {
  const navItems = [
    { id: 'assigned', label: 'Active Tasks', icon: Clock },
    { id: 'completed', label: 'Completed', icon: CheckCircle2 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Top Mobile Bar */}
      <header className="sm:hidden sticky top-0 z-40 bg-forest-900 text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-500/20 rounded-lg">
            <Truck className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight block">Collector Portal</span>
            <span className="text-[10px] text-emerald-300 block capitalize">{activeCategory} Operations</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-semibold text-emerald-200">Online</span>
        </div>
      </header>

      {/* Bottom Navigation Bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-3 py-2 shadow-lg">
        <div className="grid grid-cols-3 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition cursor-pointer ${
                  isActive
                    ? 'text-forest-900 font-bold bg-emerald-50'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-forest-900' : 'text-gray-400'}`} />
                <span className="text-[11px] mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Slide-up Bottom Sheet Modal */}
      {selectedReq && actionType && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            {/* Sheet Handle */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto sm:hidden mb-2"></div>

            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                  {activeCategory} Field Action
                </span>
                <h3 className="text-base font-bold text-gray-900 capitalize">
                  {actionType === 'accept' && 'Accept Request Assignment'}
                  {actionType === 'reject' && 'Reject Request'}
                  {actionType === 'route' && 'Start En-Route Navigation'}
                  {actionType === 'collect' && 'Verify Collection Details'}
                </h3>
              </div>
              <button
                onClick={() => { setSelectedReq(null); setActionType(null); }}
                className="p-1.5 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Accept Request Sheet */}
            {actionType === 'accept' && (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-900">
                  <p className="font-semibold mb-1">Confirming Assignment</p>
                  <p>By accepting, this pickup will be locked to your route queue and the user will be notified.</p>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <p><strong>Location:</strong> {selectedReq.location}</p>
                  {selectedReq.address && <p><strong>Address:</strong> {selectedReq.address}</p>}
                </div>
              </div>
            )}

            {/* Reject Request Form Sheet */}
            {actionType === 'reject' && (
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-xs text-red-900 flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                  <p>A valid reason is required to reject this pickup request.</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Rejection Reason *
                  </label>
                  <textarea
                    rows="3"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="e.g. Hazardous location, bin inaccessible, or outside boundary..."
                    required
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            )}

            {/* En Route Navigation Sheet */}
            {actionType === 'route' && (
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs text-purple-900 flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-purple-600 shrink-0" />
                  <span>Update status to <strong>En Route</strong> and notify household.</span>
                </div>
                <div className="text-xs text-gray-600">
                  <p><strong>Destination:</strong> {selectedReq.address || selectedReq.location}</p>
                </div>
              </div>
            )}

            {/* Verified Completion Sheet */}
            {actionType === 'collect' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Verify & Adjust Collected Quantities
                  </label>
                  {collectedMaterials.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl mb-2 text-xs">
                      <span className="font-semibold text-gray-800">{m.wasteType}</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={m.collectedQuantity}
                          onChange={(e) => {
                            const updated = [...collectedMaterials];
                            updated[idx].collectedQuantity = Number(e.target.value);
                            setCollectedMaterials(updated);
                          }}
                          className="w-20 px-2 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-right focus:ring-2 focus:ring-emerald-500"
                        />
                        <span className="text-gray-500 font-medium">kg</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Collector Notes (Optional)
                  </label>
                  <textarea
                    rows="2"
                    value={collectionNote}
                    onChange={(e) => setCollectionNote(e.target.value)}
                    placeholder="Enter any field observations..."
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={handleStatusAction}
                disabled={isSubmitting}
                className={`flex-1 py-3 px-4 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer ${
                  actionType === 'reject' 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : actionType === 'route'
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-forest-900 hover:bg-forest-800'
                }`}
              >
                {isSubmitting ? (
                  'Updating Status...'
                ) : (
                  <>
                    <span>Confirm {actionType.toUpperCase()}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}