// src/houser/Houser.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import HouserHeader from './components/HouserHeader';
import HouserMobileNav from './components/HouserMobileNav';
import MobileActionPills from './components/MobileActionPills';
import HouserOverview from './components/HouserOverview';
import RequestWasteForm from './components/RequestWasteForm';
import RequestRecycleForm from './components/RequestRecycleForm';
import ReportDumpForm from './components/ReportDumpForm';
import MyRequestsList from './components/MyRequestsList';
import HouserProfile from './components/HouserProfile';
import HouserWallet from './components/HouserWallet';
import NotificationsPanel from './components/NotificationsPanel';

export default function Houser() {
  const { user: authUser, token } = useContext(AuthContext); 
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'profile' | 'notifications' | 'wallet' | 'requests'
  const [activeSection, setActiveSection] = useState('waste'); // 'waste' | 'recycling' | 'dump'

  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchUserProfile = async () => {
    if (!authUser?.id && !authUser?._id) return;
    const userId = authUser.id || authUser._id;

    try {
      setLoadingUser(true);
      const response = await axios.get(
        `https://waste-management-3-iw0g.onrender.com/api/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [authUser, token]);

  const currentUser = userData || authUser;

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col pb-20 sm:pb-0">
      {/* Mobile Top Header */}
      <HouserMobileNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadCount={2}
      />

      {/* Desktop Header Bar (Hidden on Mobile) */}
      <div className="hidden sm:block">
        <HouserHeader 
          user={currentUser}
          unreadNotificationsCount={2}
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        {/* Render Overview Card on Home Tab */}
        {activeTab === 'overview' && (
          <>
            <HouserOverview 
              user={currentUser} 
              isLoading={loadingUser}
              setActiveSection={(section) => {
                setActiveTab('overview');
                setActiveSection(section);
              }} 
            />

            {/* Mobile Action Pills Carousel */}
            <MobileActionPills 
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />

            {/* Form Section Switches */}
            {activeSection === 'waste' && (
              <RequestWasteForm onSuccess={fetchUserProfile} />
            )}

            {activeSection === 'recycling' && (
              <RequestRecycleForm onSuccess={fetchUserProfile} />
            )}

            {activeSection === 'dump' && (
              <ReportDumpForm onSuccess={fetchUserProfile} />
            )}
          </>
        )}

        {/* Tracking Requests View */}
        {activeTab === 'requests' && <MyRequestsList />}

        {/* Profile Settings View */}
        {activeTab === 'profile' && (
          <HouserProfile 
            user={currentUser} 
            onProfileUpdated={() => fetchUserProfile()} 
          />
        )}

        {/* Rewards & Wallet View */}
        {activeTab === 'wallet' && (
          <HouserWallet 
            user={currentUser} 
            onRedemptionSuccess={() => fetchUserProfile()} 
          />
        )}

        {/* Notifications View */}
        {activeTab === 'notifications' && (
          <NotificationsPanel user={currentUser} />
        )}
      </main>
    </div>
  );
}