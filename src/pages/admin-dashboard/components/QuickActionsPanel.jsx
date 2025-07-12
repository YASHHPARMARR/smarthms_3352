import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActionsPanel = ({ onActionClick }) => {
  const quickActions = [
    {
      id: 'new-booking',
      title: 'Add New Booking',
      description: 'Create a new guest reservation',
      icon: 'Plus',
      color: 'primary',
      route: '/guest-booking-check-in'
    },
    {
      id: 'room-management',
      title: 'Manage Rooms',
      description: 'Update room status and availability',
      icon: 'Bed',
      color: 'success',
      route: '/room-management'
    },
    {
      id: 'staff-assignments',
      title: 'Staff Assignments',
      description: 'Assign tasks to hotel staff',
      icon: 'Users',
      color: 'warning',
      route: '/maintenance-task-management'
    },
    {
      id: 'room-service',
      title: 'Room Service',
      description: 'Manage food and service orders',
      icon: 'Coffee',
      color: 'error',
      route: '/room-service-management'
    },
    {
      id: 'system-settings',
      title: 'System Settings',
      description: 'Configure hotel preferences',
      icon: 'Settings',
      color: 'primary',
      route: '/admin-dashboard'
    },
    {
      id: 'reports',
      title: 'Generate Reports',
      description: 'View analytics and reports',
      icon: 'BarChart3',
      color: 'success',
      route: '/admin-dashboard'
    }
  ];

  const colorClasses = {
    primary: "bg-primary/10 text-primary hover:bg-primary/20",
    success: "bg-success/10 text-success hover:bg-success/20",
    warning: "bg-warning/10 text-warning hover:bg-warning/20",
    error: "bg-error/10 text-error hover:bg-error/20"
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Zap" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
      </div>
      
      <div className="space-y-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionClick(action.route)}
            className={`w-full p-4 rounded-lg border border-border transition-smooth hover:shadow-subtle ${colorClasses[action.color]}`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[action.color]}`}>
                <Icon name={action.icon} size={20} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-foreground">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;