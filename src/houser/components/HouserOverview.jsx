// src/houser/components/HouserOverview.jsx
import React from 'react';
import { Award, Scale, Recycle, Truck, Coins, ArrowUpRight, Plus, AlertTriangle, Clock, Trash2 } from 'lucide-react';

export default function HouserOverview({ user, isLoading, setActiveSection }) {
  // Mapping database fields directly
  const stats = [
    {
      id: 'points',
      title: "Points Earned",
      value: isLoading ? "..." : `${user?.rewardPointsBalance ?? 0} Points`,
      icon: Award,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      id: 'totalWaste',
      title: "Total Waste",
      value: isLoading ? "..." : `${user?.totalWasteCollected ?? 0} kg`,
      icon: Scale,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 'recycledWaste',
      title: "Recycled Waste",
      value: isLoading ? "..." : `${user?.totalRecyclingCollected ?? 0} kg`,
      icon: Recycle,
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    {
      id: 'totalPickups',
      title: "Total Pickups",
      value: isLoading ? "..." : `${user?.requestStats?.length ?? 0}`,
      icon: Truck,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      id: 'tokens',
      title: "Tokens Earned",
      value: isLoading ? "..." : `${user?.totalRewardPointsEarned ?? 0}`,
      icon: Coins,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  const quickActions = [
    { id: 'waste', label: 'Request Waste Pickup', icon: Trash2 },
    { id: 'recycling', label: 'Request Recycling', icon: Recycle },
    { id: 'dump', label: 'Report Illegal Dump', icon: AlertTriangle },
    { id: 'requests', label: 'Track Status', icon: Clock },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
            Good morning, {user?.name || 'Houser'} <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Here is your waste management and recycling summary today.
          </p>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-500">
                  {stat.title}
                </span>
                <div className={`p-2 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Navigation Bar */}
      <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm hidden md:block">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => setActiveSection(action.id)}
                className="whitespace-nowrap px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 bg-mint-100 text-forest-900 hover:bg-emerald-200 transition-colors cursor-pointer"
              >
                <Icon className="h-4 w-4" />
                <span>{action.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}