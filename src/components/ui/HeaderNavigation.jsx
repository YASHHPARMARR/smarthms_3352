import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import UserProfileDropdown from './UserProfileDropdown';
import NotificationBadge from './NotificationBadge';

const HeaderNavigation = ({ onMenuToggle, title = "SmartHMS" }) => {
  const { user, userProfile, loading } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Title */}
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {title}
            </h1>
            {userProfile && (
              <p className="text-sm text-gray-500">
                Welcome back, {userProfile?.full_name || user?.email?.split('@')?.[0]}
              </p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Notifications */}
          {user && (
            <div className="relative">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <NotificationBadge count={3}>
                  <Bell className="w-5 h-5 text-gray-600" />
                </NotificationBadge>
              </button>
            </div>
          )}

          {/* User Profile */}
          {user && <UserProfileDropdown />}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderNavigation;