import React, { useState } from 'react';
import { User, Settings, LogOut, Shield, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userProfile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const result = await signOut();
      if (result?.success) {
        navigate('/login-role-selection');
      }
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const getUserDisplayName = () => {
    return userProfile?.full_name || user?.email?.split('@')?.[0] || 'User';
  };

  const getUserRole = () => {
    if (!userProfile?.role) return 'Guest';
    
    const roleMap = {
      'admin': 'Administrator',
      'receptionist': 'Receptionist',
      'room_service_manager': 'Room Service Manager',
      'maintenance_manager': 'Maintenance Manager',
      'security_manager': 'Security Manager',
      'guest': 'Guest'
    };
    
    return roleMap[userProfile.role] || userProfile.role;
  };

  const getRoleColor = () => {
    const roleColors = {
      'admin': 'text-red-600 bg-red-50',
      'receptionist': 'text-blue-600 bg-blue-50',
      'room_service_manager': 'text-green-600 bg-green-50',
      'maintenance_manager': 'text-orange-600 bg-orange-50',
      'security_manager': 'text-purple-600 bg-purple-50',
      'guest': 'text-gray-600 bg-gray-50'
    };
    
    return roleColors[userProfile?.role] || 'text-gray-600 bg-gray-50';
  };

  if (loading) {
    return (
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {getUserDisplayName()?.charAt(0)?.toUpperCase()}
        </div>
        
        {/* User Info */}
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-900">
            {getUserDisplayName()}
          </div>
          <div className={`text-xs px-2 py-1 rounded-full ${getRoleColor()}`}>
            {getUserRole()}
          </div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            {/* User Info Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-medium">
                  {getUserDisplayName()?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {getUserDisplayName()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.email}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${getRoleColor()}`}>
                    <Shield className="w-3 h-3 inline mr-1" />
                    {getUserRole()}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to profile page when implemented
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3"
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </button>
              
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Navigate to settings when implemented
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>

              {userProfile?.role === 'admin' && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    // Navigate to admin settings when implemented
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Panel</span>
                </button>
              )}

              <div className="border-t border-gray-200 my-2"></div>
              
              {/* Session Info */}
              <div className="px-4 py-2 text-xs text-gray-500 flex items-center space-x-2">
                <Clock className="w-3 h-3" />
                <span>Last login: {new Date().toLocaleDateString()}</span>
              </div>

              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfileDropdown;