// src/houser/components/NotificationsPanel.jsx
import React from 'react';
import { Bell, CheckCircle2, Clock, Info } from 'lucide-react';

export default function NotificationsPanel({ user }) {
  // Synthesizing dynamic user notifications based on profile state
  const notifications = [
    {
      id: 1,
      title: 'Welcome to EcoHouse Services',
      message: `Hello ${user?.name || 'User'}, your account is set up for area: ${user?.location || 'Ilorin'}.`,
      time: 'Just now',
      type: 'info',
    },
    {
      id: 2,
      title: 'Reward Balance Updated',
      message: `You currently have ${user?.rewardPointsBalance || 0} active reward points available for redemption.`,
      time: 'Today',
      type: 'success',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-2xl mx-auto my-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="p-2.5 bg-emerald-50 rounded-xl">
          <Bell className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          <p className="text-sm text-gray-500">Recent updates regarding your requests and rewards</p>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl border border-gray-100 bg-neutral-50/60 flex items-start gap-3"
          >
            {item.type === 'success' ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {item.time}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}