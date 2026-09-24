// src/houser/components/MobileActionPills.jsx
import React from 'react';
import { Trash2, Recycle, AlertTriangle } from 'lucide-react';

export default function MobileActionPills({ activeSection, setActiveSection }) {
  const actions = [
    { id: 'waste', label: 'Waste Request', icon: Trash2, color: 'emerald' },
    { id: 'recycling', label: 'Recycling', icon: Recycle, color: 'teal' },
    { id: 'dump', label: 'Report Dump', icon: AlertTriangle, color: 'amber' },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:hidden">
      {actions.map((act) => {
        const Icon = act.icon;
        const isActive = activeSection === act.id;
        return (
          <button
            key={act.id}
            onClick={() => setActiveSection(act.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 border ${
              isActive
                ? 'bg-green-900 text-white border-forest-900 shadow-sm'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-400' : 'text-gray-500'}`} />
            <span>{act.label}</span>
          </button>
        );
      })}
    </div>
  );
}