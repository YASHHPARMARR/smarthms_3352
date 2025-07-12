import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import NotificationBadge from './NotificationBadge';

const RoleBasedMenu = ({ userRole, currentPath, notifications, isMobile = false, onItemClick }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/admin-dashboard',
      icon: 'LayoutDashboard',
      roles: ['admin', 'manager', 'front-desk'],
      notificationKey: 'admin-dashboard'
    },
    {
      label: 'Room Management',
      path: '/room-management',
      icon: 'Bed',
      roles: ['admin', 'manager', 'front-desk', 'housekeeping'],
      notificationKey: 'room-management'
    },
    {
      label: 'Guest Booking',
      path: '/guest-booking-check-in',
      icon: 'Users',
      roles: ['admin', 'manager', 'front-desk'],
      notificationKey: 'guest-booking-check-in'
    },
    {
      label: 'Room Service',
      path: '/room-service-management',
      icon: 'Coffee',
      roles: ['admin', 'manager', 'room-service'],
      notificationKey: 'room-service-management'
    },
    {
      label: 'Maintenance',
      path: '/maintenance-task-management',
      icon: 'Wrench',
      roles: ['admin', 'manager', 'maintenance'],
      notificationKey: 'maintenance-task-management'
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  const handleItemClick = (path) => {
    navigate(path);
    if (onItemClick) {
      onItemClick();
    }
  };

  const isActive = (path) => {
    return currentPath === path;
  };

  if (isMobile) {
    return (
      <nav className="py-2">
        {filteredMenuItems.map((item) => {
          const notificationCount = notifications[item.notificationKey] || 0;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => handleItemClick(item.path)}
              className={`w-full flex items-center justify-between px-6 py-4 text-left transition-smooth ${
                active 
                  ? 'bg-primary/10 text-primary border-r-2 border-primary' :'text-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={item.icon} 
                  size={20} 
                  className={active ? 'text-primary' : 'text-muted-foreground'} 
                />
                <span className="font-medium">{item.label}</span>
              </div>
              {notificationCount > 0 && (
                <NotificationBadge count={notificationCount} />
              )}
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex items-center space-x-1">
      {filteredMenuItems.map((item) => {
        const notificationCount = notifications[item.notificationKey] || 0;
        const active = isActive(item.path);
        
        return (
          <div key={item.path} className="relative">
            <Button
              variant={active ? "default" : "ghost"}
              onClick={() => handleItemClick(item.path)}
              className={`relative px-4 py-2 h-10 ${
                active 
                  ? 'bg-primary text-primary-foreground shadow-subtle' 
                  : 'text-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon 
                name={item.icon} 
                size={16} 
                className="mr-2" 
              />
              <span className="font-medium">{item.label}</span>
              {notificationCount > 0 && (
                <NotificationBadge 
                  count={notificationCount} 
                  className="ml-2" 
                />
              )}
            </Button>
          </div>
        );
      })}
    </nav>
  );
};

export default RoleBasedMenu;