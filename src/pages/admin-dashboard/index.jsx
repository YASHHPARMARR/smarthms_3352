import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import HeaderNavigation from '../../components/ui/HeaderNavigation';
import RoleBasedMenu from '../../components/ui/RoleBasedMenu';
import KPICard from './components/KPICard';
import RoomStatusGrid from './components/RoomStatusGrid';
import OccupancyChart from './components/OccupancyChart';
import PendingApprovals from './components/PendingApprovals';
import QuickActionsPanel from './components/QuickActionsPanel';
import ActivityFeed from './components/ActivityFeed';

const AdminDashboard = () => {
  const { user, userProfile, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Preview mode - allow access without authentication for development
  const isPreviewMode = !user && !loading;

  useEffect(() => {
    if (!loading && !user && !isPreviewMode) {
      // In production, redirect to login
      // For development, we allow preview access
    }
  }, [user, loading, isPreviewMode]);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Preview mode banner
  const PreviewBanner = () => (
    <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
      <div className="flex items-center justify-center">
        <p className="text-sm text-yellow-800">
          <span className="font-medium">Preview Mode:</span> 
          {' '}Real authentication available - please sign in for full functionality
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Mode Banner */}
      {isPreviewMode && <PreviewBanner />}
      
      {/* Sidebar */}
      <RoleBasedMenu 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userRole={userProfile?.role || 'preview'}
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : ''}`}>
        {/* Header */}
        <HeaderNavigation 
          onMenuToggle={handleMenuToggle}
          title={userProfile?.role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
        />

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isPreviewMode ? 'Welcome to SmartHMS' : `Welcome back, ${userProfile?.full_name || user?.email?.split('@')?.[0]}`}
            </h2>
            <p className="text-gray-600">
              {isPreviewMode 
                ? 'Explore the hotel management system features below' :'Here is your hotel overview for today'
              }
            </p>
            {userProfile && (
              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {userProfile.role?.replace('_', ' ')?.toUpperCase()} ACCESS
                </span>
              </div>
            )}
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard 
              title="Total Rooms"
              value="120"
              change="+2.5%"
              trend="up"
              icon="🏨"
            />
            <KPICard 
              title="Occupied"
              value="87"
              change="+5.2%"
              trend="up"
              icon="🛏️"
            />
            <KPICard 
              title="Revenue Today"
              value="$12,450"
              change="+8.1%"
              trend="up"
              icon="💰"
            />
            <KPICard 
              title="Check-ins Today"
              value="23"
              change="-2.1%"
              trend="down"
              icon="📋"
            />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Room Status Grid */}
            <div className="lg:col-span-2">
              <RoomStatusGrid />
            </div>
            
            {/* Pending Approvals */}
            <div>
              <PendingApprovals />
            </div>
          </div>

          {/* Secondary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Occupancy Chart */}
            <div>
              <OccupancyChart />
            </div>

            {/* Activity Feed */}
            <div>
              <ActivityFeed />
            </div>
          </div>

          {/* Quick Actions */}
          {(userProfile?.role === 'admin' || isPreviewMode) && (
            <div className="mt-8">
              <QuickActionsPanel />
            </div>
          )}

          {/* Auth Status Debug Info (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Auth Status (Dev Mode)</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <p>User: {user ? '✅ Authenticated' : '❌ Not authenticated'}</p>
                <p>Profile: {userProfile ? '✅ Loaded' : '❌ Not loaded'}</p>
                <p>Role: {userProfile?.role || 'No role'}</p>
                <p>Email: {user?.email || 'No email'}</p>
                <p>Mode: {isPreviewMode ? 'Preview' : 'Authenticated'}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;