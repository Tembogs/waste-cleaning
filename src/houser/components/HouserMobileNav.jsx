// src/houser/components/HouserMobileNav.jsx
import React from 'react';
import { Home, Clock, Wallet, User, Bell, Leaf } from 'lucide-react';

export default function HouserMobileNav({
  activeTab,
  setActiveTab,
  unreadCount = 0,
}) {
  const navItems = [
    { id: 'overview', label: 'Home', icon: Home },
    { id: 'requests', label: 'Tracking', icon: Clock },
    { id: 'wallet', label: 'Rewards', icon: Wallet },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Top Mobile Bar - Visible on Mobile Only (sm:hidden) */}
      <header className="sm:hidden sticky top-0 z-40 bg-white text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          {/* <div className="p-1.5 bg-emerald-500/20 rounded-lg"> */}
           <img
            src="/ecocycle.png"
            alt="EcoCycle"
            className=" w-auto object-contain h-20"
          />
          {/* </div> */}
          {/* <span className="font-bold text-base tracking-tight">EcoHouse</span> */}
        </div>

        <button
          onClick={() => setActiveTab('notifications')}
          className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer"
          title="Notifications"
        >
          <Bell className="h-5 w-5 text-forest-900" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-forest-900"></span>
          )}
        </button>
      </header>

      {/* Bottom Fixed Navigation Bar - Visible on Mobile Only (sm:hidden) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-2 py-2 shadow-lg">
        <div className="grid grid-cols-4 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition cursor-pointer ${
                  isActive
                    ? 'text-gray-100 font-bold bg-forest-900'
                    : 'text-forest-900 hover:text-gray-800'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-gray-100' : 'text-forest-900'}`} />
                <span className="text-[11px] mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}