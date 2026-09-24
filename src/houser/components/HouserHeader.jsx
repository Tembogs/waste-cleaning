// src/houser/components/HouserHeader.jsx
import React from 'react';
import { Bell, User, Leaf, Wallet } from 'lucide-react';

export default function HouserHeader({ user, unreadNotificationsCount = 0, activeTab, setActiveTab }) {
  const displayName = user?.name || user?.fullName || user?.username || 'User';

  return (
    <header className="bg-white text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <img
            src="/ecocycle.png"
            alt="EcoCycle"
            className=" w-auto object-contain h-20"
          />
        </div>

        {/* User & Notifications */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
              activeTab === 'wallet'
                ? 'bg-forest-900 text-white shadow-sm'
                : 'md:text-gray-600 text-gray-100 md:hover:bg-gray-100'
            }`}
          >
            <Wallet className="md:h-4 md:w-4 h-6 w-6 text-forest-900" />
            <span className='hidden md:block'>Wallet & Rewards</span>
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`p-2 rounded-full hover:bg-forest-800 transition relative ${
              activeTab === 'notifications' ? 'bg-forest-800' : ''
            }`}
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-forest-900" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 bg-emerald-400 rounded-full" />
            )}
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center space-x-2 p-1.5 rounded-full sm:rounded-lg hover:bg-forest-800 transition ${
              activeTab === 'profile' ? 'bg-forest-800' : ''
            }`}
          >
            {user?.profilePicture ? (
              <img 
                src={user.profilePicture} 
                alt={displayName} 
                className="h-8 w-8 rounded-full object-cover" 
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium text-sm">
                <User className="h-4 w-4" />
              </div>
            )}
            <span className="hidden md:inline text-sm font-medium pr-1">
              {displayName}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}